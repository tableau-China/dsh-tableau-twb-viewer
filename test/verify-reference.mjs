// 差分验证（可选）：把原始 tableau_parse bundle 中的解析/构图/布局函数原样取出，
// 与当前 src/ 实现跑同一个 sample.twb，逐字节对比输出。
//
// 这是移植正确性的**一次性证明**；原始 bundle 不随仓库分发，因此本脚本在找不到
// 它时会明确跳过（退出码 0），日常回归请用 npm run verify（快照测试）。
//
// 用法：
//   npm run verify:reference
//   TWB_REFERENCE_BUNDLE=/path/to/index-*.js npm run verify:reference

import { readFileSync, existsSync } from "node:fs";
import { DOMParser as XmldomParser } from "@xmldom/xmldom";
import { parseWorkbook } from "../src/parser.ts";
import { buildGraph, layeredLayout } from "../src/graph.ts";

const CANDIDATES = [
  process.env.TWB_REFERENCE_BUNDLE,
  new URL("../../_extract/tableau_parse/assets/index-C1VrwA6o.js", import.meta.url).pathname
].filter(Boolean);

const bundlePath = CANDIDATES.find((p) => existsSync(p));
if (!bundlePath) {
  console.log("⏭ 跳过：未找到原始 tableau_parse bundle。");
  console.log("   设置 TWB_REFERENCE_BUNDLE=/path/to/index-C1VrwA6o.js 后可运行差分验证。");
  console.log("   常规回归请使用：npm run verify");
  process.exit(0);
}

const SAMPLE = new URL("../sample.twb", import.meta.url);
const bundle = readFileSync(bundlePath, "utf8");
const sampleText = readFileSync(SAMPLE, "utf8");

const sliceParser = bundle.slice(bundle.indexOf("const Rr=1e5"), bundle.indexOf("function Ep"));
const sliceGraph = bundle.slice(bundle.indexOf("function Np"), bundle.indexOf("const ln=176"));
const sliceLayout = bundle.slice(bundle.indexOf("const ln=176"), bundle.indexOf("function Tp"));

globalThis.DOMParser = class {
  parseFromString(text) {
    const doc = new XmldomParser().parseFromString(text, "application/xml");
    doc.querySelector = (sel) => doc.getElementsByTagName(sel)[0] || null;
    return doc;
  }
};

const original = new Function(`
  ${sliceParser}
  ${sliceGraph}
  ${sliceLayout}
  return { Sp, Cp, Pp };
`)();

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
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const d = diffPath(a[k], b[k], `${path}.${k}`);
      if (d) return d;
    }
    return null;
  }
  return `${path}: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`;
};

let failed = false;
const check = (name, a, b) => {
  const d = diffPath(a, b);
  if (d) {
    console.error(`✗ ${name}\n  首个差异: ${d}`);
    failed = true;
  } else {
    console.log(`✓ ${name}`);
  }
};

const origModel = original.Sp(sampleText);
const myModel = parseWorkbook(sampleText);
check("parseWorkbook", origModel, myModel);

const origGraph = original.Cp(origModel);
const myGraph = buildGraph(origModel);
check("buildGraph", origGraph, myGraph);

check("layeredLayout", original.Pp(origGraph.nodes, origGraph.edges), layeredLayout(origGraph.nodes, origGraph.edges));

if (failed) process.exit(1);
console.log("\n与原始实现逐字节一致 ✔");
