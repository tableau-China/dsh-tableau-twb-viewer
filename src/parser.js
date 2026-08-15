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

/** Tableau zone 坐标单位：1 = 1/100000 */
const ZONE_UNIT = 1e5;

/** 直接子元素中第一个 tag 匹配的元素。 */
function child(el, tag) {
  return el ? [...el.children].find((c) => (c.localName || c.tagName) === tag) || null : null;
}

/** 直接子元素中所有 tag 匹配的元素。 */
function children(el, tag) {
  return el ? [...el.children].filter((c) => (c.localName || c.tagName) === tag) : [];
}

/** 读取属性（无元素时返回 null）。 */
function attr(el, name) {
  return el ? el.getAttribute(name) : null;
}

/** 去掉字段名两端的方括号。 */
export function stripBrackets(value) {
  return value ? String(value).replace(/^\[/, "").replace(/\]$/, "") : "";
}

/** 提取 zone 内 <formatted-text> 的文本（拼接所有 <run>）。 */
function formattedText(el) {
  const t = child(el, "formatted-text");
  if (!t) return "";
  const runs = [...t.getElementsByTagName("run")];
  return runs.length ? runs.map((r) => r.textContent).join("") : t.textContent || "";
}

/** 递归解析 <zones> 树。 */
function parseZones(el, size, worksheetNames) {
  return [...(el.children || [])]
    .filter((c) => (c.localName || c.tagName) === "zone")
    .map((z) => parseZone(z, size, worksheetNames));
}

/** 解析单个 <zone>：把 1/100000 坐标换算为像素，处理固定尺寸与类型分类。 */
function parseZone(z, size, worksheetNames) {
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
    kind,
    children: kids.length ? parseZones({ children: kids }, size, worksheetNames) : []
  };
}

/** 列元素判定：<column> 或以 column 结尾的标签，排除 <column-instance>。 */
function isColumnTag(tag) {
  return (tag === "column" || tag.endsWith("column")) && tag !== "column-instance";
}

/**
 * 解析 .twb 工作簿文本。
 * @param {string} text - 文件内容（XML）。
 * @returns {object} 结构化工作簿模型。
 * @throws 文件不是有效 twb 时抛出可读错误。
 */
export function parseWorkbook(text) {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const parseError = doc.querySelector("parsererror");
  if (parseError) throw new Error("XML 解析失败：" + parseError.textContent);

  const root = doc.documentElement;
  if (!root || (root.localName || root.tagName) !== "workbook") {
    throw new Error("这不是一个有效的 Tableau 工作簿 (.twb) 文件");
  }

  // ---- 工作表 ----
  const worksheetsEl = child(root, "worksheets");
  const worksheets = worksheetsEl
    ? children(worksheetsEl, "worksheet").map((w) => attr(w, "name")).filter(Boolean)
    : [];

  // ---- 仪表板（zone 树 + 尺寸）----
  const dashboards = [];
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
  const captionByName = {};
  for (const ds of children(child(root, "datasources"), "datasource")) {
    for (const col of [...ds.children].filter((c) => isColumnTag(c.localName || c.tagName))) {
      const n = attr(col, "name");
      const c = attr(col, "caption");
      if (n && c) captionByName[stripBrackets(n)] = c;
    }
  }

  // ---- 数据源 ----
  const datasources = [];
  for (const ds of children(child(root, "datasources"), "datasource")) {
    const caption = attr(ds, "caption") || attr(ds, "name") || "(未命名数据源)";
    const name = attr(ds, "name");

    const connEl = child(ds, "connection");
    const connection = connEl
      ? {
          class: attr(connEl, "class"),
          type: attr(connEl, "type"),
          server: attr(connEl, "server"),
          dbname: attr(connEl, "dbname"),
          filename: attr(connEl, "filename")
        }
      : null;

    const columns = [...ds.children]
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
      .filter(Boolean);

    const groups = children(ds, "group").map((g) => attr(g, "name")).filter(Boolean);
    datasources.push({ caption, name, connection, columns, groups });
  }

  return { dashboards, worksheets, datasources };
}
