// 快照测试：对内置 sample.twb 跑 解析 -> 构图 -> 布局，与 test/fixtures/sample.golden.json 对比。
//
// 为什么用快照：解析/构图/布局的正确性已由「与原始 tableau_parse 实现的逐字节差分」
// 一次性证明（见 test/verify-reference.mjs）；此后需要的回归防护是「行为不再漂移」，
// 快照足以覆盖，且**克隆仓库即可运行**（不依赖仓库外的原始 bundle）。
//
// 用法：
//   npm run verify          # 对比基线
//   npm run verify:update   # 重新生成基线（仅在确认变更符合预期时使用）

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { DOMParser as XmldomParser } from "@xmldom/xmldom";
import { parseWorkbook } from "../src/parser.ts";
import { buildGraph, layeredLayout } from "../src/graph.ts";
import { tokenize, tokenClass } from "../src/formula.ts";
import { buildDataModelGraph } from "../src/lib/datamodel.ts";
import { makeTwb } from "./lib/synthetic-twb.mjs";

const SAMPLE = new URL("../sample.twb", import.meta.url);
const GOLDEN = new URL("./fixtures/sample.golden.json", import.meta.url);
const UPDATE = process.argv.includes("--update");

globalThis.DOMParser = class {
  parseFromString(text) {
    const doc = new XmldomParser().parseFromString(text, "application/xml");
    doc.querySelector = (sel) => doc.getElementsByTagName(sel)[0] || null;
    return doc;
  }
};

const sampleText = readFileSync(SAMPLE, "utf8");
const model = parseWorkbook(sampleText);
const graph = buildGraph(model);
const layout = layeredLayout(graph.nodes, graph.edges);

// 公式高亮取一个代表性样本，防止分词器回归
const calcSamples = model.datasources
  .flatMap((ds) => ds.columns)
  .filter((c) => c.formulaRaw)
  .slice(0, 3)
  .map((c) => ({ name: c.name, tokens: tokenize(c.formula).map((t) => [tokenClass(t), t.value]) }));

const snapshot = {
  parse: model,
  graph,
  layout,
  formulaTokens: calcSamples
};

// ---- 基线对比 ----
const diffPath = (a, b, path = "$") => {
  if (JSON.stringify(a) === JSON.stringify(b)) return null;
  if (typeof a !== typeof b) return `${path}: 类型 ${typeof a} vs ${typeof b}`;
  if (a === null || b === null) return `${path}: ${a} vs ${b}`;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return `${path}: 长度 ${a.length} vs ${b.length}`;
    for (let i = 0; i < a.length; i++) {
      const d = diffPath(a[i], b[i], `${path}[${i}]`);
      if (d) return d;
    }
    return null;
  }
  if (typeof a === "object") {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const d = diffPath(a[k], b[k], `${path}.${k}`);
      if (d) return d;
    }
    return null;
  }
  return `${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`;
};

if (UPDATE) {
  mkdirSync(new URL("./fixtures/", import.meta.url), { recursive: true });
  writeFileSync(GOLDEN, JSON.stringify(snapshot, null, 1) + "\n");
  console.log(`已写入基线：test/fixtures/sample.golden.json`);
}

if (!existsSync(GOLDEN)) {
  console.error("✗ 缺少基线文件 test/fixtures/sample.golden.json，请先运行：npm run verify:update");
  process.exit(1);
}

const golden = JSON.parse(readFileSync(GOLDEN, "utf8"));
let failed = false;
for (const key of ["parse", "graph", "layout", "formulaTokens"]) {
  const d = diffPath(golden[key], snapshot[key]);
  if (d) {
    console.error(`✗ ${key} 与基线不一致\n  首个差异: ${d}`);
    failed = true;
  } else {
    console.log(`✓ ${key} 与基线一致`);
  }
}

// ---- 显式不变量（防止基线被整体误更新而掩盖回归）----
const fields = model.datasources.reduce((s, d) => s + d.columns.length, 0);
const calcs = model.datasources.reduce((s, d) => s + d.columns.filter((c) => c.formula).length, 0);
const params = model.datasources.reduce((s, d) => s + d.columns.filter((c) => c.isParameter).length, 0);
const EXPECTED = {
  仪表板: [model.dashboards.length, 6],
  工作表: [model.worksheets.length, 21],
  数据源: [model.datasources.length, 4],
  字段: [fields, 53],
  计算字段: [calcs, 21],
  图节点: [graph.nodes.length, 62],
  图边: [graph.edges.length, 77],
  布局层数: [layout.lanes.length, 5]
};
for (const [name, [actual, expected]] of Object.entries(EXPECTED)) {
  if (actual !== expected) {
    console.error(`✗ ${name} 期望 ${expected}，实际 ${actual}`);
    failed = true;
  }
}
// ---- 批 4 不变量：数据模型（表 / 自定义 SQL / 连接）、zone 细分与格式 ----
const flatZones = (zs) => zs.flatMap((z) => [z, ...flatZones(z.children)]);
const allZones = model.dashboards.flatMap((d) => flatZones(d.zones));
const shapeCount = allZones.reduce((acc, z) => {
  acc[z.shape] = (acc[z.shape] || 0) + 1;
  return acc;
}, {});
const tableCount = model.datasources.reduce((n, d) => n + d.dataModel.tables.length, 0);
const joinCount = model.datasources.reduce((n, d) => n + d.dataModel.joins.length, 0);
const sqlCount = model.datasources.reduce((n, d) => n + d.dataModel.customSql.length, 0);
const paddedZones = allZones.filter((z) => z.format.padding !== null).length;

// 参数在引用关系图里必须单列一类（既不算维度也不算度量）
{
  const { nodeCategory } = await import("../src/graph.ts");
  const paramNodes = graph.nodes.filter((n) => n.isParameter);
  const cats = new Set(paramNodes.map((n) => nodeCategory(n)));
  const misclassified = graph.nodes.filter(
    (n) => !n.isParameter && nodeCategory(n) === "parameter"
  ).length;
  const checks = {
    "图中参数节点 6 个": [paramNodes.length, 6],
    "参数节点类别均为 parameter": [cats.size === 1 && cats.has("parameter"), true],
    "非参数节点被误判为参数的数量": [misclassified, 0]
  };
  for (const [name, [actual, expected]] of Object.entries(checks)) {
    if (actual !== expected) {
      console.error(`✗ ${name} 期望 ${JSON.stringify(expected)}，实际 ${JSON.stringify(actual)}`);
      failed = true;
    }
  }
}

const PARAM_EXPECTED = {
  "参数总数（6 个，均不再计入计算字段）": [params, 6],
  "参数当前值含 float64 往返噪声（如 0.064000000000000001）": [
    model.datasources.flatMap((d) => d.columns).filter((c) => c.isParameter && /0\.064000000000000001/.test(c.parameter?.value ?? "")).length,
    1
  ],
  "参数被误当公式的数量（应为 0）": [
    model.datasources.flatMap((d) => d.columns).filter((c) => c.isParameter && c.formula !== null).length,
    0
  ]
};
for (const [name, [actual, expected]] of Object.entries(PARAM_EXPECTED)) {
  if (actual !== expected) {
    console.error(`✗ ${name} 期望 ${expected}，实际 ${actual}`);
    failed = true;
  }
}

// 数值格式化：工作簿原值 → 可读值
{
  const { formatParameterValue, stripFloatNoise } = await import("../src/lib/format.ts");
  const fmtChecks = {
    "0.064000000000000001 + p0.00%": [formatParameterValue("0.064000000000000001", "p0.00%"), "6.40%"],
    "0.59999999999999998 + p0%": [formatParameterValue("0.59999999999999998", "p0%"), "60%"],
    "18.399999999999999 + N": [formatParameterValue("18.399999999999999", "N"), "18.4"],
    "50000 + C2052%": [formatParameterValue("50000", "C2052%"), "¥50,000"],
    "字符串参数原样返回": [formatParameterValue("\"名称\"", null), "\"名称\""],
    "去噪 0.064000000000000001": [stripFloatNoise("0.064000000000000001"), 0.064]
  };
  for (const [name, [actual, expected]] of Object.entries(fmtChecks)) {
    if (actual !== expected) {
      console.error(`✗ 格式化·${name} 期望 ${JSON.stringify(expected)}，实际 ${JSON.stringify(actual)}`);
      failed = true;
    }
  }
  console.log(`  参数: ${params} 个（计算字段 ${calcs}）· 数值格式化 6 项通过`);
}

const MODEL_EXPECTED = {
  "数据源表节点（含 collection 下钻）": [tableCount, 5],
  "数据源连接/关系数（示例：对象模型 2 条 relationship）": [joinCount, 2],
  "自定义 SQL 数（示例无）": [sqlCount, 0],
  "zone 总数": [allZones.length, 91],
  "zone·worksheet": [shapeCount.worksheet || 0, 40],
  "zone·flow 容器": [shapeCount.flow || 0, 28],
  "zone·basic 容器": [shapeCount.basic || 0, 12],
  "zone·卡片（筛选器/标题等）": [shapeCount.card || 0, 9],
  "zone·empty": [shapeCount.empty || 0, 1],
  "含 padding 的 zone": [paddedZones, 6]
};
for (const [name, [actual, expected]] of Object.entries(MODEL_EXPECTED)) {
  if (actual !== expected) {
    console.error(`✗ ${name} 期望 ${expected}，实际 ${actual}`);
    failed = true;
  }
}

// ---- 合成夹具：join 链 + 自定义 SQL + zone 格式（真实工作簿不可入库） ----
{
  const synthetic = makeTwb({ datasources: 2, fields: 12, worksheets: 3, zones: 2, joins: 3, customSql: 1, formatPadding: true });
  const sm = parseWorkbook(synthetic);
  const dm = sm.datasources[0].dataModel;
  const checks = {
    "合成·表节点 4 个（t0 + SQL + join2 + join3）": [dm.tables.length, 4],
    "合成·连接 3 条": [dm.joins.length, 3],
    "合成·自定义 SQL 1 段": [dm.customSql.length, 1],
    "合成·首条连接 inner": [dm.joins[0]?.joinType, "inner"],
    "合成·链式左端解析为自定义 SQL 节点": [dm.joins[1]?.left.name, "自定义 SQL 查询1"],
    "合成·SQL 文本含 SELECT": [dm.customSql[0]?.sql?.includes("SELECT"), true],
    "合成·zone padding=4": [sm.dashboards[0].zones[0]?.format?.padding, 4],
    "合成·zone 底色 #f5f5f5": [sm.dashboards[0].zones[0]?.format?.background, "#f5f5f5"]
  };
  for (const [name, [actual, expected]] of Object.entries(checks)) {
    if (actual !== expected) {
      console.error(`✗ ${name} 期望 ${JSON.stringify(expected)}，实际 ${JSON.stringify(actual)}`);
      failed = true;
    }
  }
  const dmGraph = buildDataModelGraph(sm);
  if (dmGraph.nodes.length !== 5 || dmGraph.edges.length !== 3) {
    console.error(`✗ 合成·数据模型图 期望 5 节点/3 边，实际 ${dmGraph.nodes.length}/${dmGraph.edges.length}`);
    failed = true;
  }
  console.log(`  数据模型（合成夹具）: ${dmGraph.nodes.length} 节点 / ${dmGraph.edges.length} 连接`);
}

console.log(
  `  规模: 仪表板 ${model.dashboards.length} · 工作表 ${model.worksheets.length} · 数据源 ${model.datasources.length} · 字段 ${fields} · 计算字段 ${calcs}`
);
console.log(`  数据模型（示例）: ${tableCount} 表 / ${joinCount} 连接 / ${sqlCount} 自定义 SQL · zone ${allZones.length}（含 padding ${paddedZones}）`);
console.log(`  图: ${graph.nodes.length} 节点 / ${graph.edges.length} 边 · 画布 ${layout.width}×${layout.height}`);

if (failed) process.exit(1);
console.log("\n快照与不变量全部通过 ✔");
