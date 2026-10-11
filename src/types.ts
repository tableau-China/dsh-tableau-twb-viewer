// 共享类型：工作簿模型、字段引用图、分层布局、公式分词
// （批 3 TS 迁移引入；字段命名与 src/parser.ts、src/graph.ts 的输出保持一致）

// ---- 工作簿模型（.twb 解析结果）----

/** 仪表板 zone（1:1 布局树节点；坐标为像素）。 */
export interface Zone {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Tableau 的 type-v2 原值（worksheet / text / ...，容器可能为空串）。 */
  type: string;
  /** zone 名称（工作表 zone 时为工作表名）。 */
  name: string;
  /** 文本 zone 的文本内容。 */
  text: string;
  kind: ZoneKind;
  children: Zone[];
}

export type ZoneKind = "worksheet" | "container" | "text";

/** 数据源连接信息（Tableau `<connection>` 属性子集）。 */
export interface WorkbookConnection {
  class: string | null;
  type: string | null;
  server: string | null;
  dbname: string | null;
  filename: string | null;
}

/** 字段（列 / 计算字段）。 */
export interface WorkbookColumn {
  /** 内部名（含方括号）。 */
  name: string;
  caption: string | null;
  /** 展示名：caption 优先。 */
  label: string;
  datatype: string | null;
  role: string | null;
  type: string | null;
  /** 展示用公式（字段名已替换为 caption）。 */
  formula: string | null;
  /** 原始公式（用于引用解析）。 */
  formulaRaw: string | null;
}

export interface WorkbookDatasource {
  caption: string;
  name: string | null;
  connection: WorkbookConnection | null;
  columns: WorkbookColumn[];
  groups: string[];
}

export interface WorkbookDashboard {
  name: string;
  width: number;
  height: number;
  zones: Zone[];
}

/** 一个工作簿的完整解析结果。 */
export interface WorkbookModel {
  dashboards: WorkbookDashboard[];
  worksheets: string[];
  datasources: WorkbookDatasource[];
}

/** 工作簿概要统计。 */
export interface WorkbookStats {
  dashboards: number;
  worksheets: number;
  datasources: number;
  fields: number;
  calculations: number;
}

// ---- 字段引用图 ----

export type NodeKind = "datasource" | "field" | "unknown";

/** 图节点：数据源 / 字段 / 未解析引用。 */
export interface GraphNode {
  id: string;
  kind: NodeKind;
  label: string;
  name?: string | null;
  caption?: string | null;
  role?: string | null;
  isCalc?: boolean;
  dsIdx?: number;
  formula?: string | null;
  formulaRaw?: string | null;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface FieldGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  dsNodes: string[];
}

/** 节点类别（决定配色与图例）。 */
export type NodeCategory = "datasource" | "dimension" | "measure" | "calc" | "unknown";

/** 节点类别对应的图形样式（图例同源）。 */
export interface KindStyle {
  fill: string;
  stroke: string;
  tag: string;
}

// ---- 分层布局 ----

export interface Lane {
  layer: number;
  x: number;
  right: number;
  width: number;
  count: number;
  subCols: number;
  label: string;
}

export interface LayoutPosition {
  x: number;
  y: number;
}

export interface LayeredLayout {
  pos: Record<string, LayoutPosition>;
  lanes: Lane[];
  width: number;
  height: number;
}

/** 一个节点的血缘：自身 / 上游输入 / 下游依赖。 */
export interface Lineage {
  self: Set<string>;
  upstream: Set<string>;
  downstream: Set<string>;
}

// ---- 公式分词 ----

export type TokenType = "comment" | "string" | "field" | "number" | "ident" | "ws" | "other";

export interface Token {
  type: TokenType;
  value: string;
}
