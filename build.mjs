// 构建 lib/client.js：把 src/ 打包成 DSH 客户端插件所需的 ModuleLoader 工厂格式。
// 使用方式：npm run build（需要先 npm install 安装 esbuild）。

import { build } from "esbuild";
import { readFileSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const ID = pkg.name;

const result = await build({
  entryPoints: ["src/app.jsx"],
  bundle: true,
  format: "cjs",
  platform: "browser",
  jsx: "automatic",
  loader: { ".css": "text" },
  // react / react-dom 与所有 @deepseek-ai/* 共享模块由宿主 shell 提供，不打进包
  external: ["react", "react/jsx-runtime", "react-dom", "react-dom/client", "@deepseek-ai/*"],
  write: false,
  minify: true,
  legalComments: "none",
  logLevel: "warning"
});

const body = result.outputFiles[0].text;

const wrapped = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(ID)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
${body}
\t\treturn module.exports;
\t}
});
`;

writeFileSync(new URL("./lib/client.js", import.meta.url), wrapped);
console.log(`lib/client.js written (${(wrapped.length / 1024).toFixed(1)} KB)`);
