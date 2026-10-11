# CHANGELOG

## 版本对照

| 版本 | 日期 | DSH 基线 | 说明 |
|---|---|---|---|
| 0.3.1 | 2026-10-11 | 0.2.1-alpha.2 | 移除设置入口（唯一入口=左侧栏）、精简工具栏、接入 npm 发布 |
| 0.3.0 | 2026-10-11 | 0.2.1-alpha.2 | 入口改进：左侧栏面板行 + 主区整页 |
| 0.2.0 | 2026-10-11 | 0.2.1-alpha.2 | 性能修复、打开即加载示例、大图聚焦、不解析 .twbx（安全） |
| 0.1.0 | 2026-08-15 | 0.1.0-rc.6 | 首个发布版本（GitHub Release） |

## 0.3.1 — 2026-10-11

### 变更

- **移除设置页入口**：唯一入口为左侧栏面板行（`sidebar.panellist` + `main` 整页），
  不再注册 `settings.section`——避免「自定义插件藏在设置里」的认知负担，入口唯一且常驻可见。
- 移除上传区提示文案「拖拽 .twb 到此处，或点击选择（打开时已自动载入内置示例）」，工具栏更简洁。
- `package.json` 增加 `publishConfig`（官方 registry + public），避免本机镜像源影响发布。
- 发布链路：GitHub Release + **npm 包**（走 CI 暂存 `npm stage publish` + 一次 OTP 批准）。

## 0.3.0 — 2026-10-11

### 新增

- **入口位置改进（重要）**：插件从「只能在设置里找到」改为在 **DSH 左侧栏注册面板行**
  （`sidebar.panellist`）+ **主区整页**（`main` 槽位，keyed by panel id）——这是 DSH 0.2.x 的
  生态惯例（`plugin-manager` / `schedule` 同构）。用户点左侧栏一行即在对话旁以整页打开检视器，
  不必期待他们去「设置」里找自定义插件。
  设置分区（`settings.section`）保留为次入口，互不影响。
- 左侧栏图标为自绘 SVG（工作簿 + 血缘节点），跟随 host 主题色；面板与设置两个上下文使用
  各自的尺寸变体（`.twb-root--panel` / `.twb-root--section`）。
- 新增入口位置截图 `assets/panel.png`。

### 验证

- 端到端测试扩展至 26 项断言：左侧栏入口 → 主区整页 → 自动加载示例 → 布局/血缘/聚焦/
  全屏 → 退出全屏后状态保留 → 设置次入口可用 → 大图聚焦（5,382 节点 → 907）→ 控制台零错误。
## 0.2.0 — 2026-10-11（已发布）

> Release：<https://github.com/tableau-China/dsh-tableau-twb-viewer/releases/tag/v0.2.0>
> 安装：`dsh plugin --profile web add https://github.com/tableau-China/dsh-tableau-twb-viewer/releases/download/v0.2.0/dsh-tableau-twb-viewer-0.2.0.tgz`

### 文档与发布

- **英文 README 成为仓库首页**（npm 首页同样展示英文），中文版改为 `README.zh-CN.md`，
  两版均含语言切换、pitch、特性、截图、安装、常见问题与兼容性表；
- 新增 `assets/` 双语截图（`npm run screenshots` 可复现生成）；
- 新增 `.github/workflows/ci.yml`：构建一致性校验（入库的 `lib/client.js` 必须与源码一致）
  + 快照测试 + 性能护栏；
- `package.json`：description / keywords 英文化，`files` 增补双语 README 与 LICENSE，
  `dsh.client.inject` 改为服务名 `["slots"]`（与生态惯例及 bundle 内导出一致）；
- 仓库补齐 GitHub description 与 topics；CI 与 Release 工作流均为 success。

### 修复

- **性能（重要）**：构图与布局存在三处线性扫描，整体为 O(n²)。
  实测量级：8,000 字段（1.4 万节点）构图+布局从 **7,061 ms → 94 ms**（约 75×），
  规模曲线恢复近线性。改动点：
  - `buildGraph`：跨数据源回退索引由「遍历整个 Map 做 endsWith」改为预建 Map（先出现者优先，
    语义与原先一致）；
  - `buildGraph`：unknown 节点去重由 `nodes.find` 改为 id `Set`；
  - `layeredLayout`：深度计算中的 `nodes.find` 改为预建 `id → node` Map。
  正确性由「与原始 tableau_parse 实现逐字节差分」与快照测试双重把关。
- **Node 半部健壮性**：`sample.twb` 由顶层 `readFileSync` 改为**惰性读取 + 失败降级**
  （原实现文件缺失会导致整个插件行加载失败）；示例路由补充 HEAD 支持与缓存头。
- **缓存健壮性**：sessionStorage 恢复增加**形状校验**（模型结构 / 视图枚举 / 索引合法性），
  旧版本或损坏的缓存会被丢弃而不是让面板白屏。
- **契约卫生**：`dsh.client.inject` 指向的 `@deepseek-ai/dsh-client-runtime` 在 DSH 0.2.x
  已被移除（`slots` 服务现由 `dsh-client-ui-renderer` 提供），改为
  `["@deepseek-ai/dsh-client-ui-renderer", "@deepseek-ai/dsh-client-ui-settings"]`；
  删除未使用的 `@deepseek-ai/cordis` peer 依赖。
- **测试基建**：`npm run verify` 原先依赖仓库外的原始 bundle（克隆后必崩），
  改为**快照测试 + 显式不变量**（`test/fixtures/sample.golden.json`，克隆即可运行）；
  与原始实现的差分验证保留为可选的 `npm run verify:reference`。

### 新增

- **打开即用**：打开插件无缓存时自动加载内置示例 `sample.twb`，并显示加载态；
  上传自己的文件会替换示例（不影响已持久化的状态恢复）。
- **大图聚焦**：节点数超过 1200 时，选中节点自动聚焦其 ±2 跳血缘（工具栏可切
  ±1 / ±2 / ±3 / 全部，并显示 `可见/总数`）。实测 5,382 节点的工作簿：
  全量渲染 → 选中后聚焦 907 节点 → 切「全部」恢复。
- **性能基准**：`npm run bench` 输出规模曲线，并带回归护栏
  （8,000 字段构图+布局超过 2000 ms 即失败，防止 O(n²) 复发）。
- **端到端测试升级**：适配 DSH 0.2.x（token 鉴权 URL、新引导流程），
  覆盖自动加载示例、聚焦、全屏、Esc 恢复等 19 项断言；
  `TWB_LARGE_FIELDS=1500` 可额外验证大图聚焦。
- **文档**：新增本 CHANGELOG 与 `PROGRESS.md`；README 增补「数据安全」一节与兼容性表。

### 设计决策

- **不支持 `.twbx`（有意）**：`.twbx` 是 zip 打包，可能内嵌数据提取（`.hyper` / `.tde`）。
  只读解析不含数据的 `.twb` 元数据可显著降低数据暴露面。误选 `.twbx` 时给出明确提示，
  引导用户「另存为」`.twb`。

### 已知问题 / 待办

- 单文件 `src/app.jsx` 约 1,360 行，尚未拆分组件；无 TypeScript；包管理仍为 npm
  （用户约定为 pnpm）——列为下一阶段（批 3）。
- 布局仍是单层横向铺开，超大工作簿画布会很宽（8,000 字段约 17 万 px）；
  聚焦模式缓解了渲染压力，但「按数据源分块 + 层内换行」的紧凑布局尚未实现。
- i18n 尚未接入 `ctx.locale`（当前界面文案为中文硬编码）。

## 0.1.0 — 2026-08-15

- 首个发布版本：1:1 仪表板布局图（SVG/PNG/Excalidraw 导出）、字段引用关系图
  （上下游血缘）、数据源/字段/计算字段 metadata、全屏模式、状态持久化。
- 由内部工具 tableau_parse 移植而来，解析/构图/布局与原始实现逐字节一致。
- GitHub Release 附带 `dsh-tableau-twb-viewer-0.1.0.tgz`。
