// 仪表板布局：1:1 SVG 渲染 + 缩放 / 平移 + 导出 SVG / PNG / Excalidraw。

import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkbookDashboard, Zone, ZoneShape } from "../types.ts";
import { SVG_NS, downloadBlob, excalidrawJson } from "../lib/exporters.ts";
import { useT, type Translator } from "../i18n.tsx";

/** zone 细分类型的视觉样式（与图例共用同一张表）。 */
export const ZONE_STYLE: Record<ZoneShape, { fill: string; stroke: string; dash?: string }> = {
  worksheet: { fill: "#dbeafe", stroke: "#3b82f6" },
  text: { fill: "#ffffff", stroke: "#94a3b8" },
  flow: { fill: "#f1f5f9", stroke: "#cbd5e1", dash: "5 4" },
  vertical: { fill: "#f5f3ff", stroke: "#c4b5fd", dash: "5 4" },
  horizontal: { fill: "#eff6ff", stroke: "#bfdbfe", dash: "5 4" },
  basic: { fill: "#f8fafc", stroke: "#cbd5e1" },
  card: { fill: "#fef9c3", stroke: "#facc15" },
  image: { fill: "#ecfdf5", stroke: "#6ee7b7" },
  empty: { fill: "none", stroke: "#e2e8f0", dash: "3 3" },
  other: { fill: "#f8fafc", stroke: "#cbd5e1" }
};

/** 图例文案键（与 ZONE_STYLE 一一对应）。 */
const ZONE_LEGEND_KEY: Record<string, string> = {
  worksheet: "zoneWorksheet",
  flow: "zoneFlow",
  basic: "zoneBasic",
  card: "zoneCard",
  text: "zoneText",
  empty: "zoneEmpty"
};

/** 单个 zone 的 SVG 渲染（递归）。 */
function ZoneNode({
  z,
  depth,
  t,
  highlightName,
  highlight
}: {
  z: Zone;
  depth: number;
  t: Translator;
  /** 需要高亮的工作表名（null = 不高亮）。 */
  highlightName: string | null;
  /** 该 zone 是否为右栏选中的工作表（选中时描边加粗）。 */
  highlight?: boolean;
}) {
  const isWs = z.kind === "worksheet";
  const isText = z.kind === "text";
  const style = ZONE_STYLE[z.shape] ?? ZONE_STYLE.other;
  const dash = style.dash ?? "";
  const fontSize = isWs ? Math.max(9, Math.min(15, z.h * 0.16)) : 13;

  // 交付场景：hover 即可看到类型、尺寸与内边距
  const tip = [
    z.name || z.type || t("zoneBasic"),
    `${Math.round(z.w)} × ${Math.round(z.h)}`,
    z.format.padding !== null ? t("zonePadding", { value: z.format.padding }) : null,
    z.format.margin !== null ? t("zoneMargin", { value: z.format.margin }) : null,
    z.format.background ? `${t("zoneColor")} ${z.format.background}` : null
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <g>
      <title>{tip}</title>
      <rect
        x={z.x}
        y={z.y}
        width={Math.max(1, z.w)}
        height={Math.max(1, z.h)}
        fill={style.fill}
        stroke={highlight ? "#1d4ed8" : style.stroke}
        strokeWidth={highlight ? 3 : 1}
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
        z.children.map((kid, i) => (
          <ZoneNode
            key={i}
            z={kid}
            depth={depth + 1}
            t={t}
            highlightName={highlightName}
            highlight={highlightName !== null && kid.kind === "worksheet" && kid.name === highlightName}
          />
        ))}
    </g>
  );
}

/** 仪表板视图：1:1 布局 + 缩放/平移 + 导出。 */
/** 仪表板视图 props。 */
export interface DashboardViewProps {
  dashboard: WorkbookDashboard | null | undefined;
  /** 右栏选中的工作表：对应 zone 描边加粗（null = 不高亮）。 */
  highlightSheet?: string | null;
}

export function DashboardView({ dashboard, highlightSheet = null }: DashboardViewProps) {
  const t = useT();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const zonesRef = useRef<SVGGElement | null>(null);
  const [zoom, setZoom] = useState(0.2);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const dragRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
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

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
    const next = Math.min(4, Math.max(0.02, zoom * factor));
    const ratio = next / zoom;
    setPanX(mx - (mx - panX) * ratio);
    setPanY(my - (my - panY) * ratio);
    setZoom(next);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY, tx: panX, ty: panY };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const bg = document.createElementNS(SVG_NS, "rect");
    bg.setAttribute("x", "0");
    bg.setAttribute("y", "0");
    bg.setAttribute("width", String(width));
    bg.setAttribute("height", String(height));
    bg.setAttribute("fill", "#ffffff");
    svg.appendChild(bg);
    if (zonesRef.current) svg.appendChild(zonesRef.current.cloneNode(true));
    return `<?xml version="1.0" encoding="UTF-8"?>\n` + new XMLSerializer().serializeToString(svg);
  };

  const baseName = dashboard?.name || "dashboard";

  const exportSvg = () =>
    downloadBlob(`${baseName}.svg`, buildSvgString(), "image/svg+xml");

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
      if (!c2d) return;
      c2d.fillStyle = "#fff";
      c2d.fillRect(0, 0, canvas.width, canvas.height);
      c2d.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (png) => { if (png) downloadBlob(`${baseName}.png`, png, "image/png"); },
        "image/png"
      );
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  const exportExcalidraw = () => {
    if (!dashboard) return;
    downloadBlob(`${baseName}.excalidraw`, excalidrawJson(dashboard.zones), "application/json");
  };

  if (!dashboard) {
    return <div className="canvas-empty">{t("noDashboard")}</div>;
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
          <button onClick={() => setZoom((z) => Math.min(4, z * 1.15))}>{t("zoomIn")}</button>
          <button onClick={() => setZoom((z) => Math.max(0.02, z / 1.15))}>{t("zoomOut")}</button>
          <button onClick={fit}>{t("fit")}</button>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
          <span className="tb-sep" />
          <button onClick={exportSvg}>{t("exportSvg")}</button>
          <button onClick={exportPng}>{t("exportPng")}</button>
          <button className="primary" onClick={exportExcalidraw}>
            {t("exportExcalidraw")}
          </button>
        </div>
      </div>
      <div className="zone-legend">
        <span className="zl-title">{t("zoneLegendTitle")}</span>
        {(["worksheet", "flow", "basic", "card", "text", "empty"] as ZoneShape[]).map((shape) => (
          <span key={shape} className="zl-item">
            <span
              className="zl-swatch"
              style={{
                background: ZONE_STYLE[shape].fill === "none" ? "transparent" : ZONE_STYLE[shape].fill,
                borderColor: ZONE_STYLE[shape].stroke,
                borderStyle: ZONE_STYLE[shape].dash ? "dashed" : "solid"
              }}
            />
            {t(ZONE_LEGEND_KEY[shape])}
          </span>
        ))}
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
              <ZoneNode
                key={i}
                z={z}
                depth={0}
                t={t}
                highlightName={highlightSheet ?? null}
                highlight={highlightSheet !== null && z.kind === "worksheet" && z.name === highlightSheet}
              />
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
