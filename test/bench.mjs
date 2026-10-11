// 性能基准：用合成工作簿测量 解析 / 构图 / 布局 的规模曲线。
//
// 用途：
//   1. 回归防护 —— 防止构图与布局重新退化为 O(n²)（见下方预算断言）；
//   2. 给出真实规模下（数千字段）的可预期耗时。
//
// 用法：npm run bench

import { DOMParser as XmldomParser } from "@xmldom/xmldom";
import { parseWorkbook } from "../src/parser.js";
import { buildGraph, layeredLayout } from "../src/graph.js";
import { makeTwb } from "./lib/synthetic-twb.mjs";

globalThis.DOMParser = class {
  parseFromString(text) {
    const doc = new XmldomParser().parseFromString(text, "application/xml");
    doc.querySelector = (sel) => doc.getElementsByTagName(sel)[0] || null;
    return doc;
  }
};

const time = (fn) => {
  const t0 = performance.now();
  const out = fn();
  return { ms: performance.now() - t0, out };
};

const SIZES = [500, 1000, 2000, 4000, 8000];
// 回归预算：8000 字段（约 1.4 万节点）下 构图+布局 的耗时上限。
// 修复前实测约 7000ms（O(n²)）；修复后约 300ms。取 2000ms 作为宽松护栏。
const BUDGET_MS = 2000;

console.log("字段规模 | 解析(ms) | 构图(ms) | 布局(ms) | 构图+布局 | 节点数 | 画布尺寸");
console.log("-".repeat(80));

let worst = 0;
for (const fields of SIZES) {
  const twb = makeTwb({ datasources: 2, fields });
  const p = time(() => parseWorkbook(twb));
  const g = time(() => buildGraph(p.out));
  const l = time(() => layeredLayout(g.out.nodes, g.out.edges));
  const total = g.ms + l.ms;
  if (fields === SIZES[SIZES.length - 1]) worst = total;
  console.log(
    `${String(fields * 2).padStart(8)} | ${p.ms.toFixed(0).padStart(8)} | ${g.ms.toFixed(0).padStart(8)} | ${l.ms.toFixed(0).padStart(8)} | ${total.toFixed(0).padStart(9)} | ${String(g.out.nodes.length).padStart(6)} | ${l.out.width}×${l.out.height}`
  );
}

console.log(`\n最大规模 构图+布局 = ${worst.toFixed(0)} ms（预算 ${BUDGET_MS} ms）`);
if (worst > BUDGET_MS) {
  console.error("✗ 超出预算：构图/布局可能重新退化（检查是否引入了线性扫描）");
  process.exit(1);
}
console.log("✓ 规模曲线正常（近线性）");
