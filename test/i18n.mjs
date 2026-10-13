// 文案字典护栏：中英键必须一一对应，组件引用的键必须存在，死键不许留。
//
// 背景：MetaPanel / FieldsTable 删除后遗留了 36 个死键；welcome 页的 welcomeMeta
// 被引用却未定义（界面会显示原始 key "welcomeMeta"）。这两类问题都靠本脚本兜住。

import { readFileSync } from "node:fs";

const SRC = new URL("../src/i18n.tsx", import.meta.url);
const src = readFileSync(SRC, "utf8");

/** 取出某个语言字典的键（字典字面量顶层缩进两空格）。 */
const keysOf = (locale) => {
  const start = src.indexOf(`export const ${locale}: Dict = {`);
  if (start < 0) throw new Error(`找不到字典：${locale}`);
  const end = src.indexOf("\n};", start);
  return [...src.slice(start, end).matchAll(/^\s{2}([A-Za-z0-9_]+):/gm)].map((m) => m[1]);
};

const zh = keysOf("zh");
const en = keysOf("en");

/** 组件源码：用于收集实际引用的键。 */
const FILES = [
  "src/app.tsx",
  "src/plugin.tsx",
  "src/components/DashboardView.tsx",
  "src/components/LineageView.tsx",
  "src/components/DataModelView.tsx",
  "src/components/WorkbookPanel.tsx",
  "src/components/Uploader.tsx",
  "src/components/FormulaCode.tsx"
];
const code = FILES.map((f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8")).join("\n");

// 直接调用 t("key")
const direct = new Set([...code.matchAll(/\bt\("([A-Za-z0-9_]+)"/g)].map((m) => m[1]));
// 任意字符串字面量（覆盖 ZONE_LEGEND_KEY / joinLabel 这类查表）
const literals = new Set([...code.matchAll(/"([A-Za-z0-9_]+)"/g)].map((m) => m[1]));

let failed = false;
const report = (name, list) => {
  if (list.length === 0) {
    console.log(`✓ ${name}`);
    return;
  }
  console.error(`✗ ${name}：${list.join(", ")}`);
  failed = true;
};

report("中英键一一对应（仅中文有）", zh.filter((k) => !en.includes(k)));
report("中英键一一对应（仅英文有）", en.filter((k) => !zh.includes(k)));
report("组件引用的键都在字典里", [...direct].filter((k) => !zh.includes(k)).sort());
report("没有死键（无人引用）", zh.filter((k) => !direct.has(k) && !literals.has(k)).sort());

console.log(`  字典: zh ${zh.length} 键 · en ${en.length} 键 · 组件引用 ${direct.size} 键`);
if (failed) process.exit(1);
console.log("\n文案字典检查通过 ✔");
