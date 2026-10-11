// dsh-tableau-twb-viewer — Node 半部（Cordis 插件）
//
// 职责：
//   1. 让本包成为 profile 中一个已加载的 Cordis 插件行（client-modules 只扫描
//      已加载的 Loader 条目，本包因此才会被识别为 `dsh.client` 客户端插件）。
//   2. 注册一个 HTTP 路由，向浏览器端提供「内置示例」所用的 sample.twb。
//
// 设计要点：
//   · 示例文件**惰性读取**且失败可降级 —— 顶层 readFileSync 在文件缺失时会抛错，
//     导致整个插件行加载失败；这里改为首次请求时读取，失败仅让该路由返回 404。
//   · 只提供 .twb（纯元数据）。插件有意不解析 .twbx（打包工作簿可能内嵌
//     数据提取，如 .hyper），参见 README「数据安全」一节。

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const name = "dsh-tableau-twb-viewer";

/** 需要 webServer 服务（dsh-host-webserver 提供）来注册示例路由。 */
export const inject = ["webServer"];

/** 内置示例的路由路径（客户端 fetch 同一常量）。 */
export const SAMPLE_PATH = "/twb-viewer/sample.twb";

const here = dirname(fileURLToPath(import.meta.url));

export function apply(ctx) {
  /** undefined = 尚未读取；null = 读取失败（已记录日志，不再重试）。 */
  let sample;
  let failed = false;

  const loadSample = () => {
    if (sample !== undefined || failed) return sample ?? null;
    try {
      sample = readFileSync(join(here, "sample.twb"));
    } catch (err) {
      failed = true;
      sample = null;
      ctx.logger.warn(
        "[tableau-twb-viewer] 内置示例读取失败，示例路由将返回 404（插件其余功能不受影响）：%s",
        err instanceof Error ? err.message : String(err)
      );
    }
    return sample;
  };

  ctx.webServer.register({
    kind: "exact",
    path: SAMPLE_PATH,
    handler(req, res) {
      if (req.method !== "GET" && req.method !== "HEAD") {
        res.writeHead(405, { allow: "GET, HEAD" });
        res.end();
        return;
      }

      const buf = loadSample();
      if (buf === null) {
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        res.end("内置示例不可用：sample.twb 缺失");
        return;
      }

      res.writeHead(200, {
        "content-type": "application/xml; charset=utf-8",
        "content-length": buf.length,
        "cache-control": "public, max-age=3600"
      });
      res.end(req.method === "HEAD" ? undefined : buf);
    }
  });

  ctx.logger.info("[tableau-twb-viewer] 示例路由就绪: %s", SAMPLE_PATH);
}
