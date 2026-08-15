// dsh-tableau-twb-viewer — 浏览器端 UI（客户端插件半部）
//
// 完整移植 tableau_parse 应用：上传 .twb -> 仪表板 1:1 SVG 布局图（缩放/平移/
// 导出 SVG/PNG/Excalidraw）+ 数据源/字段/计算字段 metadata + 字段引用关系图。
//
// 构建产物 lib/client.js 由 build.mjs 生成（esbuild 打包为 ModuleLoader 工厂
// 格式）；本文件为可维护的 JSX 源码。

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { parseWorkbook } from "./parser.js";
import { buildGraph, layeredLayout, lineage, nodeCategory, KIND_STYLE, NODE_W, NODE_H, LAYER_GAP } from "./graph.js";
import { tokenize, tokenClass } from "./formula.js";
import styleCss from "./style.css";
import pluginCss from "./plugin.css";

// ---- CSS 注入（与官方插件一致的 data-plugin-css 模式）----
const CSS_TAG = "dsh-tableau-twb-viewer/style.css";
if (typeof document !== "undefined" && !document.querySelector(`style[data-plugin-css="${CSS_TAG}"]`)) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-tableau-twb-viewer";
  tag.dataset.pluginCss = CSS_TAG;
  tag.textContent = styleCss;
  document.head.appendChild(tag);
}
const PLUGIN_CSS_TAG = "dsh-tableau-twb-viewer/plugin.css";
if (typeof document !== "undefined" && !document.querySelector(`style[data-plugin-css="${PLUGIN_CSS_TAG}"]`)) {
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-tableau-twb-viewer";
  tag.dataset.pluginCss = PLUGIN_CSS_TAG;
  tag.textContent = pluginCss;
  document.head.appendChild(tag);
}

// ---- 解析结果持久化 ----
// 设置弹窗关闭（如 Esc）会卸载检视器；把已解析的模型缓存下来，
// 重新打开设置时直接恢复，无需重新上传。内存缓存 + sessionStorage 双保险。

const CACHE_KEY = "dsh-tableau-twb-viewer.state.v1";
let memoryCache = null;

function loadPersisted() {
  if (memoryCache) return memoryCache;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) memoryCache = JSON.parse(raw);
  } catch {
    /* sessionStorage 不可用/配额不足时忽略 */
  }
  return memoryCache;
}

function persistState(state) {
  memoryCache = state;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(state));
  } catch {
    /* 大文件超出配额时仅保留内存缓存 */
  }
}

// ---- 通用小工具 ----

const SVG_NS = "http://www.w3.org/2000/svg";

/** 触发浏览器下载（Blob 或文本）。 */
function downloadBlob(filename, blobOrText, mime) {
  const blob = blobOrText instanceof Blob ? blobOrText : new Blob([blobOrText], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** 展平 zone 树。 */
function flattenZones(zones) {
  const out = [];
  for (const z of zones) {
    out.push(z);
    if (z.children && z.children.length) out.push(...flattenZones(z.children));
  }
  return out;
}

const rand = () => Math.floor(Math.random() * 1e5);

/** 把 zone 树导出为 Excalidraw JSON（可拖入 excalidraw.com 继续编辑）。 */
function excalidrawJson(zones) {
  const flat = flattenZones(zones);
  const elements = [];
  let n = 1;
  for (const z of flat) {
    const isWs = z.kind === "worksheet";
    elements.push({
      id: `rect-${n}`,
      type: "rectangle",
      x: Math.round(z.x),
      y: Math.round(z.y),
      width: Math.max(1, Math.round(z.w)),
      height: Math.max(1, Math.round(z.h)),
      angle: 0,
      strokeColor: isWs ? "#1971c2" : "#868e96",
      backgroundColor: isWs ? "#a5d8ff" : "#ffffff",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 0,
      opacity: 100,
      groupIds: [],
      frameId: null,
      roundness: null,
      seed: rand(),
      version: 1,
      versionNonce: rand(),
      isDeleted: false,
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false
    });
    const label = isWs ? z.name : z.text;
    if (label) {
      elements.push({
        id: `text-${n}`,
        type: "text",
        x: Math.round(z.x + 6),
        y: Math.round(z.y + 6),
        width: Math.max(20, Math.round(z.w) - 12),
        height: 25,
        angle: 0,
        strokeColor: "#1e1e1e",
        backgroundColor: "transparent",
        fillStyle: "solid",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 0,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: null,
        seed: rand(),
        version: 1,
        versionNonce: rand(),
        isDeleted: false,
        updated: Date.now(),
        link: null,
        locked: false,
        text: label,
        fontSize: 16,
        fontFamily: 1,
        textAlign: "left",
        verticalAlign: "top",
        containerId: null,
        originalText: label,
        lineHeight: 1.25,
        baseline: 18
      });
    }
    n++;
  }
  return JSON.stringify(
    {
      type: "excalidraw",
      version: 2,
      source: "twb-dashboard-inspector",
      elements,
      appState: { gridSize: null, viewBackgroundColor: "#ffffff" },
      files: {}
    },
    null,
    2
  );
}

/** 工作簿概要统计。 */
function summarize(model) {
  return {
    dashboards: model.dashboards.length,
    worksheets: model.worksheets.length,
    datasources: model.datasources.length,
    fields: model.datasources.reduce((sum, ds) => sum + ds.columns.length, 0),
    calculations: model.datasources.reduce((sum, ds) => sum + ds.columns.filter((c) => c.formula).length, 0)
  };
}

/** 节点标签折行（每 10 字符一行，最多 3 行后省略）。 */
function wrapLabel(text, per = 10) {
  if (!text) return [""];
  const chunks = [];
  for (let i = 0; i < text.length; i += per) chunks.push(text.slice(i, i + per));
  if (chunks.length <= 3) return chunks;
  const head = chunks.slice(0, 2).join("");
  const tail = chunks.slice(2).join("").slice(0, per - 1) + "…";
  return [head.slice(0, per), head.slice(per, per * 2), tail];
}

// ---- 上传组件 ----

function Uploader({ onText, onError }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const pick = (file) => {
    if (!file) return;
    if (!/\.twb$/i.test(file.name)) {
      if (onError) onError("请选择 .twb 文件");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (onText) onText(reader.result, file.name);
    };
    reader.onerror = () => {
      if (onError) onError("文件读取失败");
    };
    reader.readAsText(file);
  };

  const loadSample = async () => {
    try {
      const res = await fetch("/twb-viewer/sample.twb");
      if (!res.ok) throw new Error("sample not found");
      const text = await res.text();
      if (onText) onText(text, "sample.twb（示例）");
    } catch (err) {
      if (onError) onError("载入示例失败：" + err.message);
    }
  };

  return (
    <div
      className={`uploader ${drag ? "drag" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        pick(e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".twb,application/xml,text/xml"
        style={{ display: "none" }}
        onChange={(e) => pick(e.target.files[0])}
      />
      <button className="primary" onClick={() => inputRef.current.click()}>
        选择 .twb 文件
      </button>
      <button onClick={loadSample}>载入示例</button>
      <span className="hint">拖拽 .twb 到此处，或点击选择（也可直接载入内置示例）</span>
    </div>
  );
}

// ---- 仪表板布局图 ----

/** 单个 zone 的 SVG 渲染（递归）。 */
function ZoneNode({ z, depth }) {
  const isWs = z.kind === "worksheet";
  const isText = z.kind === "text";
  const fill = isWs ? "#dbeafe" : isText ? "#ffffff" : "#f8fafc";
  const stroke = isWs ? "#3b82f6" : "#cbd5e1";
  const dash = z.kind === "container" && z.type.includes("flow") ? "5 4" : "";
  const fontSize = isWs ? Math.max(9, Math.min(15, z.h * 0.16)) : 13;

  return (
    <g>
      <rect
        x={z.x}
        y={z.y}
        width={Math.max(1, z.w)}
        height={Math.max(1, z.h)}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        strokeDasharray={dash}
        rx={2}
      />
      {isWs && z.h > 22 && (
        <text
          x={z.x + z.w / 2}
          y={z.y + z.h / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight="600"
          fill="#1e3a8a"
        >
          {z.name}
        </text>
      )}
      {isText && (
        <text x={z.x + 6} y={z.y + Math.min(18, z.h - 4)} fontSize={13} fill="#334155">
          {z.text.length > 60 ? z.text.slice(0, 60) + "…" : z.text}
        </text>
      )}
      {!isWs && !isText && depth > 0 && z.type && z.h > 26 && (
        <text x={z.x + 4} y={z.y + 12} fontSize={9} fill="#94a3b8">
          {z.type}
        </text>
      )}
      {z.children &&
        z.children.map((kid, i) => <ZoneNode key={i} z={kid} depth={depth + 1} />)}
    </g>
  );
}

/** 仪表板视图：1:1 布局 + 缩放/平移 + 导出。 */
function DashboardView({ dashboard }) {
  const viewportRef = useRef(null);
  const zonesRef = useRef(null);
  const [zoom, setZoom] = useState(0.2);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const dragRef = useRef(null);
  const width = dashboard?.width || 0;
  const height = dashboard?.height || 0;

  const fit = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp || !width || !height) return;
    const k = Math.min((vp.clientWidth - 24) / width, (vp.clientHeight - 24) / height);
    const s = Math.min(1, k);
    setZoom(s);
    setPanX(Math.max(8, (vp.clientWidth - width * s) / 2));
    setPanY(12);
  }, [width, height]);

  useEffect(() => {
    fit();
  }, [fit, dashboard]);

  // 容器尺寸变化（如全屏切换）时自动重新适配
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  const onWheel = (e) => {
    e.preventDefault();
    const rect = viewportRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    const next = Math.min(4, Math.max(0.02, zoom * factor));
    const ratio = next / zoom;
    setPanX(mx - (mx - panX) * ratio);
    setPanY(my - (my - panY) * ratio);
    setZoom(next);
  };

  const onPointerDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY, tx: panX, ty: panY };
  };
  const onPointerMove = (e) => {
    if (dragRef.current) {
      setPanX(dragRef.current.tx + (e.clientX - dragRef.current.x));
      setPanY(dragRef.current.ty + (e.clientY - dragRef.current.y));
    }
  };
  const endDrag = () => {
    dragRef.current = null;
  };

  const buildSvgString = () => {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("xmlns", SVG_NS);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const bg = document.createElementNS(SVG_NS, "rect");
    bg.setAttribute("x", 0);
    bg.setAttribute("y", 0);
    bg.setAttribute("width", width);
    bg.setAttribute("height", height);
    bg.setAttribute("fill", "#ffffff");
    svg.appendChild(bg);
    if (zonesRef.current) svg.appendChild(zonesRef.current.cloneNode(true));
    return `<?xml version="1.0" encoding="UTF-8"?>\n` + new XMLSerializer().serializeToString(svg);
  };

  const exportSvg = () =>
    downloadBlob(`${dashboard.name || "dashboard"}.svg`, buildSvgString(), "image/svg+xml");

  const exportPng = () => {
    const svgText = buildSvgString();
    const img = new Image();
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width * 2;
      canvas.height = height * 2;
      const c2d = canvas.getContext("2d");
      c2d.fillStyle = "#fff";
      c2d.fillRect(0, 0, canvas.width, canvas.height);
      c2d.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (png) => downloadBlob(`${dashboard.name || "dashboard"}.png`, png, "image/png"),
        "image/png"
      );
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  const exportExcalidraw = () =>
    downloadBlob(
      `${dashboard.name || "dashboard"}.excalidraw`,
      excalidrawJson(dashboard.zones),
      "application/json"
    );

  if (!dashboard) {
    return <div className="canvas-empty">请选择或上传一个包含仪表板的 .twb 文件</div>;
  }

  return (
    <div className="canvas-wrap">
      <div className="canvas-toolbar">
        <div className="tb-left">
          <span className="dash-title">{dashboard.name}</span>
          <span className="dash-dim">
            {width} × {height} px
          </span>
        </div>
        <div className="tb-right">
          <button onClick={() => setZoom((z) => Math.min(4, z * 1.15))}>放大 +</button>
          <button onClick={() => setZoom((z) => Math.max(0.02, z / 1.15))}>缩小 −</button>
          <button onClick={fit}>适配</button>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
          <span className="tb-sep" />
          <button onClick={exportSvg}>导出 SVG</button>
          <button onClick={exportPng}>导出 PNG</button>
          <button className="primary" onClick={exportExcalidraw}>
            导出 Excalidraw
          </button>
        </div>
      </div>
      <div
        ref={viewportRef}
        className="canvas-viewport"
        onWheel={onWheel}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
      >
        <svg
          width={width}
          height={height}
          style={{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})`, transformOrigin: "0 0" }}
        >
          <rect x={0} y={0} width={width} height={height} fill="#ffffff" />
          <g ref={zonesRef}>
            {dashboard.zones.map((z, i) => (
              <ZoneNode key={i} z={z} depth={0} />
            ))}
          </g>
        </svg>
      </div>
      <div className="legend">
        <span>
          <i className="sw sw-ws" /> 工作表
        </span>
        <span>
          <i className="sw sw-ct" /> 容器/布局
        </span>
        <span>
          <i className="sw sw-tx" /> 文本
        </span>
      </div>
    </div>
  );
}

// ---- 公式高亮 ----

function FormulaCode({ formula }) {
  if (!formula) return null;
  const tokens = tokenize(formula);
  return (
    <code className="formula-hl">
      {tokens.map((tok, i) => {
        if (tok.type === "ws") return <Fragment key={i}>{tok.value}</Fragment>;
        return (
          <span key={i} className={tokenClass(tok)}>
            {tok.value}
          </span>
        );
      })}
    </code>
  );
}

// ---- 字段表 ----

const ROLE_LABEL = { dimension: "维度", measure: "度量" };

function FieldsTable({ columns }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return columns.filter((c) => {
      if (filter === "dimension" && c.role !== "dimension") return false;
      if (filter === "measure" && c.role !== "measure") return false;
      if (filter === "calc" && !c.formula) return false;
      if (
        q &&
        !String(c.label || c.name).toLowerCase().includes(q) &&
        !String(c.name).toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [columns, filter, search]);

  return (
    <div className="field-table">
      <div className="ft-controls">
        <div className="seg">
          {[
            ["all", "全部"],
            ["dimension", "维度"],
            ["measure", "度量"],
            ["calc", "计算字段"]
          ].map(([key, label]) => (
            <button
              key={key}
              className={filter === key ? "active" : ""}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          className="ft-search"
          placeholder="搜索字段名…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="ft-count">{rows.length} 个字段</span>
      </div>
      <div className="ft-scroll">
        <table>
          <thead>
            <tr>
              <th>字段名</th>
              <th>角色</th>
              <th>数据类型</th>
              <th>类型</th>
              <th>计算字段</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr key={i} className={c.formula ? "calc-row" : ""}>
                <td className="fname">
                  <div className="fname-main" title={c.caption ? `内部ID: ${c.name}` : undefined}>
                    {c.label}
                  </div>
                </td>
                <td>
                  <span className={`role role-${c.role}`}>{ROLE_LABEL[c.role] || c.role || "—"}</span>
                </td>
                <td>{c.datatype || "—"}</td>
                <td>{c.type || "—"}</td>
                <td>{c.formula ? "是" : "—"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  无匹配字段
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---- 数据源连接信息 ----

function ConnectionChip({ c }) {
  if (!c) return <span className="muted">（无连接信息）</span>;
  const parts = [c.class, c.type, c.server, c.dbname, c.filename].filter(Boolean);
  return <span>{parts.join(" · ") || "（无连接信息）"}</span>;
}

// ---- Metadata 面板 ----

const META_TABS = [
  ["overview", "数据源总览"],
  ["fields", "字段"],
  ["calc", "计算字段"],
  ["sheets", "工作表"]
];

function MetaPanel({ model }) {
  const [tab, setTab] = useState("overview");
  const [dsIdx, setDsIdx] = useState(0);
  const [calcSearch, setCalcSearch] = useState("");
  const ds = model.datasources[dsIdx];

  const calcRows = (ds ? ds.columns.filter((c) => c.formula) : []).filter((c) => {
    const q = calcSearch.trim().toLowerCase();
    if (!q) return true;
    const label = String(c.label || c.name).toLowerCase();
    const formula = String(c.formula || "").toLowerCase();
    return label.includes(q) || formula.includes(q);
  });

  return (
    <div className="meta-panel">
      <div className="meta-tabs">
        {META_TABS.map(([key, label]) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="meta-body">
        {tab === "overview" && (
          <div className="overview">
            {model.datasources.length === 0 && <p className="muted">该工作簿没有数据源。</p>}
            {model.datasources.map((dsItem, i) => {
              const calcCount = dsItem.columns.filter((c) => c.formula).length;
              return (
                <div
                  key={i}
                  className={`ds-card ${i === dsIdx ? "sel" : ""}`}
                  onClick={() => setDsIdx(i)}
                >
                  <div className="ds-name">{dsItem.caption}</div>
                  <div className="ds-sub">
                    <ConnectionChip c={dsItem.connection} />
                  </div>
                  <div className="ds-stats">
                    <span>字段 {dsItem.columns.length}</span>
                    <span>计算字段 {calcCount}</span>
                    <span>组 {dsItem.groups.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {tab === "fields" && (
          <div className="fields-tab">
            {model.datasources.length > 1 && (
              <div className="ds-select">
                <label>数据源：</label>
                <select value={dsIdx} onChange={(e) => setDsIdx(+e.target.value)}>
                  {model.datasources.map((dsItem, i) => (
                    <option key={i} value={i}>
                      {dsItem.caption}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {ds ? <FieldsTable columns={ds.columns} /> : <p className="muted">无字段。</p>}
          </div>
        )}
        {tab === "calc" && (
          <div className="calc-tab">
            {model.datasources.length > 1 && (
              <div className="ds-select">
                <label>数据源：</label>
                <select value={dsIdx} onChange={(e) => setDsIdx(+e.target.value)}>
                  {model.datasources.map((dsItem, i) => (
                    <option key={i} value={i}>
                      {dsItem.caption}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <input
              className="ft-search"
              placeholder="搜索计算字段名或公式…"
              value={calcSearch}
              onChange={(e) => setCalcSearch(e.target.value)}
            />
            <div className="calc-list">
              {calcRows.map((c, i) => (
                <div key={i} className="calc-item">
                  <div className="calc-name">
                    <span className="calc-name-main">{c.label}</span>
                  </div>
                  <pre className="calc-formula">
                    <FormulaCode formula={c.formula} />
                  </pre>
                </div>
              ))}
              {calcRows.length === 0 && <p className="muted">无匹配计算字段。</p>}
            </div>
          </div>
        )}
        {tab === "sheets" && (
          <div className="sheets-tab">
            <p className="muted">共 {model.worksheets.length} 个工作表</p>
            <ul className="sheet-list">
              {model.worksheets.map((name, i) => (
                <li key={i}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- 字段引用关系图 ----

const ROLE_TABS = [
  ["all", "全部"],
  ["calc", "计算字段"],
  ["dimension", "维度"],
  ["measure", "度量"]
];

function LineageView({ model }) {
  const { nodes, edges } = useMemo(() => buildGraph(model), [model]);
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const layout = useMemo(() => layeredLayout(nodes, edges), [nodes, edges]);

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [view, setView] = useState({ x: 40, y: 20, k: 1 });
  const svgRef = useRef(null);
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  const fitScaleRef = useRef(1);

  const lin = useMemo(() => (selected ? lineage(selected, edges) : null), [selected, edges]);
  const hlSet = useMemo(
    () => (lin ? new Set([...lin.self, ...lin.upstream, ...lin.downstream]) : null),
    [lin]
  );

  const fit = () => {
    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const k = Math.min((rect.width - 24) / layout.width, (rect.height - 24) / layout.height, 1);
    fitScaleRef.current = k;
    setView({ x: Math.max(8, (rect.width - layout.width * k) / 2), y: 12, k });
  };

  useEffect(() => {
    const raf = requestAnimationFrame(fit);
    return () => cancelAnimationFrame(raf);
  }, [layout]);

  // 容器尺寸变化（如全屏切换）时自动重新适配
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  const onWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    setView((v) => {
      const next = Math.min(3, Math.max(0.8 * fitScaleRef.current, v.k * factor));
      const rect = svgRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      return { k: next, x: mx - (mx - v.x) * (next / v.k), y: my - (my - v.y) * (next / v.k) };
    });
  };

  const onPointerMove = useCallback((e) => {
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
      movedRef.current = dragRef.current.moved;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
      dragRef.current = null;
    }
  }, [onPointerMove]);

  const onPointerDown = useCallback(
    (e) => {
      if (e.button === 0) {
        dragRef.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("blur", onPointerUp);
      }
    },
    [view.x, view.y, onPointerMove, onPointerUp]
  );

  const onClickCanvas = (e) => {
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
      if (roleFilter === "calc" && !f.isCalc) return false;
      if (roleFilter === "dimension" && f.role !== "dimension") return false;
      if (roleFilter === "measure" && f.role !== "measure") return false;
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

  const edgeClass = (e) => {
    if (lin) return hlSet.has(e.from) && hlSet.has(e.to) ? "ln-edge-hl" : "ln-edge-dim";
    if (searchHits) return searchHits.has(e.from) && searchHits.has(e.to) ? "ln-edge-hl" : "ln-edge-dim";
    return "";
  };

  const nodeClass = (n) => {
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
        <div className="picker-head">字段选择器</div>
        <input
          className="ft-search"
          placeholder="搜索字段并高亮…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="role-tabs">
          {ROLE_TABS.map(([key, label]) => (
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
              title={f.name}
            >
              {f.label}
            </button>
          ))}
          {filteredFields.length === 0 && <p className="muted">无匹配字段。</p>}
        </div>
      </aside>

      <section className="lineage-canvas">
        <div className="lineage-toolbar">
          <div className="legend">
            {Object.entries(KIND_STYLE).map(([k, s]) => (
              <span key={k} className="lg">
                <i style={{ background: s.fill, borderColor: s.stroke }} />
                {s.tag}
              </span>
            ))}
            <span className="lg-note">箭头方向：上游（左）→ 下游（右）</span>
          </div>
          <div className="toolbar-actions">
            <button onClick={fit}>适配窗口</button>
            <button onClick={() => setSelected(null)}>清除高亮</button>
          </div>
        </div>
        <svg
          ref={svgRef}
          className="lineage-svg"
          onWheel={onWheel}
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
                  {lane.label}
                  {lane.subCols > 1 ? `（${lane.subCols} 列）` : ""}
                </text>
              </g>
            ))}
            {edges.map((e, i) => {
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
            {nodes.map((n) => {
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
          <div className="detail-empty">选择一个字段 / 数据源，查看其上下游引用关系。</div>
        )}
        {selectedNode && (
          <div className="detail-body">
            <div className="detail-head">{selectedNode.label}</div>
            <div className="detail-meta">
              <span className={`pill cat-${nodeCategory(selectedNode)}`}>
                {KIND_STYLE[nodeCategory(selectedNode)].tag}
              </span>
              {selectedNode.kind === "field" && (
                <span className="pill">
                  {selectedNode.role === "dimension"
                    ? "维度"
                    : selectedNode.role === "measure"
                      ? "度量"
                      : "字段"}
                </span>
              )}
            </div>
            {selectedNode.kind === "field" && (
              <div className="detail-internal" title={selectedNode.name}>
                内部名：{selectedNode.name}
              </div>
            )}
            {selectedNode.formulaRaw && (
              <div className="detail-formula">
                <div className="df-title">计算字段公式</div>
                <pre className="calc-formula">
                  <FormulaCode formula={selectedNode.formula || selectedNode.formulaRaw} />
                </pre>
              </div>
            )}
            <div className="detail-counts">
              <div className="dc up">
                <span className="dc-num">{upCount}</span>
                <span className="dc-lbl">上游（输入）</span>
              </div>
              <div className="dc down">
                <span className="dc-num">{downCount}</span>
                <span className="dc-lbl">下游（依赖）</span>
              </div>
            </div>
            {lin && upCount > 0 && (
              <div className="detail-list">
                <div className="dl-title ln-up">上游输入</div>
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
                <div className="dl-title ln-down">下游依赖</div>
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

// ---- 应用根 ----

function App({ fullscreen = false, onToggleFullscreen }) {
  // 初始化时优先恢复上次解析结果（关闭设置弹窗 / 刷新页面后仍在）
  const initial = useRef(loadPersisted()).current;
  const [model, setModel] = useState(initial?.model ?? null);
  const [dashIdx, setDashIdx] = useState(initial?.dashIdx ?? 0);
  const [view, setView] = useState(initial?.view ?? "layout");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState(initial?.fileName ?? "");

  // 模型 / 视图变化时写入缓存
  useEffect(() => {
    persistState({ model, dashIdx, view, fileName });
  }, [model, dashIdx, view, fileName]);

  const onText = (text, name) => {
    setError("");
    try {
      const parsed = parseWorkbook(text);
      setModel(parsed);
      setDashIdx(0);
      setFileName(name || "");
    } catch (err) {
      setModel(null);
      setError(err.message || "解析失败");
    }
  };

  const stats = useMemo(() => (model ? summarize(model) : null), [model]);
  const dashboards = model?.dashboards || [];
  const dashboard = dashboards[dashIdx] || null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>Tableau .twb 仪表板布局检视器</h1>
          <p className="sub">
            1:1 SVG 布局图 · 一键导出 Excalidraw · 数据源/字段/计算字段 metadata · 字段引用关系
          </p>
        </div>
        <div className="header-actions">
          <div className="view-tabs">
            <button className={view === "layout" ? "vt active" : "vt"} onClick={() => setView("layout")}>
              布局图
            </button>
            <button className={view === "lineage" ? "vt active" : "vt"} onClick={() => setView("lineage")}>
              引用关系
            </button>
          </div>
          <Uploader onText={onText} onError={setError} />
          {onToggleFullscreen && (
            <button
              className="fs-toggle"
              onClick={onToggleFullscreen}
              title={fullscreen ? "退出全屏 (Esc)" : "全屏模式，铺满窗口查看关系图"}
            >
              {fullscreen ? "✕ 退出全屏" : "⛶ 全屏"}
            </button>
          )}
        </div>
      </header>

      {error && <div className="error-banner">⚠ {error}</div>}

      {!model && (
        <div className="welcome">
          <div className="welcome-card">
            <h2>开始使用</h2>
            <p>上传一个 Tableau 工作簿（.twb）文件，即可：</p>
            <ul>
              <li>
                按 <b>1:1 真实比例</b> 用 SVG 绘制仪表板布局，支持缩放 / 平移；
              </li>
              <li>
                一键导出 <b>SVG / PNG / .excalidraw</b>，方便在 Excalidraw 里手绘批注；
              </li>
              <li>
                查看 <b>数据源、字段、计算字段公式</b> 等 metadata，便于对客户讲解口径。
              </li>
            </ul>
            <p className="muted">没有文件？点上方「载入示例」立即体验。</p>
          </div>
        </div>
      )}

      {model && (
        <div className="summary-bar">
          {fileName && <span className="sf">{fileName}</span>}
          <span>
            仪表板 <b>{stats.dashboards}</b>
          </span>
          <span>
            工作表 <b>{stats.worksheets}</b>
          </span>
          <span>
            数据源 <b>{stats.datasources}</b>
          </span>
          <span>
            字段 <b>{stats.fields}</b>
          </span>
          <span>
            计算字段 <b>{stats.calculations}</b>
          </span>
          {dashboards.length > 1 && (
            <select className="dash-select" value={dashIdx} onChange={(e) => setDashIdx(+e.target.value)}>
              {dashboards.map((d, i) => (
                <option key={i} value={i}>
                  {d.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {model && view === "layout" && (
        <div className="main">
          <section className="left">
            <DashboardView dashboard={dashboard} />
          </section>
          <aside className="right">
            <MetaPanel model={model} />
          </aside>
        </div>
      )}

      {model && view === "lineage" && <LineageView model={model} />}
    </div>
  );
}

// ---- 插件入口（挂到设置页，支持全屏铺满窗口）----

function TwbViewerSection() {
  const [fullscreen, setFullscreen] = useState(false);

  // Esc 退出全屏
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const toggle = () => setFullscreen((v) => !v);

  // 纯 CSS 全屏：切换只改 className，组件树不变 -> 已解析文件 / 视图 / 缩放平移
  // 状态全部保留。设置弹窗无 transform 祖先，position:fixed 即可铺满视口。
  return (
    <div className={`twb-root${fullscreen ? " twb-fullscreen" : ""}`}>
      <App fullscreen={fullscreen} onToggleFullscreen={toggle} />
    </div>
  );
}

/** 客户端服务依赖：slots（槽位注册）。 */
export const inject = ["slots"];

/** 客户端插件体：在设置页注册「TWb 检视器」分区。 */
export function apply(ctx) {
  ctx.slots.inject("settings.section", () =>
    ctx.slots.register(
      {
        name: "settings.section",
        id: "twb-viewer",
        order: 16,
        label: () => "TWb 检视器"
      },
      TwbViewerSection
    )
  );
}
