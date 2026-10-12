# PROGRESS

> 记录进度、关键决策与「环境坑与绕法」。日期格式 `YYYY-MM-DD`。

## 当前状态（2026-10-11）

- 版本：`0.5.3`（`package.json` ↔ CHANGELOG 已交叉核对）
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
| — | 移除设置入口、精简工具栏、接入 npm 发布（0.3.1） | ✅ 完成（2026-10-11） |
| 批 3 | TypeScript 迁移 + 组件拆分 + pnpm + 中英双语（0.4.0） | ✅ 完成（2026-10-11） |
| 批 4 | 自定义 SQL、表级数据模型（join/基数）、zone 细分 + padding（0.5.0） | ✅ 完成（2026-10-12） |
| 批 4.1 | 解析新版对象模型 object-graph，补回表间关系（0.5.1） | ✅ 完成（2026-10-12） |
| 批 4.2 | 关系弧线化 + 子表对齐父表中心 + 参数从计算字段中分离、数值格式化（0.5.2） | ✅ 完成（2026-10-12） |
| 批 4.3 | 信息架构：SQL 移到数据模型右侧、右栏只留仪表板/工作表、参数单列分类（0.5.3） | ✅ 完成（2026-10-12） |
| — | 移除设置入口、精简工具栏、接入 npm 发布（0.3.1） | ✅ 完成（2026-10-11） |
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
| TS 用 Node 24 原生类型剥离跑测试（直接 import `.ts`） | 避免为测试再引入 tsx/esbuild 构建步骤；`.ts` 显式导入同时被 esbuild 与 tsc 接受（`allowImportingTsExtensions` + `noEmit`）。 |
| i18n 走宿主 `ctx.locale`（`register` + `bind`）而非自建状态 | 语言切换由宿主统一驱动，槽位注册带 `locale: NS` 时组件直接拿到 `t`；组件树内部用 React context 传递，未挂 Provider 时退回内置字典，便于单测。 |
| 布局图右栏只放「仪表板 + 工作表」，元数据各自归位 | 使用者反馈：展开布局图时最需要的是「有哪些仪表板/工作表、我在看哪个」，数据源/字段/公式/参数/自定义 SQL 在看板上更合适的位置呈现（数据模型右侧、引用关系图分类）。因此删除 `MetaPanel`/`FieldsTable`，其独有能力分别迁到数据模型视图（SQL、连接信息）与引用关系图（字段/公式/参数）。 |
| 参数（`param-domain-type`）与计算字段分开统计 | Tableau 把参数当前值写进 `<calculation formula>`（`0.064` 写成 `0.064000000000000001`），照抄就成「超长小数」；参数本就不是计算字段，单独建「参数」页签并按 `default-format` 格式化，同时保留原始值可核对。 |
| 数据模型**优先解析对象模型**（`<object-graph>`），legacy relation 树作为回退 | Tableau 2020.2+ 把表与表间关系写在 `<objects><object>` + `<relationships><relationship>`（端点用 object-id），而 `<connection>` 下的 relation 树只是旧视图、不含关系；只解析后者会让多表数据源在图上散成孤点（用户实测反馈）。两条路径都有夹具覆盖。 |
| 数据模型连接两端按 ON 限定符解析，而非子树叶节点 | 链式 join（t0 ⋈ SQL1 ⋈ join2）里，外层 join 的左操作数是「上一段 join 的结果」，用子树叶节点会把 3 条连接都记成 t0；ON 表达式本身写了 `[表].[字段]`，按它反查最准，查不到再回退到子树。 |
| 数据模型夹具一律合成 | 真实工作簿含服务器名、库表名、SQL 与字段名，属客户资产，不进公开仓库；`test/lib/synthetic-twb.mjs` 支持 joins / customSql / formatPadding 选项生成同构夹具。 |
| **唯一入口**放左侧栏（`sidebar.panellist` + `main` 整页），设置分区已移除 | 设置里藏插件要求用户主动去找；DSH 0.2.x 的生态惯例是左侧栏面板行 + 主区整页（plugin-manager / schedule 同构），入口常驻可见。唯一入口避免「两处入口、状态各一份」的困惑。 |
| 快照测试作为默认回归入口，差分测试降级为可选 | 原始 tableau_parse bundle 不随仓库分发，差分测试在克隆环境必然失败；正确性已一次性证明，日常需要的是「不再漂移」。 |
| 保留 `allowScripts.esbuild` | npm 11.16+ 默认拦截依赖构建脚本，放行后 `npm install` 才能拿到 esbuild 二进制；移除会导致构建失败。迁 pnpm 时改用 `pnpm.onlyBuiltDependencies`。 |

## 环境坑与绕法

### npm 发布（2026-10-12 事故记录）

- **`npm stage publish | tee` 会用 tee 的退出码掩盖 npm 的失败**：v0.5.0 发布时 NPM_TOKEN 已失效
  （`E401 Unable to authenticate, your authentication token seems to be invalid.`），
  但 `release` 工作流仍显示 **success**。修复：暂存步骤加 `set -o pipefail` + stage id 非空校验
  （已用真实失效 token 复现：修复前退出码 0 / 修复后 1）。
- **NPM_TOKEN 会随账号轮换失效**：仓库 secret 里的 token 于 2026-10-11 有效（v0.3.1 暂存成功），
  2026-10-12 已 401。轮换后需更新仓库 Secret，再用
  `gh workflow run release.yml -f tag=vX.Y.Z` 重跑暂存（**无需重新打 tag**）。
- **本机 `.npmrc` 指向 npmmirror 镜像**：发布必须显式 `--registry=https://registry.npmjs.org/`；
  `package.json` 的 `publishConfig` 已固定官方源。

### pnpm 11（本机 11.28.2）

- **设置项已搬离 package.json**：`pnpm` 字段不再读取，`pnpm-workspace.yaml` 才是新家。
- **放行依赖构建脚本的正确键是 `allowBuilds`**（不是 `onlyBuiltDependencies`）：
```yaml
allowBuilds:
  esbuild: true
```
  用错键会一直报 `ERR_PNPM_IGNORED_BUILDS`，且 **`pnpm run <script>` 每次都会因隐式 install 失败而中断**；
  非交互放行：`pnpm approve-builds --all`（会自动写入正确的键）。
- pnpm store 默认在 `~/Library/pnpm/store`，本机沙箱不可写时会自动退化到项目旁的
  `../../.pnpm-store`；无需额外配置。

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
3. **发布**：已发 v0.1.0 / v0.2.0 / v0.3.1（GitHub Release + npm 包）；npm 走 CI 暂存 + 一次 OTP 批准。
4. **下次发版（0.3.2 或后续）随包带上**：0.3.1 的 npm tarball 构建于 `4420a131`，早于之后的文档提交，
   因此包内 README 缺少「从 npm 安装」一节与 npm 徽章——下次发版自动包含，无需单独处理。
