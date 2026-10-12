// 数据模型视图：表 / 自定义 SQL 节点 + 连接关系（含连接类型与 ON 条件）。
//
// 面向交付场景：与客户核对「数据是怎么连起来的」「口径取自哪段 SQL」。
// 只读渲染，不做编辑；点击表或连接线在右侧看详情。

import { useMemo, useState } from "react";
import type { WorkbookModel } from "../types.ts";
import {
  DM_NODE_H,
  DM_NODE_W,
  buildDataModelGraph,
  layoutDataModel,
  type DataModelEdge,
  type DataModelNode
} from "../lib/datamodel.ts";
import { useT, type Translator } from "../i18n.tsx";

/** join 类型文案。 */
function joinLabel(t: Translator, joinType: string): string {
  const map: Record<string, string> = {
    inner: t("joinInner"),
    left: t("joinLeft"),
    right: t("joinRight"),
    full: t("joinFull"),
    relationship: t("joinRelationship")
  };
  return map[joinType] ?? joinType;
}

/** 数据模型视图 props。 */
export interface DataModelViewProps {
  model: WorkbookModel;
}

export function DataModelView({ model }: DataModelViewProps) {
  const t = useT();
  const graph = useMemo(() => buildDataModelGraph(model), [model]);
  const layout = useMemo(() => layoutDataModel(graph), [graph]);
  const [selected, setSelected] = useState<{ kind: "node" | "edge"; id: string } | null>(null);

  const nodeById = useMemo(() => new Map(graph.nodes.map((n) => [n.id, n])), [graph.nodes]);
  const selectedNode: DataModelNode | null =
    selected?.kind === "node" ? nodeById.get(selected.id) ?? null : null;
  const selectedEdge: DataModelEdge | null =
    selected?.kind === "edge" ? graph.edges.find((e) => e.id === selected.id) ?? null : null;

  const joinCount = graph.edges.length;
  const sqlNodes = graph.nodes.filter((n) => n.kind === "custom-sql");

  const center = (id: string): { x: number; y: number } => {
    const p = layout.pos[id] ?? { x: 0, y: 0 };
    return { x: p.x + DM_NODE_W / 2, y: p.y + DM_NODE_H / 2 };
  };

  return (
    <div className="datamodel-view">
      <div className="dm-toolbar">
        <span className="dm-stat">{t("dmTables", { count: graph.nodes.length })}</span>
        <span className="dm-stat">{t("dmJoins", { count: joinCount })}</span>
        {sqlNodes.length > 0 && <span className="dm-stat">{t("dmCustomSql", { count: sqlNodes.length })}</span>}
        <span className="dm-hint">{t("dmSelectHint")}</span>
      </div>

      <div className="dm-body">
        <div className="dm-canvas">
          <svg
            className="dm-svg"
            width={layout.width}
            height={layout.height}
            viewBox={`0 0 ${layout.width} ${layout.height}`}
          >
            {/* 连接线 */}
            {graph.edges.map((e) => {
              const a = center(e.from);
              const b = center(e.to);
              const midX = (a.x + b.x) / 2;
              const active = selected?.kind === "edge" && selected.id === e.id;
              const aNode = nodeById.get(e.from);
              const bNode = nodeById.get(e.to);
              return (
                <g key={e.id} className={`dm-edge${active ? " active" : ""}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={`dm-link join-${e.joinType}`}
                    onClick={() => setSelected({ kind: "edge", id: e.id })}
                  />
                  <title>
                    {`${aNode?.label ?? "?"} ${joinLabel(t, e.joinType)} ${bNode?.label ?? "?"}\n` +
                      `${t("dmOn")}: ${e.leftExpr ?? "—"} = ${e.rightExpr ?? "—"}` +
                      (e.cardinality ? `\n${t("dmCardinality")}: ${e.cardinality}` : "")}
                  </title>
                  <rect
                    x={midX - 34}
                    y={(a.y + b.y) / 2 - 10}
                    width={68}
                    height={20}
                    rx={10}
                    className="dm-edge-badge"
                    onClick={() => setSelected({ kind: "edge", id: e.id })}
                  />
                  <text x={midX} y={(a.y + b.y) / 2 + 4} textAnchor="middle" className="dm-edge-label">
                    {joinLabel(t, e.joinType)}
                  </text>
                </g>
              );
            })}

            {/* 表 / 自定义 SQL 节点 */}
            {graph.nodes.map((n) => {
              const p = layout.pos[n.id] ?? { x: 0, y: 0 };
              const active = selected?.kind === "node" && selected.id === n.id;
              return (
                <g
                  key={n.id}
                  className={`dm-node dm-${n.kind}${active ? " active" : ""}`}
                  transform={`translate(${p.x}, ${p.y})`}
                  onClick={() => setSelected({ kind: "node", id: n.id })}
                >
                  <title>{`${n.label}${n.sublabel ? "\n" + n.sublabel : ""}\n${t("dmDatasource")}: ${n.datasource}`}</title>
                  <rect width={DM_NODE_W} height={DM_NODE_H} rx={8} />
                  <text x={12} y={23} className="dm-node-title">
                    {n.label.length > 16 ? n.label.slice(0, 15) + "…" : n.label}
                  </text>
                  <text x={12} y={41} className="dm-node-sub">
                    {n.kind === "custom-sql" ? t("dmSqlBadge") : (n.sublabel ?? "").slice(0, 20)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <aside className="dm-detail">
          {!selected && <div className="dm-detail-empty">{graph.nodes.length ? t("dmSelectHint") : t("dmEmpty")}</div>}

          {selectedNode && (
            <div className="dm-detail-card">
              <div className="dm-detail-title">{selectedNode.label}</div>
              <dl>
                <dt>{t("dmKind")}</dt>
                <dd>{selectedNode.kind === "custom-sql" ? t("dmSqlBadge") : t("dmTableBadge")}</dd>
                <dt>{t("dmDatasource")}</dt>
                <dd>{selectedNode.datasource}</dd>
                {selectedNode.sublabel && (
                  <>
                    <dt>{t("dmPhysical")}</dt>
                    <dd className="mono">{selectedNode.sublabel}</dd>
                  </>
                )}
              </dl>
              {selectedNode.sql && (
                <>
                  <div className="dm-sql-title">{t("dmSqlText")}</div>
                  <pre className="dm-sql">{selectedNode.sql}</pre>
                </>
              )}
            </div>
          )}

          {selectedEdge && (
            <div className="dm-detail-card">
              <div className="dm-detail-title">{joinLabel(t, selectedEdge.joinType)}</div>
              <dl>
                <dt>{t("dmFrom")}</dt>
                <dd>{nodeById.get(selectedEdge.from)?.label ?? "?"}</dd>
                <dt>{t("dmTo")}</dt>
                <dd>{nodeById.get(selectedEdge.to)?.label ?? "?"}</dd>
                <dt>{t("dmOn")}</dt>
                <dd className="mono">
                  {selectedEdge.leftExpr ?? "—"} = {selectedEdge.rightExpr ?? "—"}
                </dd>
                <dt>{t("dmCardinality")}</dt>
                <dd>{selectedEdge.cardinality ?? t("dmNotStored")}</dd>
              </dl>
            </div>
          )}

          {sqlNodes.length > 0 && !selected && (
            <div className="dm-legend">
              <div className="dm-legend-item">
                <span className="dm-swatch dm-table" />
                {t("dmTableBadge")}
              </div>
              <div className="dm-legend-item">
                <span className="dm-swatch dm-custom-sql" />
                {t("dmSqlBadge")}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
