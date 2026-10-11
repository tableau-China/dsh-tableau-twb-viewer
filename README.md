# dsh-tableau-twb-viewer

在 **DeepSeek Harness（DSH）Web** 中导入 Tableau `.twb` 工作簿的检视器插件：

- **打开即用**：打开插件即自动加载内置示例（`sample.twb`），零配置看到效果；
- **仪表板布局图**：按 1:1 真实比例用 SVG 绘制仪表板 zone 布局，支持缩放 / 平移，
  一键导出 **SVG / PNG / .excalidraw**（可拖入 Excalidraw 继续手绘批注）；
- **字段引用关系图**：数据源 → 原始字段 → 计算字段的分层依赖图，点击任意字段
  查看其**上游输入 / 下游依赖**血缘，支持搜索与角色筛选；
- **大图可用**：超过 1200 节点时自动「聚焦」到选中节点的 ±2 跳血缘（可切换 ±1/±2/±3/全部），
  避免一次渲染上万元素；
- **全屏模式**：头部「⛶ 全屏」按钮让检视器铺满整个浏览器窗口（Esc 退出），
  布局图和关系图自动重新适配窗口尺寸；
- **状态持久化**：已解析的工作簿缓存在 sessionStorage（含形状校验），关闭设置 /
  刷新页面后重新打开，文件与当前视图自动恢复，无需重新上传；
- **Metadata**：数据源连接信息、字段（角色 / 类型）、计算字段公式（语法高亮）、
  工作表清单。

解析在**浏览器端**完成（DOMParser），文件不会上传到任何服务器；Node 半部只提供一个
只读的 `/twb-viewer/sample.twb` 路由用于内置示例。

## 数据安全：只读 .twb，不支持 .twbx

| 格式 | 内容 | 本插件 |
|---|---|---|
| `.twb` | **纯元数据** XML：连接信息、字段定义、计算字段公式、仪表板 zone 布局，**不含数据行** | ✅ 支持 |
| `.twbx` | zip 打包，可内嵌数据提取（`.hyper` / `.tde`）、图片等 | ❌ **有意不支持** |

不解析 `.twbx` 是**有意的安全设计**：打包工作簿可能包含完整数据集，把它带进检视流程
会扩大数据暴露面。插件只处理不含数据的 `.twb`。误选 `.twbx` 时会给出明确提示，
请在 Tableau 中「另存为」`.twb` 后再导入。

> 注意：Tableau 官方 `.twb` 是 **XML** 格式，不是 JSON；解析器按 XML 处理。

---

## 安装（给使用者）

仓库：<https://github.com/tableau-China/dsh-tableau-twb-viewer>

### 方式一：直接从 GitHub 安装（推荐）

```bash
# 从 GitHub 主分支安装
dsh plugin --profile web add github:tableau-China/dsh-tableau-twb-viewer
```

### 方式二：从 GitHub Release 安装（版本锁定）

每个版本发布时附带可安装的 tarball（见 [Releases](https://github.com/tableau-China/dsh-tableau-twb-viewer/releases)）：

```bash
dsh plugin --profile web add https://github.com/tableau-China/dsh-tableau-twb-viewer/releases/download/v0.1.0/dsh-tableau-twb-viewer-0.1.0.tgz
```

### 方式三：本地目录（开发调试）

```bash
dsh plugin --profile web add ./dsh-tableau-twb-viewer
```

> 命令会把插件装进 `$DSH_HOME/profiles/web` 并追加到 `dsh.profile.bundles`。
> **重启 `dsh web` 后生效**（客户端插件清单在启动时扫描，插件集变更需重启）。

### 卸载

```bash
dsh plugin --profile web remove dsh-tableau-twb-viewer
```

### 从源码构建

```bash
git clone https://github.com/tableau-China/dsh-tableau-twb-viewer.git
cd dsh-tableau-twb-viewer
npm install
npm run build     # 生成 lib/client.js（仓库已内置构建产物，一般无需重建）
```

## 使用

1. 打开 DSH Web，进入 **设置 → TWb 检视器**——**内置示例会自动加载**，直接看到效果；
2. 换成自己的文件：点击「选择 .twb 文件」或直接拖拽进来（示例会被替换）；
3. 「布局图」查看仪表板 1:1 布局；「引用关系」查看字段依赖图；
4. 大图时选中节点会自动聚焦 ±2 跳血缘，可用工具栏「聚焦」切换 ±1 / ±2 / ±3 / 全部；
5. 点头部「⛶ 全屏」铺满窗口探索大图（Esc 或「✕ 退出全屏」返回）；
6. 布局图可导出 SVG / PNG / Excalidraw；引用关系图点击节点查看上下游血缘。

## 结构

```
dsh-tableau-twb-viewer/
├── package.json          # dsh.bundle（配置层）+ dsh.client（客户端插件声明）
├── cordis.patch.yml      # bundle 的 patch：插入插件行
├── index.js              # Node 半部：注册 /twb-viewer/sample.twb 示例路由（惰性读取）
├── sample.twb            # 内置示例工作簿（1.2MB，纯元数据）
├── src/
│   ├── parser.js         # .twb XML 解析（仪表板 zones / 数据源 / 字段 / 公式）
│   ├── graph.js          # 引用关系构图 + 分层布局 + 上下游可达性（全 Map 索引，近线性）
│   ├── formula.js        # 计算字段公式词法高亮
│   ├── plugin.css        # 插件自有样式（全屏 / 聚焦控件）
│   ├── style.css         # 作用域化样式（.twb-root 前缀，由 gen-css.mjs 生成）
│   └── app.jsx           # 全部 UI 组件 + 插件入口（挂到 settings.section）
├── build.mjs             # esbuild 打包为 lib/client.js（ModuleLoader 工厂格式）
├── lib/client.js         # 构建产物（发布内容）
└── test/
    ├── verify.mjs        # 快照测试（默认）：sample.twb 的解析/构图/布局/分词基线
    ├── fixtures/         # 快照基线（克隆仓库即可运行）
    ├── verify-reference.mjs # 可选差分测试：与原始 tableau_parse 实现逐字节对比
    ├── bench.mjs         # 性能基准：规模曲线 + O(n²) 回归护栏
    ├── lib/synthetic-twb.mjs # 合成工作簿生成器（基准与大图测试共用）
    ├── e2e-boot.sh       # 启动隔离的端到端测试服务器
    └── e2e-ui.mjs        # 无头 Chrome 全流程 UI 测试
```

## 开发

```bash
npm install              # esbuild / xmldom / puppeteer-core（仅开发依赖）
npm run build            # src/ -> lib/client.js
npm run verify           # 快照测试（默认回归入口，克隆即可运行）
npm run verify:update    # 变更确认后重新生成快照基线
npm run verify:reference # 可选：与原始 tableau_parse 实现逐字节差分
npm run bench            # 性能基准（含 O(n²) 回归护栏）
npm run gen-css          # 从原始 CSS 重新生成作用域化样式
```

> npm 11.16+ 默认拦截依赖的构建脚本；本仓库 `package.json` 已用
> `allowScripts` 显式放行 `esbuild`，否则 `npm install` 后 esbuild 二进制缺失。

端到端测试（需本机 Chrome，且 `dsh` 在 PATH）：

```bash
./test/e2e-boot.sh 3199     # 终端 A：启动隔离测试服务器（会打印带 token 的 URL）
TWB_URL="http://127.0.0.1:3199/?token=..." npm run e2e   # 终端 B：无头浏览器全流程验证

# 可选：连大图聚焦一起验证
TWB_LARGE_FIELDS=1500 TWB_URL="..." npm run e2e
```

## 兼容性

| DSH 版本 | 状态 |
|---|---|
| `0.1.0-rc.6` | ✅ 开发基线（首个发布版本） |
| `0.2.1-alpha.2` | ✅ 端到端实测通过（19 项断言，含自动加载示例与大图聚焦） |

## 发布新版本（维护者）

推 tag 即自动构建并生成 GitHub Release（`.github/workflows/release.yml`）：

```bash
git tag v0.2.0          # 版本号与 package.json 同步
git push origin v0.2.0  # Actions 自动: npm ci -> build -> npm pack -> Release(tgz)
```

手动构建 tarball：`npm pack`（产出 `dsh-tableau-twb-viewer-<ver>.tgz`，可直接挂在
任意地方分发）。

包名 `dsh-tableau-twb-viewer` 目前未被占用；如改为 scoped 包
（如 `@yourname/dsh-tableau-twb-viewer`），安装命令相应调整即可。

## 工作原理（DSH 插件机制）

- 本包是一个 **bundle**：`dsh.bundle.patch` 声明 `cordis.patch.yml`，profile 安装后
  自动成为已加载的插件行；
- 同时声明 `dsh.client`（`platform: "web"`）并导出 `./client` 构建产物——DSH 的
  `client-modules` 在启动时扫描已加载插件，把本插件注入浏览器端模块图
  （`/plugins/dsh-tableau-twb-viewer/client.js`）；
- 浏览器端 `apply(ctx)` 通过 `ctx.slots.inject("settings.section", ...)` 在设置页
  注册「TWb 检视器」分区，`inject: ["slots"]` 声明服务依赖；
- Node 半部 `inject: ["webServer"]`，用 `ctx.webServer.register()` 挂示例路由。

## License

Apache-2.0。移植自内部工具 tableau_parse（原代码无明确许可声明；逻辑本身为 Tableau
文件格式的通用解析）。
