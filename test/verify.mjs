// 差分验证：把原始 tableau_parse bundle 中的解析/构图/布局函数原样取出，
// 与移植后的 src/ 实现（parser.js / graph.js）在同一个 sample.twb 上运行，
// 深度对比输出，确保移植不失真。
//
// 用法：npm run verify

import { readFileSync } from "node:fs";
import { DOMParser } from "@xmldom/xmldom";
import { parseWorkbook } from "../src/parser.js";
import { buildGraph, layeredLayout } from "../src/graph.js";

const BUNDLE = new URL("../../_extract/tableau_parse/assets/index-C1VrwA6o.js", import.meta.url);
const SAMPLE = new URL("../sample.twb", import.meta.url);

const bundle = readFileSync(BUNDLE, "utf8");
const sampleText = readFileSync(SAMPLE, "utf8");

// ---- 1. 从原始 bundle 切出原实现（同一 eval 作用域，函数互相引用）----
const sliceParser = bundle.slice(
  bundle.indexOf("const Rr=1e5"),
  bundle.indexOf("function Ep")
);
const sliceGraph = bundle.slice(
  bundle.indexOf("function Np"),
  bundle.indexOf("const ln=176")
);
const sliceLayout = bundle.slice(
  bundle.indexOf("const ln=176"),
  bundle.indexOf("function Tp")
);

// xmldom 不实现 querySelector —— 两种实现共用同一个垫片，差分依然有效
const shimQuerySelector = (doc) => {
  doc.querySelector = (sel) => doc.getElementsByTagName(sel)[0] || null;
  return doc;
};

// 在 Node 全局提供 DOMParser（两种实现都读全局）
globalThis.DOMParser = class {
  parseFromString(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    return shimQuerySelector(doc);
  }
};

const original = new Function(`
  ${sliceParser}
  ${sliceGraph}
  ${sliceLayout}
  return { Sp, Cp, Pp };
`)();

// ---- 2. 解析对比 ----
const origModel = original.Sp(sampleText);
const myModel = parseWorkbook(sampleText);

const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const diffPath = (a, b, path = "$") => {
  if (JSON.stringify(a) === JSON.stringify(b)) return null;
  if (typeof a !== typeof b) return `${path}: type ${typeof a} vs ${typeof b}`;
  if (a === null || b === null) return `${path}: ${a} vs ${b}`;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return `${path}: length ${a.length} vs ${b.length}`;
    for (let i = 0; i < a.length; i++) {
      const d = diffPath(a[i], b[i], `${path}[${i}]`);
      if (d) return d;
    }
    return null;
  }
  if (typeof a === "object") {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const d = diffPath(a[k], b[k], `${path}.${k}`);
      if (d) return d;
    }
    return null;
  }
  return `${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`;
};

const check = (name, a, b) => {
  const d = diffPath(a, b);
  if (d) {
    console.error(`✗ ${name}\n  首个差异: ${d}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${name}`);
  }
};

check("parseWorkbook (dashboards/worksheets/datasources)", origModel, myModel);
console.log(
  `  模型规模: 仪表板 ${myModel.dashboards.length} · 工作表 ${myModel.worksheets.length} · 数据源 ${myModel.datasources.length} · 字段 ${myModel.datasources.reduce((s, d) => s + d.columns.length, 0)}`
);

// ---- 3. 构图对比 ----
const origGraph = original.Cp(origModel);
const myGraph = buildGraph(origModel);
check("buildGraph (nodes/edges/dsNodes)", origGraph, myGraph);
console.log(`  图规模: ${myGraph.nodes.length} 节点 / ${myGraph.edges.length} 边`);

// ---- 4. 布局对比 ----
const origLayout = original.Pp(origGraph.nodes, origGraph.edges);
const myLayout = layeredLayout(origGraph.nodes, origGraph.edges);
check("layeredLayout (pos/lanes/width/height)", origLayout, myLayout);
console.log(
  `  画布: ${myLayout.width}×${myLayout.height} · 层数 ${myLayout.lanes.length} · 位置点 ${Object.keys(myLayout.pos).length}`
);

if (!process.exitCode) console.log("\n全部一致，移植无失真 ✔");
