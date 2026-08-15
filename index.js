// dsh-tableau-twb-viewer — Node 半部（Cordis 插件）
//
// 职责：
//   1. 让本包成为 profile 中一个已加载的 Cordis 插件行（client-modules 只扫描
//      已加载的 Loader 条目，本包因此才会被识别为 `dsh.client` 客户端插件）。
//   2. 注册一个 HTTP 路由，向浏览器端提供「载入示例」所用的 sample.twb。
//
// 真正的解析 / 关系图 / 渲染全部在浏览器端（lib/client.js），这里不需要 Node
// 侧的解析能力。

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const name = "dsh-tableau-twb-viewer";

/** 需要 webServer 服务（dsh-host-webserver 提供）来注册示例路由。 */
export const inject = ["webServer"];

const here = dirname(fileURLToPath(import.meta.url));
const sample = readFileSync(join(here, "sample.twb"));

export function apply(ctx) {
  ctx.webServer.register({
    kind: "exact",
    path: "/twb-viewer/sample.twb",
    handler(req, res) {
      res.writeHead(200, {
        "content-type": "application/xml; charset=utf-8",
        "content-length": sample.length
      });
      res.end(sample);
    }
  });
  ctx.logger.info("[tableau-twb-viewer] 示例路由就绪: /twb-viewer/sample.twb");
}
