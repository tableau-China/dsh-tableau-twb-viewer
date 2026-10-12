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
  /** 细分类别（用于布局图配色与图例）。 */
  shape: ZoneShape;
  /** zone 的格式属性（padding / margin / 底色 / 边框，读自 <format>）。 */
  format: ZoneFormat;
  children: Zone[];
}

export type ZoneKind = "worksheet" | "container" | "text";

/** zone 细分类型：容器子类型、卡片（筛选器/标题/图例等）、图像、空对象。 */
export type ZoneShape =
  | "worksheet"
  | "text"
  | "empty"
  | "image"
  | "flow"
  | "vertical"
  | "horizontal"
  | "basic"
  | "card"
  | "other";

/** zone 格式属性（`<format attr='...' value='...'/>` 子集）。 */
export interface ZoneFormat {
  padding: number | null;
  margin: number | null;
  background: string | null;
  borderColor: string | null;
  borderWidth: number | null;
  borderStyle: string | null;
}

/** 数据源连接信息（Tableau `<connection>` 属性子集）。 */
export interface WorkbookConnection {
  class: string | null;
  type: string | null;
  server: string | null;
  dbname: string | null;
  filename: string | null;
}

/** 参数（Tableau Parameter）：不是字段，但会参与计算字段的引用。 */
export interface WorkbookParameter {
  /** 当前值（原始字符串，可能带 float64 往返噪声）。 */
  value: string | null;
  /** 工作簿自带的显示格式，如 p0.00% / C2052 / N。 */
  defaultFormat: string | null;
  /** 取值域类型：range / list / any。 */
  domainType: string | null;
  /** range 型参数的区间。 */
  range: { min: string | null; max: string | null; granularity: string | null } | null;
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
  /** 参数标记：该列其实是 Tableau 参数（不参与「计算字段」统计）。 */
  isParameter: boolean;
  /** 参数详情（isParameter 时有值）。 */
  parameter?: WorkbookParameter | null;
  /** 原始公式（用于引用解析）。 */
  formulaRaw: string | null;
}

export interface WorkbookDatasource {
  caption: string;
  name: string | null;
  connection: WorkbookConnection | null;
  columns: WorkbookColumn[];
  groups: string[];
  /** 数据模型：表 / 自定义 SQL 节点 + 连接关系。 */
  dataModel: DatasourceDataModel;
}

/** 数据模型里的一个节点：物理表或自定义 SQL。 */
export interface DataTableRef {
  /** 展示名（relation 的 name 属性，自定义 SQL 时通常是「自定义 SQL 查询」）。 */
  name: string;
  /** 物理表名（relation 的 table 属性，形如 [Sheet1$]）；自定义 SQL 时为 null。 */
  table: string | null;
  /** 节点类型。 */
  kind: "table" | "custom-sql";
  /** 自定义 SQL 文本（kind === "custom-sql"）。 */
  sql: string | null;
  /** 新版对象模型（object-graph）里的对象 id；relationship 的端点用它引用表。 */
  objectId?: string | null;
}

/** 一次表连接（join）及其条件。 */
export interface DataJoinEdge {
  left: DataTableRef;
  right: DataTableRef;
  /** Tableau relation 的 join 属性：inner / left / right / full 等。 */
  joinType: string;
  /** ON 条件左侧表达式（形如 [表].[字段]）。 */
  leftExpr: string | null;
  /** ON 条件右侧表达式。 */
  rightExpr: string | null;
  /** 基数（Tableau 写入时才有，如 many-to-one）。 */
  cardinality: string | null;
}

/** 数据源的数据模型（表级）。 */
export interface DatasourceDataModel {
  /** 去重后的节点（表 / 自定义 SQL）。 */
  tables: DataTableRef[];
  /** 表间连接。 */
  joins: DataJoinEdge[];
  /** 自定义 SQL 清单（便于口径核对）。 */
  customSql: Array<{ name: string; sql: string }>;
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
  /** 该节点是 Tableau 参数（既不是维度也不是度量）。 */
  isParameter?: boolean;
  /** 参数详情（isParameter 时有值）。 */
  parameter?: WorkbookParameter | null;
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
export type NodeCategory = "datasource" | "dimension" | "measure" | "calc" | "parameter" | "unknown";

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
