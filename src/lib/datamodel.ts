// 数据模型（表级）视图的布局计算：分层 + 列内排布。
//
// 输入是「表 / 自定义 SQL 节点 + join 边」，输出每个节点的坐标与画布尺寸。
// 表数量级很小（几张到几十张），用 BFS 分层即可，不引入图布局依赖。

import type { WorkbookConnection, WorkbookModel } from "../types.ts";

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
  /** 所属数据源的连接信息（交付核对时看服务器/库名）。 */
  connection: WorkbookConnection | null;
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
    const idOf = (name: string, table: string | null, kind: string, objectId?: string | null): string =>
      `ds${dsIdx}:${kind}:${name}:${table ?? ""}:${objectId ?? ""}`;

    for (const t of dm.tables) {
      const id = idOf(t.name, t.table, t.kind, t.objectId);
      if (seen.has(id)) continue;
      seen.add(id);
      nodes.push({
        id,
        label: t.name,
        sublabel: t.table || null,
        kind: t.kind,
        datasource: dsName,
        connection: ds.connection ?? null,
        sql: t.sql
      });
    }

    dm.joins.forEach((j, i) => {
      const from = idOf(j.left.name, j.left.table, j.left.kind, j.left.objectId);
      const to = idOf(j.right.name, j.right.table, j.right.kind, j.right.objectId);
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

/** 分层布局：先按最长路径分层，再让**子表对齐父表的垂直中心**。
 *
 * 早期版本把每层在画布里平均分布，结果「订单 → 人员 / 退货」这类 1 对多关系里，
 * 右侧两张表相对整列居中、而不是相对「订单」居中，看起来整体偏上。
 * 现在：子节点期望位置 = 父节点中心的均值，同层按期望位置排序后就近落位，
 * 最后整组平移使组中心贴合期望中心（不越上边界、不重叠）。
 */
export function layoutDataModel(graph: DataModelGraph): DataModelLayout {
  const { nodes, edges } = graph;
  const incoming = new Map<string, string[]>();
  for (const n of nodes) incoming.set(n.id, []);
  for (const e of edges) incoming.get(e.to)?.push(e.from);

  // ---- 1) 分层：先按强连通分量（SCC）收缩，再在 DAG 上取最长路径 ----
  // 早期实现「反复松弛到不再变化」：遇到自关联/环时每条边每次都成立，
  // 层号被推到 O(V)（自关联的表会被排到很远的列），复杂度 O(V·E)。
  // SCC 收缩后每个环只占一层，环内节点同列，既正确又快。
  const outgoing = new Map<string, string[]>();
  for (const n of nodes) outgoing.set(n.id, []);
  for (const e of edges) outgoing.get(e.from)?.push(e.to);

  const index = new Map<string, number>();
  const low = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const comp = new Map<string, number>();
  let counter = 0;
  let compCount = 0;

  // Tarjan：节点数是「表/自定义 SQL」量级（几十个），递归深度安全
  const connect = (v: string): void => {
    index.set(v, counter);
    low.set(v, counter);
    counter += 1;
    stack.push(v);
    onStack.add(v);
    for (const w of outgoing.get(v) || []) {
      if (!index.has(w)) {
        connect(w);
        low.set(v, Math.min(low.get(v) as number, low.get(w) as number));
      } else if (onStack.has(w)) {
        low.set(v, Math.min(low.get(v) as number, index.get(w) as number));
      }
    }
    if (low.get(v) === index.get(v)) {
      for (;;) {
        const w = stack.pop() as string;
        onStack.delete(w);
        comp.set(w, compCount);
        if (w === v) break;
      }
      compCount += 1;
    }
  };
  for (const n of nodes) if (!index.has(n.id)) connect(n.id);

  // 收缩成 DAG 后计算分量层号（无环，DFS + memo 即可）
  const compIncoming = new Map<number, Set<number>>();
  for (let c = 0; c < compCount; c++) compIncoming.set(c, new Set());
  for (const e of edges) {
    const a = comp.get(e.from) as number;
    const b = comp.get(e.to) as number;
    if (a !== b) (compIncoming.get(b) as Set<number>).add(a);
  }
  const compLayer = new Map<number, number>();
  const layerOfComp = (c: number): number => {
    const cached = compLayer.get(c);
    if (cached !== undefined) return cached;
    const parents = [...(compIncoming.get(c) || [])];
    const value = parents.length === 0 ? 0 : Math.max(...parents.map(layerOfComp)) + 1;
    compLayer.set(c, value);
    return value;
  };
  const layer = new Map<string, number>();
  for (const n of nodes) layer.set(n.id, layerOfComp(comp.get(n.id) as number));

  const byLayer = new Map<number, DataModelNode[]>();
  for (const n of nodes) {
    const l = layer.get(n.id) ?? 0;
    if (!byLayer.has(l)) byLayer.set(l, []);
    (byLayer.get(l) as DataModelNode[]).push(n);
  }
  const layerKeys = [...byLayer.keys()].sort((a, b) => a - b);

  // ---- 2) 逐层定位 ----
  const pos: Record<string, { x: number; y: number }> = {};
  const centerY = (id: string): number => (pos[id]?.y ?? DM_PAD) + DM_NODE_H / 2;

  layerKeys.forEach((key, colIdx) => {
    const arr = (byLayer.get(key) as DataModelNode[]).slice();
    const x = DM_PAD + colIdx * (DM_NODE_W + DM_COL_GAP);

    if (key === 0) {
      let cursor = DM_PAD;
      for (const n of arr) {
        pos[n.id] = { x, y: cursor };
        cursor += DM_NODE_H + DM_ROW_GAP;
      }
      return;
    }

    const desired = arr.map((n) => {
      const parents = incoming.get(n.id) || [];
      const centers = parents.map(centerY);
      const anchor = centers.length ? centers.reduce((a, b) => a + b, 0) / centers.length : DM_PAD + DM_NODE_H / 2;
      return { node: n, anchor };
    });
    desired.sort((a, b) => a.anchor - b.anchor);

    const placed: Array<{ id: string; top: number; anchor: number }> = [];
    let cursor = DM_PAD;
    for (const d of desired) {
      const top = Math.max(cursor, d.anchor - DM_NODE_H / 2);
      placed.push({ id: d.node.id, top, anchor: d.anchor });
      cursor = top + DM_NODE_H + DM_ROW_GAP;
    }

    // 整组平移：组中心贴合父节点中心均值
    const groupTop = placed[0].top;
    const groupBottom = placed[placed.length - 1].top + DM_NODE_H;
    const wantCenter = placed.reduce((s, p) => s + p.anchor, 0) / placed.length;
    const shift = Math.max(wantCenter - (groupTop + groupBottom) / 2, DM_PAD - groupTop);
    for (const p of placed) pos[p.id] = { x, y: p.top + shift };
  });

  const maxBottom = nodes.length ? Math.max(...nodes.map((n) => pos[n.id].y + DM_NODE_H)) : DM_NODE_H;
  const width = DM_PAD * 2 + layerKeys.length * DM_NODE_W + Math.max(0, layerKeys.length - 1) * DM_COL_GAP;
  const height = maxBottom + DM_PAD;
  return { pos, layers: layerKeys.length, width: Math.max(width, 320), height: Math.max(height, 160) };
}

/** 连接线路径：源节点右侧中点 → 目标节点左侧中点的**平衡弧线**（三次贝塞尔）。
 *  同列或反向的边退回向上拱起的二次弧线，避免穿过节点。 */
export function edgePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  nodeW = DM_NODE_W,
  nodeH = DM_NODE_H
): string {
  const x1 = from.x + nodeW;
  const y1 = from.y + nodeH / 2;
  const x2 = to.x;
  const y2 = to.y + nodeH / 2;
  const gap = x2 - x1;
  if (gap > 8) {
    // 两侧控制点水平外推、对称 → 平衡的 S 形弧
    const dx = Math.min(Math.max(gap * 0.45, 28), 130);
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  }
  const lift = Math.max(56, Math.abs(y2 - y1) / 2 + 40);
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} Q ${midX} ${Math.min(y1, y2) - lift}, ${x2} ${y2}`;
}

/** 连接线中点（放命中区用）。 */
export function edgeMidpoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  nodeW = DM_NODE_W,
  nodeH = DM_NODE_H
): { x: number; y: number } {
  return { x: (from.x + nodeW + to.x) / 2, y: (from.y + to.y) / 2 + nodeH / 2 };
}
