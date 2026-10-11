// 生成作用域化 CSS：把原始应用的全局样式转成只作用于 .twb-root 子树内的样式。
// 输入：任意原始 CSS（扁平、无嵌套、无 at-rule —— 本应用的原 CSS 满足）。
// 输出：src/style.css

import { readFileSync, writeFileSync } from "node:fs";

const ORIGINAL = process.argv[2] || "../_extract/tableau_parse/assets/index-DN8-zaKj.css";
const OUT = new URL("./src/style.css", import.meta.url);

let css = readFileSync(new URL(ORIGINAL, import.meta.url), "utf8");

// 1) 变量重命名，避免与宿主 shell 的 CSS 变量冲突（定义与使用处都改）
css = css.replace(/var\(--([a-z-]+)\)/g, (m, name) => `var(--twb-${name})`);
css = css.replace(/--([a-z-]+)\s*:/g, (m, name) => `--twb-${name}:`);

// 2) 去掉针对 html/body/#root 的规则（宿主页面结构不归我们管）
css = css.replace(/html\s*,\s*body\s*,\s*#root\s*\{[^}]*\}/g, "");

// 3) 除 :root 外的选择器全部加上 .twb-root 前缀（:root 稍后整体替换为 .twb-root）
css = css.replace(/([^{}]+)\{/g, (m, sel) => {
  if (sel.trim() === ":root") return m;
  const parts = sel
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s === "body" ? ".twb-root" : ".twb-root " + s));
  return parts.join(",") + "{";
});

// 4) :root 变量块 -> .twb-root 变量块（作用于本面板子树，随继承生效）
css = css.replace(/^:root\{/, ".twb-root{");

// 5) 尺寸：主区整页由 host 布局给定高度（见 plugin.css），此处不再注入额外规则。

writeFileSync(OUT, css);
console.log("written", OUT.pathname, (css.length / 1024).toFixed(1) + " KB");
