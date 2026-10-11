# PROGRESS

> 记录进度、关键决策与「环境坑与绕法」。日期格式 `YYYY-MM-DD`。

## 当前状态（2026-10-11）

- 版本：`0.3.0`（`package.json` ↔ CHANGELOG 已交叉核对）
- DSH 兼容：`0.1.0-rc.6`（开发基线）与 `0.2.1-alpha.2`（端到端实测通过）
- 已发布：GitHub `tableau-China/dsh-tableau-twb-viewer`
  - `v0.1.0`（2026-08-15）与 `v0.2.0`（2026-10-11）Release 均在架，附可安装 tarball
  - 仓库首页为**英文 README**（`README.zh-CN.md` 为中文版），含双语截图 `assets/`
  - CI（`.github/workflows/ci.yml`）与 Release（`release.yml`）在 GitHub 上均为 success
- 验证入口：`npm run verify`（快照）· `npm run bench`（性能护栏）· `npm run e2e`（真实浏览器）· `npm run screenshots`（文档截图）

## 进度

| 批次 | 内容 | 状态 |
|---|---|---|
| 批 1 | 契约卫生、Node 半部降级、缓存校验、快照测试、文档 | ✅ 完成（2026-10-11） |
| 批 2 | O(n²) 修复、基准护栏、大图聚焦、e2e 适配 0.2.x | ✅ 完成（2026-10-11） |
| — | 入口改进：左侧栏面板行 + 主区整页（0.3.0） | ✅ 完成（2026-10-11） |
| 批 3 | TypeScript 迁移、`app.jsx` 组件拆分、pnpm 迁移、`node:test` 单测 | ⏳ 待排期 |
| 批 4 | Mermaid/CSV 导出、i18n、紧凑布局（分块 + 换行） | ⏳ 待排期 |

**明确不做**：`.twbx` 支持（安全考量，见下）。

## 关键决策

| 决策 | 理由 |
|---|---|
| 只读 `.twb`，不解析 `.twbx` | `.twbx` 可能内嵌数据提取（`.hyper`/`.tde`）；`.twb` 只含元数据，数据暴露面最小。误选时给出明确提示。 |
| 解析在浏览器端完成，Node 半部只提供示例路由 | 文件不离开用户浏览器；Node 侧零解析依赖，安装体积小。 |
| 打开即自动加载内置示例 | 降低首次使用门槛（本次需求）。已持久化状态优先于示例，上传自己的文件会替换示例。 |
| 大图聚焦阈值 1200 节点、自动 ±2 跳 | 实测 5,382 节点全量 SVG 渲染明显卡顿；聚焦后 907 节点流畅。阈值可通过常量调整（`app.jsx` 的 `LARGE_GRAPH_NODES`）。 |
| 主入口放左侧栏（`sidebar.panellist` + `main` 整页），设置分区保留为次入口 | 设置里藏插件要求用户主动去找；DSH 0.2.x 的生态惯例是左侧栏面板行 + 主区整页（plugin-manager / schedule 同构），入口常驻可见。两处共用同一 App 组件，仅尺寸变体不同。 |
| 快照测试作为默认回归入口，差分测试降级为可选 | 原始 tableau_parse bundle 不随仓库分发，差分测试在克隆环境必然失败；正确性已一次性证明，日常需要的是「不再漂移」。 |
| 保留 `allowScripts.esbuild` | npm 11.16+ 默认拦截依赖构建脚本，放行后 `npm install` 才能拿到 esbuild 二进制；移除会导致构建失败。迁 pnpm 时改用 `pnpm.onlyBuiltDependencies`。 |

## 环境坑与绕法

| 现象 | 原因 | 绕法 |
|---|---|---|
| `git push` 到 github.com 超时（"Operation too slow"） | 本机网络屏蔽 `github.com:443`；`api.github.com`、`raw.githubusercontent.com`、`codeload` 可达 | 用 gh CLI + git-data API 重放对象（blob/tree/commit/ref）；SSH 22 端口可连但密钥未注册 |
| 细粒度 PAT 无法使用 git-data API / 建 tag | 细粒度 token 不支持 git 数据库端点 | 用 classic token（`repo` + `workflow` scope） |
| API 建 commit 的 sha 与本地 `git commit` 不一致 | API **原样**存储发送的日期与消息（GET 展示时转 UTC、剥尾换行），本地 `commit-tree` 需用 `%B` 原始字节 + 本地时区 | 对齐脚本用本地 `%B` + `epoch tz` 调 `commit-tree`，逐 sha 校验 |
| `npm install` 后 esbuild 无二进制 | npm 11.16+ 的 allow-scripts 策略 | `npm approve-scripts esbuild`（已落库为 `package.json.allowScripts`） |
| DSH 0.2.x 首次访问 401/303 | 新增 `?token=` 鉴权与 cookie 会话 | e2e 直接使用启动日志打印的带 token URL；curl 需 `-L -c/-b` 带 cookie |
| 无头 Chrome 里 React 弹窗点不掉 | 合成 `element.click()` 被弹窗拦截 | 用 puppeteer 的**真实鼠标点击**（`page.mouse.click` 于元素包围盒中心） |
| 0.2.x 引导流程变化（工作区/preset/API key） | 新版引导步骤调整 | e2e 采用「能点就点」策略：目录选择器 → Continue → Configure later，直至出现设置触发器 |
| `npm run verify` 在克隆环境 ENOENT | 依赖仓库外 `_extract/` 原始 bundle | 改为快照测试；差分验证降级为可选脚本 |

## 验证记录（0.2.0）

| 项 | 命令 | 结果 |
|---|---|---|
| 快照一致性 | `npm run verify` | 解析/构图/布局/分词 全部一致；6 仪表板·21 工作表·4 数据源·53 字段·62 节点/71 边 |
| 与原始实现差分 | `npm run verify:reference` | 逐字节一致 ✓ |
| 性能曲线 | `npm run bench` | 16,000 字段（2.9 万节点）构图+布局 195 ms；护栏 2000 ms 内 ✓ |
| 端到端（0.2.1-alpha.2） | `npm run e2e` | 19 项断言全通过（含自动加载示例、全屏、Esc 恢复） |
| 大图聚焦 | `TWB_LARGE_FIELDS=1500 npm run e2e` | 5,382 节点 → 自动聚焦 907 → 「全部」恢复 5,382 ✓ |

## 下阶段建议

1. **批 3（工程升级）**：`src/app.jsx` 拆分（`components/` + `lib/`）、TypeScript（esbuild 原生支持，
   加 `check:types`）、pnpm 迁移（`packageManager` + `pnpm-lock.yaml` + CI 改用 `--frozen-lockfile`
   + `pnpm.onlyBuiltDependencies: ["esbuild"]`）、`node:test` 覆盖解析/构图边界。
2. **批 4（功能）**：血缘图 Mermaid / CSV 导出（写文档直接可用）；i18n（`ctx.locale` 字典，
   客户端 inject 需加 `locale`）；布局按数据源分块 + 层内换行，压缩超宽画布。
3. **发布**：改动确认后 `git tag v0.2.0` 触发 Actions 生成 Release（当前工作区改动尚未提交/打标）。
