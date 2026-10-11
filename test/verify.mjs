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
const EXPECTED = {
  仪表板: [model.dashboards.length, 6],
  工作表: [model.worksheets.length, 21],
  数据源: [model.datasources.length, 4],
  字段: [fields, 53],
  计算字段: [calcs, 27],
  图节点: [graph.nodes.length, 62],
  图边: [graph.edges.length, 71],
  布局层数: [layout.lanes.length, 5]
};
for (const [name, [actual, expected]] of Object.entries(EXPECTED)) {
  if (actual !== expected) {
    console.error(`✗ ${name} 期望 ${expected}，实际 ${actual}`);
    failed = true;
  }
}
console.log(
  `  规模: 仪表板 ${model.dashboards.length} · 工作表 ${model.worksheets.length} · 数据源 ${model.datasources.length} · 字段 ${fields} · 计算字段 ${calcs}`
);
console.log(`  图: ${graph.nodes.length} 节点 / ${graph.edges.length} 边 · 画布 ${layout.width}×${layout.height}`);

if (failed) process.exit(1);
console.log("\n快照与不变量全部通过 ✔");
