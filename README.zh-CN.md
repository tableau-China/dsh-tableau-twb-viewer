# TWb 检视器 for DSH · Tableau 工作簿检视器

> **面向 Tableau 交付顾问的检视工具。** 在 DeepSeek Harness 里检视工作簿（`.twb`）——**不用装 Tableau Desktop，不用许可证，不碰数据**：1:1 的 SVG 布局图（可直接交给客户在白板上批注）、表级数据模型（表之间怎么连的）、字段级引用关系图，以及每个数据源背后的自定义 SQL。
> 全部**在浏览器端解析**；只读元数据的 DSH 插件，**不碰你的数据**。

[![npm](https://img.shields.io/npm/v/dsh-tableau-twb-viewer?style=flat-square&logo=npm)](https://www.npmjs.com/package/dsh-tableau-twb-viewer)
[![license](https://img.shields.io/github/license/tableau-China/dsh-tableau-twb-viewer?style=flat-square)](./LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/tableau-China/dsh-tableau-twb-viewer/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/tableau-China/dsh-tableau-twb-viewer/actions)
[![node](https://img.shields.io/badge/node-%3E%3D20-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![DSH](https://img.shields.io/badge/DSH-0.1.0--rc.6%20%7C%200.2.x-4E79A7?style=flat-square)](https://github.com/deepseek-ai/deepseek-harness)

中文 · [English](./README.md)

## 解决什么问题

工作簿（workbook）是 Tableau 项目里最难讲清楚的部分。手里有一个 `.twb`——来自客户、同事或自己的归档——你通常需要回答：

- **这个仪表板里到底有什么？** 哪些工作表放在哪、多大面积，哪个是容器、哪个是文本区。
- **这些计算字段怎么串起来的？** 谁引用了谁、改一个公式会牵动什么、一个字段的血缘从哪开始到哪结束。
- **这个工作簿连的是什么？** 服务器、数据库、文件路径、字段角色与数据类型——不用打开 Tableau 就能看清。
- **表之间是怎么连的？** 表级数据模型：哪张表连哪张表、连接条件（ON）、连接类型，以及文件里记录了基数时一并标注。
- **这个数据源背后的 SQL 是什么？** 每段自定义 SQL（`<relation type='text'>`）都被提取成清单，可以逐行和客户核对取数逻辑，不必再打开 Tableau。
- **怎么给客户做交付说明？** 一张可以导出到 Excalidraw 手绘批注的布局图，加一张能在会议里顺着讲的引用关系图 / 数据模型图。

Tableau Desktop 要靠打开工作簿才能看到这些；这个插件在浏览器里即时呈现，不需要许可，也不需要数据。

## 功能

- ✅ **中英双语界面**：面板文案跟随 DSH 界面语言（设置 → 通用 → 语言 切换），工作簿数据原样呈现。
- ✅ **左侧栏一键直达**：插件在 DSH 左侧栏注册自己的面板行，点开即在对话旁以整页呈现——不必去「设置」里翻找。
- ✅ **打开即用**：插件自动加载内置示例工作簿，一秒看到完整界面；换成自己的 `.twb` 即可替换示例。
- ✅ **1:1 仪表板布局图**：每个仪表板 zone（工作表 / 容器 / 文本）按真实比例绘制为 SVG，支持缩放 / 平移，一键导出 **SVG / PNG / Excalidraw**，方便做批注版交付材料。
- ✅ **表级数据模型**：把每个数据源的 relation 树解析成「表 + 连接」——连接类型（内/左/右/全）、ON 条件表达式、文件记录了基数时一并标注；连接以**平衡弧线**绘制（去掉文字标签），子表围绕父表中心对齐，类型与条件在详情面板查看。
- ✅ **参数不再被当成计算字段**：Tableau 参数单独成页签，显示值按工作簿自带的数字格式呈现（`p0.00%` → `6.40%`、`C2052` → `¥50,000`），而不是文件里原样存储的 float64（`0.064000000000000001`）；原始值一并保留便于核对。
- ✅ **自定义 SQL 清单**：每段 `<relation type='text'>` 都被提取、按数据源列出并可一键复制，核对取数口径从「开 Tableau 翻」变成「一屏看完」。
- ✅ **zone 级细节**：细分类型（工作表 / 流式容器 / 基础容器 / 卡片（筛选器、标题等）/ 文本 / 空白）分色并配图例；鼠标悬停即可看到尺寸、内边距、外边距与底色。
- ✅ **字段引用关系图**：分层依赖图——数据源 → 原始字段 → 计算字段。点击任意节点查看**上游输入 / 下游依赖**，支持搜索与角色筛选（维度 / 度量 / 计算字段）。
- ✅ **为大工作簿设计**：节点数超过 1200 时自动聚焦到选中节点的 ±2 跳血缘（可切 ±1/±2/±3/全部），5000 节点的工作簿依然流畅。
- ✅ **全屏模式**：一键铺满浏览器窗口（`Esc` 退出），布局图与关系图自动重新适配。
- ✅ **状态持久化**：解析结果带形状校验地缓存，切换面板或刷新页面后自动恢复文件与当前视图。
- ✅ **工作簿右栏**：布局图右侧只放**仪表板列表**（尺寸 + 工作表数，点击即切换）与**工作表列表**（角标显示被几个仪表板使用）——不再堆页签。
- ✅ **自定义 SQL 就地查看**：数据模型**右侧**常驻自定义 SQL 清单，进入视图即默认选中第一段，SQL 过程一步可见，带复制按钮与所属数据源/连接信息。
- ✅ **参数单独一类**：引用关系图里参数自成分类（专属配色与筛选项），**不计入维度/度量**；选中即显示按工作簿格式格式化后的值与原始值。
- ✅ **只读且私密**：解析**全部在浏览器端**完成，文件不会上传；Node 半部只提供一个内置示例路由。

## 数据安全：只读 `.twb`，`twbx` 被有意拒绝

| 格式 | 包含什么 | 本插件 |
|---|---|---|
| `.twb` | **纯元数据** XML：连接信息、字段定义、计算字段公式、仪表板 zone 布局，**不含数据行** | ✅ 支持 |
| `.twbx` | zip 打包，可内嵌**数据提取**（`.hyper` / `.tde`）、图片等 | ❌ **有意拒绝** |

拒绝 `.twbx` 是刻意的安全设计：打包工作簿可能带着你的完整数据集，把它引入检视流程只会扩大数据暴露面，却没有任何收益。插件只读取不含数据的 `.twb` 元数据；如果你选了 `.twbx`，会明确提示你去 Tableau 里**「另存为」`.twb`** 后再导入。

## 界面截图

**入口位置** —— 左侧栏面板行，点开后主区整页呈现检视器

![sidebar entry](https://raw.githubusercontent.com/tableau-China/dsh-tableau-twb-viewer/main/assets/panel.zh.png)

**仪表板布局图** —— 1:1 SVG 渲染全部 zone，可导出 SVG / PNG / Excalidraw

![dashboard layout](https://raw.githubusercontent.com/tableau-China/dsh-tableau-twb-viewer/main/assets/layout.zh.png)

**字段引用关系** —— 数据源 → 原始字段 → 计算字段，点击节点看上下游

![field lineage](https://raw.githubusercontent.com/tableau-China/dsh-tableau-twb-viewer/main/assets/lineage.zh.png)

**数据模型** —— 表、连接类型、ON 条件与基数（图为合成工作簿；客户文件不出本机）

![data model](https://raw.githubusercontent.com/tableau-China/dsh-tableau-twb-viewer/main/assets/datamodel.zh.png)

**参数** —— 显示值按工作簿格式呈现，原始值保留可核对

![parameters](https://raw.githubusercontent.com/tableau-China/dsh-tableau-twb-viewer/main/assets/parameters.zh.png)

**自定义 SQL** —— 全部自定义查询一屏列全，便于核对取数口径

![custom SQL](https://raw.githubusercontent.com/tableau-China/dsh-tableau-twb-viewer/main/assets/customsql.zh.png)

**工作簿右栏** —— 只有仪表板与工作表：点仪表板即切换，点工作表跳到它所在的仪表板

![workbook panel](https://raw.githubusercontent.com/tableau-China/dsh-tableau-twb-viewer/main/assets/workbook.zh.png)

## 安装

前置：可用的 DSH Web（`dsh web`）。安装会把插件写入 `$DSH_HOME/profiles/web`，之后重启 `dsh web` 生效。

### 方式一：直接从 GitHub 安装（推荐）

```bash
dsh plugin --profile web add github:tableau-China/dsh-tableau-twb-viewer
```

### 方式二：从 GitHub Release 安装（版本锁定）

每个版本发布都附带可安装的 tarball——见 [Releases](https://github.com/tableau-China/dsh-tableau-twb-viewer/releases)：

```bash
dsh plugin --profile web add https://github.com/tableau-China/dsh-tableau-twb-viewer/releases/download/v0.2.0/dsh-tableau-twb-viewer-0.2.0.tgz
```

### 方式三：从 npm 安装

```bash
dsh plugin --profile web add dsh-tableau-twb-viewer
```

### 方式四：本地目录（开发调试）

```bash
git clone https://github.com/tableau-China/dsh-tableau-twb-viewer.git
dsh plugin --profile web add ./dsh-tableau-twb-viewer
```

> **安装后需重启 `dsh web`**（客户端插件清单在启动时扫描）。
> 卸载：`dsh plugin --profile web remove dsh-tableau-twb-viewer`。

## 使用

1. 打开 DSH Web，点左侧栏的 **TWb 检视器**，内置示例会自动加载。
2. 换成自己的文件：点击 **选择 .twb 文件**，或把 `.twb` 拖到上传区。
3. **「布局图」**：1:1 仪表板渲染，带 zone 类型图例（工作表 / 容器 / 卡片 / 文本 / 空白）；缩放、平移、适配窗口，悬停 zone 看尺寸与内边距，导出 SVG / PNG / Excalidraw。
4. **「引用关系」**：点击节点查看上下游血缘；搜索与筛选字段；用「聚焦」控件切换 ±1/±2/±3/全部。
5. **「数据模型」**：表 / 自定义 SQL 节点 + 连接关系（连接类型、ON 条件、基数）；点表看所属数据源与物理表名，点连接看详细条件。
6. 大工作簿点 **「⛶ 全屏」**；`Esc` 或 **「✕ 退出全屏」**返回。
7. 右侧 metadata 面板覆盖数据源、字段、计算字段、工作表与**自定义 SQL 清单**。

## 常见问题

| 现象 | 处理 |
|---|---|
| 左侧栏没有「TWb 检视器」 | 先重启 `dsh web`，再对浏览器标签页硬刷新（`Cmd+Shift+R` / `Ctrl+F5`）——标签页可能还跑着安装前的旧 bundle。 |
| 提示「这不是一个有效的 Tableau 工作簿」 | 文件必须是 `.twb`（XML）。只有 `.twbx` 的话，请在 Tableau 中**另存为 `.twb`**。 |
| `.twbx` 被拒绝 | 符合预期，见 [数据安全](#数据安全只读-twb-twbx-被有意拒绝)。 |
| 超大工作簿卡顿 | 关系图在 1200 节点以上会自动聚焦；再用「聚焦 ±1」进一步收窄。 |

## 开发

```bash
pnpm install             # esbuild / xmldom / puppeteer-core / typescript（仅开发依赖）
pnpm run check:types     # tsc --noEmit（strict；src 为 TypeScript）
pnpm run build           # src/plugin.tsx -> lib/client.js（DSH ModuleLoader 包）
pnpm run verify          # 快照测试：解析 / 构图 / 布局 / 分词基线
pnpm run verify:update   # 确认变更后重新生成基线
pnpm run verify:reference # 可选：与原始实现逐字节差分
pnpm run bench           # 性能曲线 + O(n²) 回归护栏
pnpm run gen-css          # 从原始 CSS 重新生成作用域化样式
pnpm run screenshots      # 重新生成 assets/*.png（TWB_SHOT_LOCALE=zh 出中文截图）
```

真实浏览器端到端测试（需本机 Chrome，且 `dsh` 在 PATH）：

```bash
./test/e2e-boot.sh 3199     # 终端 A：启动隔离实例，打印带 token 的 URL
TWB_URL="http://127.0.0.1:3199/?token=..." pnpm run e2e   # 终端 B：无头 Chrome，65 项断言

# 连大图聚焦一起验证
TWB_LARGE_FIELDS=1500 TWB_URL="..." pnpm run e2e
```

> 包管理为 **pnpm**（`packageManager` 字段；`pnpm-workspace.yaml` 的 `allowBuilds` 放行 esbuild
> 构建脚本，否则 `pnpm install` 会以 `ERR_PNPM_IGNORED_BUILDS` 失败）。
> 测试直接 import TypeScript 源码——Node 24 原生剥离类型，测试无需额外构建。

## 目录结构

```
dsh-tableau-twb-viewer/
├── package.json           # dsh.bundle（配置层）+ dsh.client（Web 插件声明）
├── cordis.patch.yml       # bundle patch：插入插件行
├── index.js               # Node 半部：内置示例路由（惰性读取、可降级）
├── src/
│   ├── types.ts           # 共享类型：模型 / 图 / 布局
│   ├── parser.ts          # .twb XML 解析（仪表板 zones / 数据源 / 字段 / 公式）
│   ├── graph.ts           # 引用关系构图 + 分层布局 + 上下游可达性
│   ├── formula.ts         # 计算公式分词与高亮
│   ├── i18n.tsx           # 中英文案字典 + 取词上下文
│   ├── app.tsx            # 应用根（状态、自动加载、视图切换）
│   ├── plugin.tsx         # 插件入口：左侧栏面板行 + 主区整页 + 文案注册
│   ├── lib/               # 持久化缓存 / 导出工具 / 模型统计
│   ├── components/        # 上传、布局图、Metadata、字段表、公式、引用关系图
│   ├── plugin.css         # 插件自有样式（全屏、面板尺寸）
│   └── style.css          # 作用域化应用样式（.twb-root 前缀，由 gen-css.mjs 生成）
├── build.mjs              # esbuild -> lib/client.js（ModuleLoader 工厂格式）
├── lib/client.js          # 构建产物（发布内容）
└── test/                  # 快照测试、性能基准、无头 Chrome e2e
```

## 兼容性

| DSH 版本 | 状态 |
|---|---|
| `0.1.0-rc.6` | ✅ 开发基线（首个发布版本） |
| `0.2.1-alpha.2` | ✅ 端到端实测通过（65 项断言，含中英切换、数据模型、自定义 SQL、自动加载示例与大图聚焦） |

安装机制：`dsh.bundle.patch` 让本包成为已加载的插件行；`dsh.client` + 导出的 `./client`
构建产物由 `client-modules` 注入浏览器模块图。UI 注册到 `settings.section` 槽位，
Node 半部使用 `webServer` 服务提供示例路由。

## 作者

吴玉朋（[Yupeng Wu / @tableau-China](https://github.com/tableau-China)）—— Tableau 与数据可视化从业者。

## 许可

[Apache-2.0](./LICENSE)。
