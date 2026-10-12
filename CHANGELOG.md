# CHANGELOG

## 版本对照

| 版本 | 日期 | DSH 基线 | 说明 |
|---|---|---|---|
| 0.5.2 | 2026-10-12 | 0.2.1-alpha.2 | 修复：关系改弧线、子表对齐父表中心、参数不再当计算字段（数值不再长小数） |
| 0.5.1 | 2026-10-12 | 0.2.1-alpha.2 | 修复：解析新版对象模型（object-graph），补回表间关系 |
| 0.5.0 | 2026-10-12 | 0.2.1-alpha.2 | 批 4：自定义 SQL、表级数据模型（join/基数）、zone 细分与 padding |
| 0.4.0 | 2026-10-11 | 0.2.1-alpha.2 | 批 3 工程升级：TypeScript + 组件拆分 + pnpm + 中英双语 |
| 0.3.1 | 2026-10-11 | 0.2.1-alpha.2 | 移除设置入口（唯一入口=左侧栏）、精简工具栏、接入 npm 发布 |
| 0.3.0 | 2026-10-11 | 0.2.1-alpha.2 | 入口改进：左侧栏面板行 + 主区整页 |
| 0.2.0 | 2026-10-11 | 0.2.1-alpha.2 | 性能修复、打开即加载示例、大图聚焦、不解析 .twbx（安全） |
| 0.1.0 | 2026-08-15 | 0.1.0-rc.6 | 首个发布版本（GitHub Release） |

## 0.5.2 — 2026-10-12

### 修复

- **数据模型的连线改为平衡弧线，并去掉「关系」文字标签**：对象模型的关系、显式 join 一律用
  三次贝塞尔弧线（源节点右中点 → 目标节点左中点，两侧控制点对称外推）；同列/反向的边退回向上拱起的二次弧线。
  连接类型、ON 条件、基数改在**详情面板**与悬停提示里看，画布更干净；弧线另加 14px 隐形命中层，细线也好点。
- **子表对齐父表中心**：此前每层在画布内平均分布，「订单 → 人员 / 退货」这类 1 对多关系里
  右侧两张表相对整列居中而不是相对「订单」居中，视觉上整体偏上。现在子节点期望位置 = 父节点中心均值，
  同层按期望位置排序后就近落位，最后整组平移贴合（实测父/子组中心差 0px）。
- **参数（Tableau Parameter）不再被当成计算字段**：此前 `<column param-domain-type=...>` 的
  当前值被当作公式展示，于是出现 `流失率 = 0.064000000000000001`、`佣金率 = 18.399999999999999`
  这类 float64 往返噪声。现在参数单独识别（值/格式/取值域/区间），
  **计算字段从 27 项修正为 21 项**，参数另立「参数」页签。
- **新增数值格式化**（`src/lib/format.ts`）：按工作簿自带 `default-format` 呈现——
  `p0.00%` → `6.40%`、`p0%` → `60%`、`N` → `18.4`、`C2052` → `¥50,000`；
  同时保留「原始值」便于对照。字符串参数（如 `["名称"]`）原样显示。
- 字段表给参数加「参数」徽标；数据源卡片增加「参数」计数。

### 验证

- 不变量新增 9 项：参数 6 个 / 参数被误当公式 0 个 / 6 项数值格式化用例；计算字段 21、图边 77（参数不再算 calc，
  补回「Parameters 数据源 → 6 个参数」的 6 条输入边）。
- e2e 增至 55 项：弧线为三次贝塞尔 2/2、画布无「关系」文字标签、**子表围绕父表中心对齐（父 403 / 子组中心 403）**、
  参数页签 6 项且 流失率=6.40%、计算字段页签不再出现长小数。

## 0.5.1 — 2026-10-12

### 修复

- **新版对象模型（`<object-graph>`）没解析，导致表间关系丢失**：内置示例「示例 - 超市」的 3 张表
  （订单 / 人员 / 退货）本来有 2 条 relationship（`[区域] = [区域 (人员)]`、`[订单 ID] = [订单 ID (退货)]`），
  但此前只解析 `<connection>` 下的 legacy relation 树，于是数据模型里 3 张表**互不相连**。
  现在**优先解析对象模型**：`<objects><object id caption>` 给出表（含 caption 与物理表名），
  `<relationships><relationship>` 给出表达式与首尾端点 `object-id`，端点按 object-id 反查表。
  没有对象模型的旧文件仍走 legacy relation 树（join / collection / union）——两条路径都有测试覆盖。
- 逻辑关系在数据模型视图里标注为「关系」：Tableau 的逻辑关系不写 `join` 关键字，
  实际连接方式由查询时决定，因此不冒充 inner/left/right。

### 验证

- 不变量：示例 5 表 / **2 条关系**（原为 0）；合成夹具（legacy join 路径）5 节点 / 3 连接不变。
- e2e 增至 45 项：新增「示例数据模型：5 张表」「2 条对象模型关系」「关系类型标注」。

## 0.5.0 — 2026-10-12

批 4：按产品源头（AI Studio 版「Tableau Layout Converter & Design Inspector」）补齐数据层能力。

### 新增

- **自定义 SQL 提取**：解析 `<relation type='text'>`，Metadata 面板新增「自定义 SQL」页签，按数据源列出全文并可一键复制（交付核对取数口径）。
- **表级数据模型视图**：解析 `<relation>` 树（join / collection / union、嵌套 join、ON 表达式、基数），新增「数据模型」页签——ER 风格图 + 连接类型（内/左/右/全）标注 + 详情面板（连接条件、物理表名、所属数据源）。
  - 连接两端按 ON 表达式里的 `[表].[字段]` 限定符解析，链式 join 不再错记成子树首表。
- **zone 级细化**：解析 `<zone-style>` 里的 padding / margin / 底色 / 边框；zone 细分类型（工作表 / 流式容器 / 基础容器 / 卡片（筛选器、标题等）/ 文本 / 空白）分色并新增布局图例；悬停 zone 显示尺寸、内边距、外边距与底色。
- 数据源卡片新增「表 / 连接 / 自定义 SQL」计数。

### 验证

- 不变量新增：示例 5 表 / 91 zone（worksheet 40、flow 28、basic 12、card 9、empty 1）/ 6 个含 padding；合成夹具 5 节点 / 3 连接 / 1 段 SQL。
- e2e 从 31 项增至 42 项：数据模型 5 节点 3 连接、连接类型标注、ON 条件详情、基数说明、自定义 SQL 清单与复制按钮、布局图例。
- 夹具与截图**全部合成**：客户工作簿（含服务器名、库表名、SQL）不入库。

## 0.4.0 — 2026-10-11

批 3 工程升级：TypeScript 迁移 + 组件拆分 + pnpm + 中英双语界面。

### 新增

- **中英双语界面（i18n）**：文案字典经宿主 `ctx.locale.register(NS, { zh, en })` 注册，
  面板跟随 DSH 界面语言实时切换（`dsh.client.inject` 增加 `locale`）；面板标签、标题、
  副标题、页签、按钮、表头、图例、提示语全部双语。工作簿数据（工作表名、字段名）原样呈现。
  端到端测试新增真实切换验证：设置 → 通用 → 语言 切「中文」/「English」各断言一次。
- **组件拆分**：`src/app.jsx`（1,465 行）拆为 `app.tsx` + `plugin.tsx` + `components/`（6 个）
  + `lib/`（持久化 / 导出 / 统计）+ `i18n.tsx` + `types.ts`。
- **TypeScript 迁移**：全部源码转为 TS（`strict`），新增 `pnpm run check:types`（`tsc --noEmit`，
  零错误）并接入 CI 与发布流程；测试直接 import `.ts` 源码（Node 24 原生剥离类型，无需构建）。
- **pnpm 迁移**：`packageManager: pnpm@11.28.2`、`pnpm-lock.yaml`、`pnpm-workspace.yaml`
  （`allowBuilds: esbuild`），移除 `package-lock.json` 与 npm 专用 `allowScripts`；
  CI / Release 改用 `pnpm install --frozen-lockfile` 与 `pnpm/action-setup`。
- 双语截图：`assets/*.png`（英文，README.md 引用）与 `assets/*.zh.png`（中文，README.zh-CN.md 引用），
  由 `pnpm run screenshots` 按 `TWB_SHOT_LOCALE` 生成。

### 变更

- 行为不变：解析 / 构图 / 布局 / 分词快照与「与原始实现逐字节一致」校验均通过。
- e2e 断言从 25 项增至 31 项，并改为语言无关（按索引选页签、用 class 选按钮）。

## 0.3.1 — 2026-10-11

### 变更

- **移除设置页入口**：唯一入口为左侧栏面板行（`sidebar.panellist` + `main` 整页），
  不再注册 `settings.section`——避免「自定义插件藏在设置里」的认知负担，入口唯一且常驻可见。
- 移除上传区提示文案「拖拽 .twb 到此处，或点击选择（打开时已自动载入内置示例）」，工具栏更简洁。
- `package.json` 增加 `publishConfig`（官方 registry + public），避免本机镜像源影响发布。
- 发布链路：GitHub Release + **npm 包**（走 CI 暂存 `npm stage publish` + 一次 OTP 批准）；README 双语补 npm 安装方式。

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
