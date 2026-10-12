// Tableau .twb 工作簿解析器（纯 DOM API，浏览器原生运行，Node 测试时可用
// @xmldom/xmldom 垫片）。
//
// 忠实移植自 tableau_parse 原始实现（原 Sp / kp / Tc / xp 函数），
// 输入 .twb 的 XML 文本，输出：
//   {
//     dashboards: [{ name, width, height, zones }],   // 仪表板 1:1 布局
//     worksheets: [string],                           // 工作表名
//     datasources: [{ caption, name, connection, columns, groups }]
//   }

import type {
  DataJoinEdge,
  DataTableRef,
  DatasourceDataModel,
  WorkbookConnection,
  WorkbookColumn,
  WorkbookDashboard,
  WorkbookDatasource,
  WorkbookModel,
  Zone,
  ZoneFormat,
  ZoneKind,
  ZoneShape
} from "./types.ts";

/** 可容纳 zone 子元素的容器（Element 或包装对象）。 */
interface ZoneContainer {
  children: ArrayLike<Element> & Iterable<Element>;
}

/** Tableau zone 坐标单位：1 = 1/100000 */
const ZONE_UNIT = 1e5;

/** 直接子元素中第一个 tag 匹配的元素。 */
function child(el: Element | null | undefined, tag: string): Element | null {
  return el ? [...el.children].find((c) => (c.localName || c.tagName) === tag) || null : null;
}

/** 直接子元素中所有 tag 匹配的元素。 */
function children(el: Element | null | undefined, tag: string): Element[] {
  return el ? [...el.children].filter((c) => (c.localName || c.tagName) === tag) : [];
}

/** 读取属性（无元素时返回 null）。 */
function attr(el: Element | null | undefined, name: string): string | null {
  return el ? el.getAttribute(name) : null;
}

/** 去掉字段名两端的方括号。 */
export function stripBrackets(value: string | null | undefined): string {
  return value ? String(value).replace(/^\[/, "").replace(/\]$/, "") : "";
}

/** 提取 zone 内 <formatted-text> 的文本（拼接所有 <run>）。 */
function formattedText(el: Element): string {
  const t = child(el, "formatted-text");
  if (!t) return "";
  const runs = [...t.getElementsByTagName("run")];
  return runs.length ? runs.map((r) => r.textContent).join("") : t.textContent || "";
}

/** 递归解析 <zones> 树。 */
function parseZones(el: ZoneContainer, size: { w: number; h: number }, worksheetNames: string[]): Zone[] {
  return [...(el.children || [])]
    .filter((c) => (c.localName || c.tagName) === "zone")
    .map((z) => parseZone(z, size, worksheetNames));
}

/** 解析单个 <zone>：把 1/100000 坐标换算为像素，处理固定尺寸与类型分类。 */
function parseZone(z: Element, size: { w: number; h: number }, worksheetNames: string[]): Zone {
  const x = parseFloat(z.getAttribute("x") || "0");
  const y = parseFloat(z.getAttribute("y") || "0");
  const w = parseFloat(z.getAttribute("w") || "0");
  const h = parseFloat(z.getAttribute("h") || "0");

  let px = (x / ZONE_UNIT) * size.w;
  let py = (y / ZONE_UNIT) * size.h;
  let pw = (w / ZONE_UNIT) * size.w;
  let ph = (h / ZONE_UNIT) * size.h;

  // 固定尺寸的 zone：以 layout-cache 的 type-w/type-h 为准
  const fixed = z.getAttribute("is-fixed") === "true";
  const fixedSize = parseFloat(z.getAttribute("fixed-size") || "0");
  if (fixed && fixedSize) {
    const cache = child(z, "layout-cache");
    const tw = cache ? cache.getAttribute("type-w") : null;
    const th = cache ? cache.getAttribute("type-h") : null;
    if (tw === "fixed") pw = fixedSize;
    if (th === "fixed") ph = fixedSize;
    if (!cache) ph = fixedSize;
  }

  const type = z.getAttribute("type-v2") || "";
  const name = z.getAttribute("name") || "";
  const text = type === "text" ? formattedText(z) : "";

  let kind = "container";
  if (type === "text") kind = "text";
  else if (name && worksheetNames.includes(name)) kind = "worksheet";

  const shape = zoneShape(type, kind as ZoneKind);
  const format = zoneFormat(z);

  // 子 zone：优先取 <zones> 容器，否则取直属 zone 子元素
  const zonesEl = child(z, "zones");
  const kids = zonesEl
    ? [...zonesEl.children].filter((c) => (c.localName || c.tagName) === "zone")
    : [...z.children].filter((c) => (c.localName || c.tagName) === "zone");

  return {
    x: Math.round(px * 10) / 10,
    y: Math.round(py * 10) / 10,
    w: Math.round(pw * 10) / 10,
    h: Math.round(ph * 10) / 10,
    type,
    name,
    text,
    kind: kind as ZoneKind,
    shape,
    format,
    children: kids.length ? parseZones({ children: kids }, size, worksheetNames) : []
  };
}

/** 卡片类 zone（筛选器 / 图例 / 标题 / 参数控件等，非布局容器也非工作表）。 */
const CARD_TYPES = new Set([
  "filter",
  "color",
  "title",
  "paramctrl",
  "legend",
  "highlight",
  "page",
  "dashboard-title",
  "size",
  "shape",
  "text-object"
]);

/** 由 type-v2 与粗分类推导细分类型（决定布局图配色与图例）。 */
function zoneShape(typeV2: string, kind: ZoneKind): ZoneShape {
  if (kind === "worksheet") return "worksheet";
  if (typeV2 === "text") return "text";
  if (typeV2 === "empty") return "empty";
  if (typeV2 === "image" || typeV2 === "bitmap") return "image";
  if (typeV2 === "layout-flow") return "flow";
  if (typeV2 === "layout-vertical") return "vertical";
  if (typeV2 === "layout-horizontal") return "horizontal";
  if (typeV2 === "layout-basic") return "basic";
  if (CARD_TYPES.has(typeV2)) return "card";
  return "other";
}

/** 读取 zone 的 <format attr='...' value='...'/> 子集（padding / margin / 底色 / 边框）。 */
function zoneFormat(z: Element): ZoneFormat {
  const read: Record<string, string> = {};
  // 格式既可能直接挂在 <zone> 下，也可能包在 <zone-style> 里
  const styleEl = child(z, "zone-style");
  const containers = styleEl ? [z, styleEl] : [z];
  const formatEls = containers.flatMap((el) =>
    [...el.children].filter((c) => (c.localName || c.tagName) === "format")
  );
  for (const f of formatEls) {
    const attrName = f.getAttribute("attr");
    const value = f.getAttribute("value");
    if (attrName && value !== null) read[attrName] = value;
  }
  const num = (key: string): number | null => {
    const v = read[key];
    if (v === undefined) return null;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };
  return {
    padding: num("padding"),
    margin: num("margin"),
    background: read["background-color"] ?? null,
    borderColor: read["border-color"] ?? null,
    borderWidth: num("border-width"),
    borderStyle: read["border-style"] ?? null
  };
}

/** 列元素判定：<column> 或以 column 结尾的标签，排除 <column-instance>。 */
function isColumnTag(tag: string): boolean {
  return (tag === "column" || tag.endsWith("column")) && tag !== "column-instance";
}

/**
 * 解析 .twb 工作簿文本。
 * @param {string} text - 文件内容（XML）。
 * @returns {object} 结构化工作簿模型。
 * @throws 文件不是有效 twb 时抛出可读错误。
 */
export function parseWorkbook(text: string): WorkbookModel {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const parseError = doc.querySelector("parsererror");
  if (parseError) throw new Error("XML 解析失败：" + parseError.textContent);

  const root = doc.documentElement;
  if (!root || (root.localName || root.tagName) !== "workbook") {
    throw new Error("这不是一个有效的 Tableau 工作簿 (.twb) 文件");
  }

  // ---- 工作表 ----
  const worksheetsEl = child(root, "worksheets");
  const worksheets: string[] = worksheetsEl
    ? children(worksheetsEl, "worksheet")
        .map((w) => attr(w, "name"))
        .filter((n): n is string => typeof n === "string")
    : [];

  // ---- 仪表板（zone 树 + 尺寸）----
  const dashboards: WorkbookDashboard[] = [];
  for (const dash of children(child(root, "dashboards"), "dashboard")) {
    const name = attr(dash, "name") || "(未命名仪表板)";
    const sizeEl = child(dash, "size");
    let width = 0;
    let height = 0;
    if (sizeEl) {
      width = parseInt(attr(sizeEl, "minwidth") || attr(sizeEl, "maxwidth") || "0", 10);
      height = parseInt(attr(sizeEl, "minheight") || attr(sizeEl, "maxheight") || "0", 10);
    }
    const zonesEl = child(dash, "zones");
    const zones = zonesEl
      ? parseZones(zonesEl, { w: width || ZONE_UNIT, h: height || ZONE_UNIT }, worksheets)
      : [];
    dashboards.push({ name, width, height, zones });
  }

  // ---- 全量字段 caption 映射（公式展示时把 [内部名] 换成 [显示名]）----
  const captionByName: Record<string, string> = {};
  for (const ds of children(child(root, "datasources"), "datasource")) {
    for (const col of [...ds.children].filter((c) => isColumnTag(c.localName || c.tagName))) {
      const n = attr(col, "name");
      const c = attr(col, "caption");
      if (n && c) captionByName[stripBrackets(n)] = c;
    }
  }

  // ---- 数据源 ----
  const datasources: WorkbookDatasource[] = [];
  for (const ds of children(child(root, "datasources"), "datasource")) {
    const caption = attr(ds, "caption") || attr(ds, "name") || "(未命名数据源)";
    const name = attr(ds, "name");

    const connEl = child(ds, "connection");
    const connection: WorkbookConnection | null = connEl
      ? {
          class: attr(connEl, "class"),
          type: attr(connEl, "type"),
          server: attr(connEl, "server"),
          dbname: attr(connEl, "dbname"),
          filename: attr(connEl, "filename")
        }
      : null;

    const columns: WorkbookColumn[] = [...ds.children]
      .filter((c) => isColumnTag(c.localName || c.tagName))
      .map((col) => {
        const n = attr(col, "name");
        if (!n) return null;
        const calcEl = child(col, "calculation");
        const formulaRaw = calcEl ? attr(calcEl, "formula") : null;
        let formula = formulaRaw;
        if (formulaRaw) {
          formula = formulaRaw.replace(/\[([^\]]+)\]/g, (match, inner) => {
            const key = stripBrackets(inner);
            return captionByName[key] ? "[" + captionByName[key] + "]" : match;
          });
        }
        const cap = attr(col, "caption");
        return {
          name: n,
          caption: cap || null,
          label: cap || n,
          datatype: attr(col, "datatype"),
          role: attr(col, "role"),
          type: attr(col, "type"),
          formula,
          formulaRaw
        };
      })
      .filter((c): c is WorkbookColumn => c !== null);

    const groups = children(ds, "group")
      .map((g) => attr(g, "name"))
      .filter((n): n is string => typeof n === "string");
    const dataModel = parseDataModel(ds);
    datasources.push({ caption, name, connection, columns, groups, dataModel });
  }

  return { dashboards, worksheets, datasources };
}

// ---- 数据模型：表 / 自定义 SQL / 连接关系 ----

/** 收集数据源 <connection> 下的顶层 <relation>（Tableau 新版会带 `_.fcp.*` 命名空间前缀，localName 已剥离）。 */
function relationRoots(ds: Element): Element[] {
  const roots: Element[] = [];
  const walk = (el: Element, insideRelation: boolean): void => {
    for (const c of [...el.children]) {
      const tag = c.localName || c.tagName;
      if (tag === "relation") {
        if (!insideRelation) roots.push(c);
        walk(c, true);
      } else if (!insideRelation) {
        walk(c, false);
      }
    }
  };
  const conn = child(ds, "connection");
  if (conn) walk(conn, false);
  return roots;
}

/** 把一个叶子 <relation> 描述为数据模型节点。 */
function describeTable(rel: Element): DataTableRef {
  const type = attr(rel, "type");
  const name = attr(rel, "name") || "(unnamed)";
  if (type === "text") {
    return { name, table: null, kind: "custom-sql", sql: (rel.textContent || "").trim() || null };
  }
  return { name, table: attr(rel, "table"), kind: "table", sql: null };
}

/** 读取 <clause type='join'> 的 ON 条件（左 / 右表达式）与基数。 */
function parseJoinClause(rel: Element): { leftExpr: string | null; rightExpr: string | null; cardinality: string | null } {
  const clause = child(rel, "clause");
  if (!clause) return { leftExpr: null, rightExpr: null, cardinality: null };
  const cardinality = attr(clause, "cardinality");
  const outer = child(clause, "expression");
  const parts = outer ? children(outer, "expression") : [];
  return {
    leftExpr: parts[0] ? attr(parts[0], "op") : null,
    rightExpr: parts[1] ? attr(parts[1], "op") : attr(outer, "op"),
    cardinality
  };
}

/** 递归解析 relation 树，产出表节点与连接边（join 可嵌套）。 */
function parseDataModel(ds: Element): DatasourceDataModel {
  const joins: DataJoinEdge[] = [];
  const tableMap = new Map<string, DataTableRef>();
  const customSql: Array<{ name: string; sql: string }> = [];

  const keyOf = (t: DataTableRef): string => `${t.kind}:${t.name}:${t.table ?? ""}`;
  const remember = (t: DataTableRef): DataTableRef => {
    const k = keyOf(t);
    if (!tableMap.has(k)) tableMap.set(k, t);
    if (t.kind === "custom-sql" && t.sql && !customSql.some((x) => x.name === t.name && x.sql === t.sql)) {
      customSql.push({ name: t.name, sql: t.sql });
    }
    return tableMap.get(k) as DataTableRef;
  };

  /** 由 `[表].[字段]` 形式的表达式反查表节点（找不到返回 null）。 */
  const resolveQualifier = (expr: string | null): DataTableRef | null => {
    if (!expr) return null;
    const m = /^\[([^\]]+)\]/.exec(expr.trim());
    if (!m) return null;
    const qualifier = m[1];
    for (const t of tableMap.values()) {
      if (t.name === qualifier) return t;
      if (t.table && t.table.replace(/[\[\]]/g, "") === qualifier.replace(/[\[\]]/g, "")) return t;
    }
    return null;
  };

  const visit = (rel: Element): DataTableRef => {
    const relType = attr(rel, "type") || "table";

    // 集合 / 并集：自身不是表，递归到子 relation（多表 extract 常见）
    if (relType === "collection" || relType === "union") {
      let first: DataTableRef | null = null;
      for (const kid of children(rel, "relation")) {
        const t = visit(kid);
        if (!first) first = t;
      }
      return first ?? remember({ name: attr(rel, "name") || "(collection)", table: null, kind: "table", sql: null });
    }

    if (relType !== "join") return remember(describeTable(rel));

    const kids = children(rel, "relation");
    const left = kids[0] ? visit(kids[0]) : null;
    const right = kids[1] ? visit(kids[1]) : null;
    for (const extra of kids.slice(2)) visit(extra);

    const { leftExpr, rightExpr, cardinality } = parseJoinClause(rel);
    if (left && right) {
      // ON 条件里写明了参与比较的表（[表].[字段]）：优先按它解析两端，
      // 链式 join 的左操作数是「上一段 join 的结果」，用限定符比子树首叶子准确。
      const leftTable = resolveQualifier(leftExpr) ?? left;
      const rightTable = resolveQualifier(rightExpr) ?? right;
      joins.push({
        left: leftTable,
        right: rightTable,
        joinType: attr(rel, "join") || "inner",
        leftExpr,
        rightExpr,
        cardinality
      });
    }
    return left ?? right ?? remember({ name: "(join)", table: null, kind: "table", sql: null });
  };

  for (const root of relationRoots(ds)) visit(root);
  return { tables: [...tableMap.values()], joins, customSql };
}

