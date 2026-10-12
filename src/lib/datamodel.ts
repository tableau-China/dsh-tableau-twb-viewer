// 数据模型（表级）视图的布局计算：分层 + 列内排布。
//
// 输入是「表 / 自定义 SQL 节点 + join 边」，输出每个节点的坐标与画布尺寸。
// 表数量级很小（几张到几十张），用 BFS 分层即可，不引入图布局依赖。

import type { WorkbookModel } from "../types.ts";

/** 数据模型视图里的节点（表或自定义 SQL）。 */
export interface DataModelNode {
  /** 唯一 id：数据源序号 + 节点名 + 物理表名。 */
  id: string;
  /** 展示名。 */
  label: string;
  /** 副标题：物理表名 / 数据源名。 */
  sublabel: string | null;
  kind: "table" | "custom-sql";
  /** 所属数据源展示名。 */
  datasource: string;
  /** 自定义 SQL 文本。 */
  sql: string | null;
}

/** 数据模型视图里的连接边。 */
export interface DataModelEdge {
  id: string;
  from: string;
  to: string;
  /** inner / left / right / full。 */
  joinType: string;
  leftExpr: string | null;
  rightExpr: string | null;
  cardinality: string | null;
  datasource: string;
}

export interface DataModelGraph {
  nodes: DataModelNode[];
  edges: DataModelEdge[];
}

export interface DataModelLayout {
  pos: Record<string, { x: number; y: number }>;
  /** 分层数（用于提示）。 */
  layers: number;
  width: number;
  height: number;
}

/** 节点尺寸（与 CSS 中的表格节点保持一致）。 */
export const DM_NODE_W = 168;
export const DM_NODE_H = 56;
const DM_COL_GAP = 120;
const DM_ROW_GAP = 22;
const DM_PAD = 24;

/** 把工作簿所有数据源的数据模型合并为一张图（跨数据源的表用数据源名区分）。 */
export function buildDataModelGraph(model: WorkbookModel): DataModelGraph {
  const nodes: DataModelNode[] = [];
  const edges: DataModelEdge[] = [];
  const seen = new Set<string>();

  model.datasources.forEach((ds, dsIdx) => {
    const dm = ds.dataModel;
    if (!dm || dm.tables.length === 0) return;
    const dsName = ds.caption || `#${dsIdx + 1}`;
    const idOf = (name: string, table: string | null, kind: string): string =>
      `ds${dsIdx}:${kind}:${name}:${table ?? ""}`;

    for (const t of dm.tables) {
      const id = idOf(t.name, t.table, t.kind);
      if (seen.has(id)) continue;
      seen.add(id);
      nodes.push({
        id,
        label: t.name,
        sublabel: t.table || null,
        kind: t.kind,
        datasource: dsName,
        sql: t.sql
      });
    }

    dm.joins.forEach((j, i) => {
      const from = idOf(j.left.name, j.left.table, j.left.kind);
      const to = idOf(j.right.name, j.right.table, j.right.kind);
      if (!seen.has(from) || !seen.has(to)) return;
      edges.push({
        id: `ds${dsIdx}:join${i}`,
        from,
        to,
        joinType: j.joinType,
        leftExpr: j.leftExpr,
        rightExpr: j.rightExpr,
        cardinality: j.cardinality,
        datasource: dsName
      });
    });
  });

  return { nodes, edges };
}

/** 分层布局：无入边的节点在第 0 层，其余取父节点层号 +1。 */
export function layoutDataModel(graph: DataModelGraph): DataModelLayout {
  const { nodes, edges } = graph;
  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const n of nodes) {
    incoming.set(n.id, []);
    outgoing.set(n.id, []);
  }
  for (const e of edges) {
    incoming.get(e.to)?.push(e.from);
    outgoing.get(e.from)?.push(e.to);
  }

  const layer = new Map<string, number>();
  const queue: string[] = [];
  for (const n of nodes) {
    if ((incoming.get(n.id) || []).length === 0) {
      layer.set(n.id, 0);
      queue.push(n.id);
    }
  }
  // 全是环（或有入无根）时兜底：把剩余节点按顺序放到第 0 层
  for (const n of nodes) if (!layer.has(n.id)) layer.set(n.id, 0);

  // 松弛求最长路径层号（节点数很少，迭代上限即节点数）
  for (let iter = 0; iter < nodes.length; iter++) {
    let changed = false;
    for (const e of edges) {
      const fromLayer = layer.get(e.from) ?? 0;
      const toLayer = layer.get(e.to) ?? 0;
      if (toLayer < fromLayer + 1) {
        layer.set(e.to, fromLayer + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const byLayer = new Map<number, DataModelNode[]>();
  for (const n of nodes) {
    const l = layer.get(n.id) ?? 0;
    if (!byLayer.has(l)) byLayer.set(l, []);
    (byLayer.get(l) as DataModelNode[]).push(n);
  }

  const layers = [...byLayer.keys()].sort((a, b) => a - b);
  const maxRows = Math.max(1, ...layers.map((l) => (byLayer.get(l) as DataModelNode[]).length));
  const pos: Record<string, { x: number; y: number }> = {};

  layers.forEach((l, colIdx) => {
    const arr = byLayer.get(l) as DataModelNode[];
    const totalH = arr.length * DM_NODE_H + (arr.length - 1) * DM_ROW_GAP;
    const offsetY = DM_PAD + (maxRows * DM_NODE_H + (maxRows - 1) * DM_ROW_GAP - totalH) / 2;
    arr.forEach((n, row) => {
      pos[n.id] = {
        x: DM_PAD + colIdx * (DM_NODE_W + DM_COL_GAP),
        y: offsetY + row * (DM_NODE_H + DM_ROW_GAP)
      };
    });
  });

  const width = DM_PAD * 2 + layers.length * DM_NODE_W + Math.max(0, layers.length - 1) * DM_COL_GAP;
  const height = DM_PAD * 2 + maxRows * DM_NODE_H + Math.max(0, maxRows - 1) * DM_ROW_GAP;
  return { pos, layers: layers.length, width: Math.max(width, 320), height: Math.max(height, 160) };
}
