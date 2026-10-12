// 数据模型视图：表 / 自定义 SQL 节点 + 连接关系（含连接类型与 ON 条件）。
//
// 面向交付场景：与客户核对「数据是怎么连起来的」「口径取自哪段 SQL」。
// 只读渲染，不做编辑；点击表或连接线在右侧看详情。

import { useEffect, useMemo, useState } from "react";
import type { WorkbookModel } from "../types.ts";
import {
  DM_NODE_H,
  DM_NODE_W,
  edgePath,
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
  const [copied, setCopied] = useState(false);

  const copySql = (sql: string) => {
    void navigator.clipboard?.writeText(sql).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => undefined
    );
  };

  const nodeById = useMemo(() => new Map(graph.nodes.map((n) => [n.id, n])), [graph.nodes]);

  // 进入数据模型视图时，若有自定义 SQL 就默认选中第一个 —— 右侧直接给出 SQL 过程
  useEffect(() => {
    setSelected((cur) => {
      if (cur) return cur;
      const first = graph.nodes.find((n) => n.kind === "custom-sql");
      return first ? { kind: "node", id: first.id } : cur;
    });
  }, [graph.nodes]);

  /** 数据源连接摘要（服务器 / 库 / 文件）。 */
  const connectionText = (n: DataModelNode): string => {
    const c = n.connection;
    if (!c) return "";
    return [c.class, c.type, c.server, c.dbname, c.filename].filter(Boolean).join(" · ");
  };
  const selectedNode: DataModelNode | null =
    selected?.kind === "node" ? nodeById.get(selected.id) ?? null : null;
  const selectedEdge: DataModelEdge | null =
    selected?.kind === "edge" ? graph.edges.find((e) => e.id === selected.id) ?? null : null;

  const joinCount = graph.edges.length;
  const sqlNodes = graph.nodes.filter((n) => n.kind === "custom-sql");

  /** 节点左上角坐标（edgePath 内部自行取端口）。 */
  const pos = (id: string): { x: number; y: number } => layout.pos[id] ?? { x: 0, y: 0 };

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
            {/* 连接：平衡弧线（不放文字标签，类型与条件在详情面板/悬停提示里） */}
            {graph.edges.map((e) => {
              const a = pos(e.from);
              const b = pos(e.to);
              const active = selected?.kind === "edge" && selected.id === e.id;
              const aNode = nodeById.get(e.from);
              const bNode = nodeById.get(e.to);
              const d = edgePath(a, b);
              return (
                <g key={e.id} className={`dm-edge${active ? " active" : ""}`}>
                  {/* 加粗的透明命中层：细弧线也容易点中 */}
                  <path
                    d={d}
                    className="dm-link-hit"
                    onClick={() => setSelected({ kind: "edge", id: e.id })}
                  />
                  <path d={d} className={`dm-link join-${e.joinType}`} />
                  <title>
                    {`${aNode?.label ?? "?"} — ${joinLabel(t, e.joinType)} — ${bNode?.label ?? "?"}\n` +
                      `${t("dmOn")}: ${e.leftExpr ?? "—"} = ${e.rightExpr ?? "—"}` +
                      (e.cardinality ? `\n${t("dmCardinality")}: ${e.cardinality}` : "")}
                  </title>
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
              <div className="dm-detail-title">
                {selectedNode.label}
                <span className={`dm-kind-badge ${selectedNode.kind}`}>
                  {selectedNode.kind === "custom-sql" ? t("dmSqlBadge") : t("dmTableBadge")}
                </span>
              </div>
              <dl>
                <dt>{t("dmDatasource")}</dt>
                <dd>{selectedNode.datasource}</dd>
                {selectedNode.sublabel && (
                  <>
                    <dt>{t("dmPhysical")}</dt>
                    <dd className="mono">{selectedNode.sublabel}</dd>
                  </>
                )}
                {connectionText(selectedNode) && (
                  <>
                    <dt>{t("dmConnection")}</dt>
                    <dd className="mono">{connectionText(selectedNode)}</dd>
                  </>
                )}
              </dl>
              {selectedNode.sql && (
                <>
                  <div className="dm-sql-title">
                    {t("dmSqlText")}
                    <button className="sql-copy" onClick={() => copySql(selectedNode.sql as string)}>
                      {copied ? t("sqlCopied") : t("sqlCopy")}
                    </button>
                  </div>
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

          {/* 自定义 SQL 常驻清单：部分「表」其实是自定义 SQL，点开即看完整过程 */}
          {sqlNodes.length > 0 && (
            <div className="dm-sql-list">
              <div className="dm-sql-list-title">
                {t("dmSqlList")}
                <span className="wb-count">{sqlNodes.length}</span>
              </div>
              {sqlNodes.map((n) => (
                <button
                  key={n.id}
                  className={`dm-sql-item${selected?.kind === "node" && selected.id === n.id ? " active" : ""}`}
                  onClick={() => setSelected({ kind: "node", id: n.id })}
                  title={n.datasource}
                >
                  {n.label}
                </button>
              ))}
            </div>
          )}

          <div className="dm-legend">
            <div className="dm-legend-item">
              <span className="dm-swatch dm-table" />
              {t("dmTableBadge")}
            </div>
            <div className="dm-legend-item">
              <span className="dm-swatch dm-custom-sql" />
              {t("dmSqlBadge")}
            </div>
            <div className="dm-legend-item dm-legend-hint">{t("dmSelectHint")}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
