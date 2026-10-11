// 仪表板布局：1:1 SVG 渲染 + 缩放 / 平移 + 导出 SVG / PNG / Excalidraw。

import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkbookDashboard, Zone } from "../types.ts";
import { SVG_NS, downloadBlob, excalidrawJson } from "../lib/exporters.ts";
import { useT } from "../i18n.tsx";

/** 单个 zone 的 SVG 渲染（递归）。 */
function ZoneNode({ z, depth }: { z: Zone; depth: number }) {
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
/** 仪表板视图 props。 */
export interface DashboardViewProps {
  dashboard: WorkbookDashboard | null | undefined;
}

export function DashboardView({ dashboard }: DashboardViewProps) {
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
