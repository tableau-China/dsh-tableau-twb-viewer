// 字段引用关系图：分层布局 + 搜索 / 角色筛选 + 点击查看上下游血缘。
//
// 大图（节点数超过 LARGE_GRAPH_NODES）选中节点后自动聚焦，避免一次渲染上万元素。

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { GraphNode, Lineage, WorkbookModel } from "../types.ts";
import {
  KIND_STYLE,
  LAYER_GAP,
  NODE_H,
  NODE_W,
  buildGraph,
  downstream,
  layeredLayout,
  lineage,
  nodeCategory,
  upstream
} from "../graph.ts";
import { useT, type Translator } from "../i18n.tsx";
import { wrapLabel } from "../lib/model.ts";
import { formatParameterValue, formatRange } from "../lib/format.ts";
import { FormulaCode } from "./FormulaCode.tsx";

/** 节点类别 → 文案键（详情 pill 用；图例走 legendItems）。 */
const CATEGORY_KEY: Record<string, string> = {
  datasource: "legendDatasource",
  dimension: "legendDimension",
  measure: "legendMeasure",
  calc: "legendCalc",
  parameter: "legendParameter",
  unknown: "legendUnknown"
};

/** 节点类别图例（顺序固定）。 */
function legendItems(t: Translator): Array<[string, string]> {
  return [
    ["datasource", t("legendDatasource")],
    ["dimension", t("legendDimension")],
    ["measure", t("legendMeasure")],
    ["calc", t("legendCalc")],
    ["parameter", t("legendParameter")],
    ["unknown", t("legendUnknown")]
  ];
}

/** 角色筛选页签。 */
function roleTabs(t: Translator): Array<[string, string]> {
  return [
    ["all", t("focusAll")],
    ["calc", t("colCalc")],
    ["dimension", t("roleDimension")],
    ["measure", t("roleMeasure")],
    ["parameter", t("legendParameter")]
  ];
}

/** 分层标签文案（graph 只给出层级号，文案在此翻译）。 */
function laneLabel(t: Translator, layer: number): string {
  if (layer === 0) return t("laneDatasource");
  if (layer === 1) return t("laneRawFields");
  return t("laneCalcLayer", { level: layer - 1 });
}

/** 超过该节点数时，选中节点后自动聚焦（避免一次渲染上万元素）。 */
const LARGE_GRAPH_NODES = 1200;

/** 引用关系视图 props。 */
export interface LineageViewProps {
  model: WorkbookModel;
}

export function LineageView({ model }: LineageViewProps) {
  const t = useT();
  const { nodes, edges } = useMemo(() => buildGraph(model), [model]);
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [focusMode, setFocusMode] = useState("auto");
  const [view, setView] = useState({ x: 40, y: 20, k: 1 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; vx: number; vy: number; moved?: boolean } | null>(null);
  const movedRef = useRef(false);

  // 聚焦跳数：auto = 大图选中时自动 ±2 跳，小图不聚焦
  const focusHops =
    focusMode === "all"
      ? Infinity
      : focusMode === "auto"
        ? nodes.length > LARGE_GRAPH_NODES
          ? 2
          : Infinity
        : Number(focusMode);

  /** 实际渲染的子图（聚焦时只保留选中节点 ±N 跳的节点与两端都在集合内的边）。 */
  const visible = useMemo(() => {
    if (!selected || focusHops === Infinity) return { nodes, edges };
    const keep = new Set<string>([selected]);
    let frontier = new Set<string>([selected]);
    for (let hop = 0; hop < focusHops && frontier.size; hop++) {
      const next = new Set<string>();
      for (const e of edges) {
        if (frontier.has(e.from) && !keep.has(e.to)) {
          keep.add(e.to);
          next.add(e.to);
        } else if (frontier.has(e.to) && !keep.has(e.from)) {
          keep.add(e.from);
          next.add(e.from);
        }
      }
      frontier = next;
    }
    return {
      nodes: nodes.filter((n) => keep.has(n.id)),
      edges: edges.filter((e) => keep.has(e.from) && keep.has(e.to))
    };
  }, [nodes, edges, selected, focusHops]);

  // 大图首帧保护：不选中时 focusHops 为 Infinity，会一次性创建上万个 DOM 元素
  // （实测 16000 字段 → 28782 节点，每个节点 4 个元素）。超过阈值时默认聚焦到连接
  // 最多的节点，首帧只渲染它的 ±2 跳邻域；用户点「全部」仍可看全图。
  useEffect(() => {
    if (nodes.length <= LARGE_GRAPH_NODES) return;
    setSelected((cur) => {
      if (cur) return cur;
      const degree = new Map<string, number>();
      for (const e of edges) {
        degree.set(e.from, (degree.get(e.from) ?? 0) + 1);
        degree.set(e.to, (degree.get(e.to) ?? 0) + 1);
      }
      let best: string | null = null;
      let bestDegree = -1;
      for (const n of nodes) {
        const d = degree.get(n.id) ?? 0;
        if (d > bestDegree) {
          bestDegree = d;
          best = n.id;
        }
      }
      return best;
    });
  }, [nodes, edges]);

  const layout = useMemo(() => layeredLayout(visible.nodes, visible.edges), [visible]);
  const focused = visible.nodes.length !== nodes.length;

  const lin = useMemo(() => (selected ? lineage(selected, edges) : null), [selected, edges]);
  const hlSet = useMemo(
    () => (lin ? new Set([...lin.self, ...lin.upstream, ...lin.downstream]) : null),
    [lin]
  );

  // 必须 useCallback：ResizeObserver 的 effect 依赖此函数，
  // 否则每次渲染都重建 observer → observe 回调 → setView（新对象）→ 再渲染，形成自激循环。
  const fit = useCallback(() => {
    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const k = Math.min((rect.width - 24) / layout.width, (rect.height - 24) / layout.height, 1);
    setView({ x: Math.max(8, (rect.width - layout.width * k) / 2), y: 12, k });
  }, [layout.width, layout.height]);

  useEffect(() => {
    const raf = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(raf);
  }, [fit]);

  // 容器尺寸变化（如全屏切换）时自动重新适配
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  // 滚轮缩放已移除：视图在小/大图之间会因缩放重算而闪烁，交付演示时反而干扰。
  // 保留「适配窗口」与拖拽平移；需要看细节用聚焦（±1/±2/±3）或全屏。

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    const nx = Number.isFinite(dragRef.current.vx + dx) ? dragRef.current.vx + dx : 0;
    const ny = Number.isFinite(dragRef.current.vy + dy) ? dragRef.current.vy + dy : 0;
    setView((v) => ({ ...v, x: nx, y: ny }));
  }, []);

  const onPointerUp = useCallback(() => {
    if (dragRef.current) {
      movedRef.current = Boolean(dragRef.current.moved);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
      dragRef.current = null;
    }
  }, [onPointerMove]);

  // 组件卸载时清掉可能残留的拖拽监听（宿主切视图时组件会被卸载）
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      if (e.button === 0) {
        dragRef.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("blur", onPointerUp);
      }
    },
    [view.x, view.y, onPointerMove, onPointerUp]
  );

  const onClickCanvas = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (e.target === svgRef.current) {
      if (movedRef.current) {
        movedRef.current = false;
        return;
      }
      setSelected(null);
    }
  };

  const fields = useMemo(() => nodes.filter((n) => n.kind === "field"), [nodes]);

  const filteredFields = useMemo(() => {
    const q = search.trim().toLowerCase();
    return fields.filter((f) => {
      // 参数既不算维度也不算度量：单独一类，且不被「计算字段」筛走
      if (roleFilter === "parameter" && !f.isParameter) return false;
      if (roleFilter === "calc" && (!f.isCalc || f.isParameter)) return false;
      if (roleFilter === "dimension" && (f.isParameter || f.role !== "dimension")) return false;
      if (roleFilter === "measure" && (f.isParameter || f.role !== "measure")) return false;
      if (
        q &&
        !String(f.label).toLowerCase().includes(q) &&
        !String(f.name).toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [fields, roleFilter, search]);

  const searchHits = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return new Set(
      fields
        .filter(
          (f) =>
            String(f.label).toLowerCase().includes(q) || String(f.name).toLowerCase().includes(q)
        )
        .map((f) => f.id)
    );
  }, [fields, search]);

  const selectedNode = selected ? nodeById.get(selected) : null;
  const upCount = lin ? lin.upstream.size : 0;
  const downCount = lin ? lin.downstream.size : 0;

  const edgeClass = (e: { from: string; to: string }) => {
    if (lin) return hlSet?.has(e.from) && hlSet.has(e.to) ? "ln-edge-hl" : "ln-edge-dim";
    if (searchHits) return searchHits.has(e.from) && searchHits.has(e.to) ? "ln-edge-hl" : "ln-edge-dim";
    return "";
  };

  const nodeClass = (n: GraphNode) => {
    if (lin) {
      if (lin.self.has(n.id)) return "ln-self";
      if (lin.upstream.has(n.id)) return "ln-up";
      if (lin.downstream.has(n.id)) return "ln-down";
      return "ln-dim";
    }
    if (searchHits) return searchHits.has(n.id) ? "ln-search" : "ln-dim";
    return "";
  };

  return (
    <div className="lineage">
      <aside className="lineage-picker">
        <div className="picker-head">{t("pickerHead")}</div>
        <input
          className="ft-search"
          placeholder={t("searchLineage")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="role-tabs">
          {roleTabs(t).map(([key, label]: [string, string]) => (
            <button
              key={key}
              className={roleFilter === key ? "rt active" : "rt"}
              onClick={() => setRoleFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="picker-list">
          {filteredFields.map((f) => (
            <button
              key={f.id}
              className={`picker-item cat-${nodeCategory(f)}${selected === f.id ? " active" : ""}`}
              onClick={() => setSelected(f.id)}
              title={f.name ?? undefined}
            >
              {f.label}
            </button>
          ))}
          {filteredFields.length === 0 && <p className="muted">{t("noMatchPeriod")}</p>}
        </div>
      </aside>

      <section className="lineage-canvas">
        <div className="lineage-toolbar">
          <div className="legend">
            {legendItems(t).map(([key, label]) => {
              const style = KIND_STYLE[key as keyof typeof KIND_STYLE];
              return (
                <span key={key} className="lg">
                  <i style={{ background: style.fill, borderColor: style.stroke }} />
                  {label}
                </span>
              );
            })}
            <span className="lg-note">{t("arrowNote")}</span>
          </div>
          <div className="toolbar-actions">
            <span className="focus-seg" title={t("focusTooltip")}>
              {t("focus")}
              {[
                ["auto", t("focusAuto")],
                ["1", "±1"],
                ["2", "±2"],
                ["3", "±3"],
                ["all", t("focusAll")]
              ].map(([key, label]) => (
                <button
                  key={key}
                  className={focusMode === key ? "active" : ""}
                  onClick={() => setFocusMode(key)}
                >
                  {label}
                </button>
              ))}
            </span>
            {focused && (
              <span className="focus-count">
                {t("nodesCount", { shown: visible.nodes.length, total: nodes.length })}
              </span>
            )}
            <button onClick={fit}>{t("fitWindow")}</button>
            <button onClick={() => setSelected(null)}>{t("clearHighlight")}</button>
          </div>
        </div>
        <svg
          ref={svgRef}
          className="lineage-svg"
          onPointerDown={onPointerDown}
          onClick={onClickCanvas}
        >
          <defs>
            <marker id="ln-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#868e96" />
            </marker>
            <marker id="ln-arrow-hl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#1971c2" />
            </marker>
          </defs>
          <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
            {layout.lanes.map((lane) => (
              <g key={"lane-" + lane.layer}>
                {lane.layer !== 0 && (
                  <line
                    className="ln-lane-line"
                    x1={lane.x - LAYER_GAP / 2}
                    y1={0}
                    x2={lane.x - LAYER_GAP / 2}
                    y2={Math.max(0, layout.height - 48)}
                  />
                )}
                <text className="ln-lane-label" x={lane.x + lane.width / 2} y={20} textAnchor="middle">
                  {laneLabel(t, lane.layer)}
                  {lane.subCols > 1 ? t("subCols", { count: lane.subCols }) : ""}
                </text>
              </g>
            ))}
            {visible.edges.map((e, i) => {
              const from = layout.pos[e.from];
              const to = layout.pos[e.to];
              if (!from || !to) return null;
              const left = from.x <= to.x ? from : to;
              const right = from.x <= to.x ? to : from;
              const sx = left.x + NODE_W;
              const sy = left.y + NODE_H / 2;
              const tx = right.x;
              const ty = right.y + NODE_H / 2;
              const bend = Math.max(30, Math.abs(tx - sx) / 2);
              const d = `M${sx},${sy} C${sx + bend},${sy} ${tx - bend},${ty} ${tx},${ty}`;
              const hl = edgeClass(e) === "ln-edge-hl";
              return (
                <path
                  key={i}
                  d={d}
                  className={"ln-edge " + edgeClass(e)}
                  markerEnd={"url(#" + (hl ? "ln-arrow-hl" : "ln-arrow") + ")"}
                />
              );
            })}
            {visible.nodes.map((n) => {
              const p = layout.pos[n.id];
              if (!p) return null;
              const cat = nodeCategory(n);
              const style = KIND_STYLE[cat];
              const lines = wrapLabel(n.label);
              const lineH = 13;
              const firstY = 24 - ((lines.length - 1) * lineH) / 2 + 10;
              return (
                <g
                  key={n.id}
                  className={"ln-node " + nodeClass(n)}
                  transform={`translate(${p.x},${p.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(n.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx={9}
                    className="ln-rect"
                    style={{ fill: style.fill, stroke: style.stroke }}
                  />
                  <text className="ln-label" x={NODE_W / 2} textAnchor="middle">
                    {lines.map((line, i) => (
                      <tspan key={i} x={NODE_W / 2} y={firstY + i * lineH}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </section>

      <aside className="lineage-detail">
        {!selectedNode && (
          <div className="detail-empty">{t("detailEmpty")}</div>
        )}
        {selectedNode && (
          <div className="detail-body">
            <div className="detail-head">{selectedNode.label}</div>
            <div className="detail-meta">
              <span className={`pill cat-${nodeCategory(selectedNode)}`}>
                {t(CATEGORY_KEY[nodeCategory(selectedNode)])}
              </span>
              {selectedNode.kind === "field" && !selectedNode.isParameter && (
                <span className="pill">
                  {selectedNode.role === "dimension"
                    ? t("roleDimension")
                    : selectedNode.role === "measure"
                      ? t("roleMeasure")
                      : t("kindField")}
                </span>
              )}
            </div>
            {/* 参数：既不是维度也不是度量 —— 展示当前值（按工作簿格式）与取值域 */}
            {selectedNode.isParameter && (
              <div className="detail-param">
                <div className="dp-value">
                  <span className="dp-label">{t("paramValue")}</span>
                  <span className="dp-num">
                    {formatParameterValue(selectedNode.parameter?.value, selectedNode.parameter?.defaultFormat)}
                  </span>
                </div>
                <div className="dp-meta">
                  <span>{t("paramDomain")}: {selectedNode.parameter?.domainType ?? "—"}</span>
                  {formatRange(selectedNode.parameter?.range, t("paramStep")) && (
                    <span>{t("paramRange")}: {formatRange(selectedNode.parameter?.range, t("paramStep"))}</span>
                  )}
                  <span>{t("paramFormat")}: {selectedNode.parameter?.defaultFormat ?? "—"}</span>
                </div>
                <div className="dp-raw" title={t("paramRawHint")}>
                  {t("paramRaw")}: {selectedNode.parameter?.value ?? "—"}
                </div>
              </div>
            )}
            {selectedNode.kind === "field" && (
              <div className="detail-internal" title={selectedNode.name ?? undefined}>
                {t("internalName", { name: selectedNode.name ?? "" })}
              </div>
            )}
            {selectedNode.formulaRaw && (
              <div className="detail-formula">
                <div className="df-title">{t("calcFormula")}</div>
                <pre className="calc-formula">
                  <FormulaCode formula={selectedNode.formula || selectedNode.formulaRaw} />
                </pre>
              </div>
            )}
            <div className="detail-counts">
              <div className="dc up">
                <span className="dc-num">{upCount}</span>
                <span className="dc-lbl">{t("upstreamLabel")}</span>
              </div>
              <div className="dc down">
                <span className="dc-num">{downCount}</span>
                <span className="dc-lbl">{t("downstreamLabel")}</span>
              </div>
            </div>
            {lin && upCount > 0 && (
              <div className="detail-list">
                <div className="dl-title ln-up">{t("upstreamTitle")}</div>
                {[...lin.upstream].map((id) => {
                  const node = nodeById.get(id);
                  return (
                    <button key={id} className="dl-item" onClick={() => setSelected(id)}>
                      {node ? node.label : id}
                    </button>
                  );
                })}
              </div>
            )}
            {lin && downCount > 0 && (
              <div className="detail-list">
                <div className="dl-title ln-down">{t("downstreamTitle")}</div>
                {[...lin.downstream].map((id) => {
                  const node = nodeById.get(id);
                  return (
                    <button key={id} className="dl-item" onClick={() => setSelected(id)}>
                      {node ? node.label : id}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
