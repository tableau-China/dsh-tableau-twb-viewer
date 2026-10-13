// 界面文案字典（中 / 英）与取词工具。
//
// 宿主提供 locale 服务：插件在 apply() 里 ctx.locale.register(NS, { zh, en })，
// 槽位注册带 locale: NS 时组件会收到 `t`；组件树内部通过 I18nProvider 传递，
// 未挂 Provider 时（单测 / 独立渲染）退回内置字典。

import { createContext, useContext } from "react";

/** locale 命名空间。 */
export const NS = "twb-viewer";

/** 取词函数签名（与宿主 ctx.locale.bind(ns) 一致）。 */
export type Translator = (key: string, params?: Record<string, string | number>) => string;

/** 字典类型：键 → 文案模板（{name} 为占位符）。 */
export type Dict = Record<string, string>;

export const zh: Dict = {
  // 插件入口与标题
  panel: "TWb 检视器",
  appTitle: "Tableau .twb 仪表板布局检视器",
  appSubtitle: "1:1 SVG 布局图 · 一键导出 Excalidraw · 数据源/字段/计算字段 metadata · 字段引用关系",
  tabLayout: "布局图",
  tabLineage: "引用关系",
  fullscreen: "⛶ 全屏",
  fullscreenTooltip: "全屏模式，铺满窗口查看关系图",
  exitFullscreen: "✕ 退出全屏",
  exitFullscreenEsc: "退出全屏 (Esc)",

  // 欢迎页
  welcomeTitle: "上传一个 Tableau 工作簿（.twb）文件，即可：",
  welcomeMeta: "数据源、字段、计算字段公式",
  help1a: "按 ",
  help1b: " 用 SVG 绘制仪表板布局，支持缩放 / 平移；",
  help2a: "一键导出 ",
  help2b: "，方便在 Excalidraw 里手绘批注；",
  help3a: "查看 ",
  help3b: " 等 metadata，便于对客户讲解口径。",
  helpAuto: "打开时会自动载入内置示例；上传自己的 .twb 会替换示例。",
  helpSecurity: "出于数据安全考虑，不解析 .twbx（打包工作簿可能内嵌数据提取）。",
  statDashboards: "仪表板",
  statWorksheets: "工作表",
  statDatasources: "数据源",
  statFields: "字段",
  statCalcs: "计算字段",

  // 上传
  chooseFile: "请选择 .twb 文件",
  chooseFileBtn: "选择 .twb 文件",
  loadSample: "载入示例",
  loading: "加载中…",
  sampleLoading: "正在加载内置示例…",
  sampleFileName: "sample.twb（内置示例）",
  fileReadFailed: "文件读取失败",
  parseFailed: "解析失败",
  sampleAutoLoadFailed: "自动加载内置示例失败：",
  orChooseManually: "，可手动选择 .twb 文件",
  sampleLoadFailed: "载入示例失败：",
  twbxRejected: "出于数据安全考虑，本插件不解析 .twbx（打包工作簿可能内嵌数据提取）。请在 Tableau 中「另存为」.twb 后再导入。",

  // 布局视图
  zoomIn: "放大 +",
  zoomOut: "缩小 −",
  fit: "适配",
  exportSvg: "导出 SVG",
  exportPng: "导出 PNG",
  exportExcalidraw: "导出 Excalidraw",

  // 字段表
  colCalc: "计算字段",
  roleDimension: "维度",
  roleMeasure: "度量",

  // Metadata 面板

  // 视图页签与数据模型
  tabDataModel: "数据模型",
  dmTables: "{count} 张表",
  dmJoins: "{count} 个连接",
  dmCustomSql: "{count} 段自定义 SQL",
  dmSelectHint: "点击表或连接线查看详情",
  dmSqlList: "自定义 SQL",
  dmConnection: "连接",
  dmEmpty: "该工作簿没有可展示的数据模型。",
  dmDatasource: "数据源",
  dmPhysical: "物理表",
  dmSqlText: "自定义 SQL",
  dmSqlBadge: "自定义 SQL",
  dmTableBadge: "表",
  dmFrom: "左表",
  dmTo: "右表",
  dmOn: "连接条件",
  dmCardinality: "基数",
  dmNotStored: "文件中未记录（Tableau 运行时推断）",
  joinInner: "内连接",
  joinLeft: "左连接",
  joinRight: "右连接",
  joinFull: "全连接",
  joinRelationship: "关系",
  sqlCopy: "复制",
  paramValue: "当前值",
  paramDomain: "取值域",
  paramRange: "范围",
  paramFormat: "格式",
  paramRaw: "原始值",
  paramStep: "步长",
  paramRawHint: "工作簿里以 float64 原样写入的值（如 0.064 写作 0.064000000000000001）",
  sqlCopied: "已复制",
  wbDashboards: "仪表板",
  wbWorksheets: "工作表",
  wbSheetsInDash: "{count} 个工作表",
  wbHighlightHint: "在左侧布局图上高亮该工作表（再点一次取消）",
  wbNoSheetsInDash: "该仪表板没有工作表。",
  wbUnusedNote: "另有 {count} 个工作表未放在任何仪表板。",
  wbNoDashboards: "该工作簿没有仪表板。",
  legendParameter: "参数",
  zoneLegendTitle: "图例",
  zoneWorksheet: "工作表",
  zoneContainer: "容器 / 布局",
  zoneFlow: "流式容器",
  zoneBasic: "基础容器",
  zoneCard: "卡片（筛选器 / 标题等）",
  zoneText: "文本",
  zoneEmpty: "空白",
  zonePadding: "内边距 {value}",
  zoneMargin: "外边距 {value}",
  zoneColor: "底色",
  noDashboard: "请选择或上传一个包含仪表板的 .twb 文件",


  // 引用关系视图
  pickerHead: "字段选择器",
  searchLineage: "搜索字段并高亮…",
  noMatchPeriod: "无匹配字段。",
  arrowNote: "箭头方向：上游（左）→ 下游（右）",
  focus: "聚焦",
  focusAuto: "自动",
  focusAll: "全部",
  focusTooltip: "大图聚焦：只渲染选中节点 ±N 跳的血缘",
  nodesCount: "{shown} / {total} 节点",
  fitWindow: "适配窗口",
  clearHighlight: "清除高亮",
  subCols: "（{count} 列）",
  detailEmpty: "选择一个字段 / 数据源，查看其上下游引用关系。",
  internalName: "内部名：{name}",
  calcFormula: "计算字段公式",
  upstreamLabel: "上游（输入）",
  downstreamLabel: "下游（依赖）",
  upstreamTitle: "上游输入",
  downstreamTitle: "下游依赖",
  kindField: "字段",
  legendDatasource: "数据源",
  legendDimension: "维度",
  legendMeasure: "度量",
  legendCalc: "计算字段",
  legendUnknown: "未解析",
  laneDatasource: "数据源",
  laneRawFields: "原始字段（维度↑ / 度量↓）",
  laneCalcLayer: "计算字段 · 层级 {level}"
};

export const en: Dict = {
  // Panel entry and titles
  panel: "TWb Viewer",
  appTitle: "Tableau .twb Dashboard Inspector",
  appSubtitle:
    "1:1 SVG layout · one-click Excalidraw export · datasource / field / calculation metadata · field lineage",
  tabLayout: "Layout",
  tabLineage: "Lineage",
  fullscreen: "⛶ Full screen",
  fullscreenTooltip: "Full screen — use the whole window for the graph",
  exitFullscreen: "✕ Exit full screen",
  exitFullscreenEsc: "Exit full screen (Esc)",

  // Welcome
  welcomeTitle: "Upload a Tableau workbook (.twb) file to:",
  welcomeMeta: "datasource, field and calculation metadata",
  help1a: "Draw the dashboard layout ",
  help1b: " in SVG at 1:1 real scale, with zoom and pan;",
  help2a: "Export ",
  help2b: " in one click and annotate it by hand in Excalidraw;",
  help3a: "Read ",
  help3b: " metadata to explain definitions to clients.",
  helpAuto: "A built-in sample loads automatically; upload your own .twb to replace it.",
  helpSecurity: "For data safety, .twbx files are not parsed (packaged workbooks may embed data extracts).",
  statDashboards: "dashboards",
  statWorksheets: "worksheets",
  statDatasources: "datasources",
  statFields: "fields",
  statCalcs: "calculations",

  // Upload
  chooseFile: "Choose a .twb file",
  chooseFileBtn: "Choose .twb file",
  loadSample: "Load sample",
  loading: "Loading…",
  sampleLoading: "Loading the built-in sample…",
  sampleFileName: "sample.twb (built-in sample)",
  fileReadFailed: "Failed to read the file",
  parseFailed: "Failed to parse the workbook",
  sampleAutoLoadFailed: "Failed to auto-load the built-in sample: ",
  orChooseManually: ". You can pick a .twb file manually.",
  sampleLoadFailed: "Failed to load the sample: ",
  twbxRejected:
    "For data safety this plugin does not parse .twbx (packaged workbooks may embed data extracts). In Tableau use “Save As” → .twb, then import that file.",

  // Layout view
  zoomIn: "Zoom in +",
  zoomOut: "Zoom out −",
  fit: "Fit",
  exportSvg: "Export SVG",
  exportPng: "Export PNG",
  exportExcalidraw: "Export Excalidraw",

  // Fields table
  colCalc: "Calculation",
  roleDimension: "Dimension",
  roleMeasure: "Measure",

  // Metadata panel

  // View tabs and data model
  tabDataModel: "Data model",
  dmTables: "{count} tables",
  dmJoins: "{count} joins",
  dmCustomSql: "{count} custom SQL",
  dmSelectHint: "Click a table or join for details",
  dmSqlList: "Custom SQL",
  dmConnection: "Connection",
  dmEmpty: "No data model to show in this workbook.",
  dmDatasource: "Datasource",
  dmPhysical: "Physical table",
  dmSqlText: "Custom SQL",
  dmSqlBadge: "Custom SQL",
  dmTableBadge: "Table",
  dmFrom: "Left table",
  dmTo: "Right table",
  dmOn: "Join condition",
  dmCardinality: "Cardinality",
  dmNotStored: "Not stored in the file (inferred by Tableau at runtime)",
  joinInner: "Inner join",
  joinLeft: "Left join",
  joinRight: "Right join",
  joinFull: "Full join",
  joinRelationship: "Relationship",
  sqlCopy: "Copy",
  paramValue: "Current value",
  paramDomain: "Domain",
  paramRange: "Range",
  paramFormat: "Format",
  paramRaw: "Raw",
  paramStep: "Step",
  paramRawHint: "Value stored verbatim as float64 in the workbook (0.064 is written as 0.064000000000000001)",
  sqlCopied: "Copied",
  wbDashboards: "Dashboards",
  wbWorksheets: "Worksheets",
  wbSheetsInDash: "{count} worksheets",
  wbHighlightHint: "Highlight this worksheet in the layout (click again to clear)",
  wbNoSheetsInDash: "No worksheets on this dashboard.",
  wbUnusedNote: "{count} worksheets are not placed on any dashboard.",
  wbNoDashboards: "No dashboards in this workbook.",
  legendParameter: "Parameter",
  zoneLegendTitle: "Legend",
  zoneWorksheet: "Worksheet",
  zoneContainer: "Container / layout",
  zoneFlow: "Flow container",
  zoneBasic: "Basic container",
  zoneCard: "Card (filter, title…)",
  zoneText: "Text",
  zoneEmpty: "Empty",
  zonePadding: "Padding {value}",
  zoneMargin: "Margin {value}",
  zoneColor: "Fill",
  noDashboard: "Choose or upload a .twb file that contains a dashboard",


  // Lineage view
  pickerHead: "Field picker",
  searchLineage: "Search and highlight fields…",
  noMatchPeriod: "No matching fields.",
  arrowNote: "Arrows point upstream (left) → downstream (right)",
  focus: "Focus",
  focusAuto: "Auto",
  focusAll: "All",
  focusTooltip: "Large graphs: render only the selected node's lineage within N hops",
  nodesCount: "{shown} / {total} nodes",
  fitWindow: "Fit window",
  clearHighlight: "Clear highlight",
  subCols: " ({count} cols)",
  detailEmpty: "Select a field or datasource to see its upstream and downstream references.",
  internalName: "Internal name: {name}",
  calcFormula: "Calculation formula",
  upstreamLabel: "Upstream (inputs)",
  downstreamLabel: "Downstream (dependents)",
  upstreamTitle: "Upstream inputs",
  downstreamTitle: "Downstream dependents",
  kindField: "Field",
  legendDatasource: "Datasource",
  legendDimension: "Dimension",
  legendMeasure: "Measure",
  legendCalc: "Calculation",
  legendUnknown: "Unresolved",
  laneDatasource: "Datasource",
  laneRawFields: "Raw fields (dimensions ↑ / measures ↓)",
  laneCalcLayer: "Calculations · layer {level}"
};

export const dicts: Record<string, Dict> = { zh, en };

/** 渲染模板：{name} 占位符替换（缺失参数原样保留）。 */
function render(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  );
}

/** 内置取词器：宿主 locale 服务不可用时的兜底（默认中文）。 */
export function makeT(locale: keyof typeof dicts = "zh"): Translator {
  const dict = dicts[locale] ?? zh;
  return (key, params) => render(dict[key] ?? zh[key] ?? key, params);
}

const I18nContext = createContext<Translator | null>(null);

/** 文案上下文 Provider（在面板根组件注入宿主的 t）。 */
export const I18nProvider = I18nContext.Provider;

/** 组件内取词；无 Provider 时退回中文内置字典。 */
export function useT(): Translator {
  return useContext(I18nContext) ?? makeT("zh");
}
