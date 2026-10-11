// 导出与下载：Blob 下载、zone 树展平、Excalidraw JSON 生成。

import type { Zone } from "../types.ts";

export const SVG_NS = "http://www.w3.org/2000/svg";

/** 触发浏览器下载（Blob 或文本）。 */
export function downloadBlob(filename: string, blobOrText: Blob | string, mime?: string): void {
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
export function flattenZones(zones: Zone[]): Zone[] {
  const out: Zone[] = [];
  for (const z of zones) {
    out.push(z);
    if (z.children && z.children.length) out.push(...flattenZones(z.children));
  }
  return out;
}

const rand = () => Math.floor(Math.random() * 1e5);

/** 把 zone 树导出为 Excalidraw JSON（可拖入 excalidraw.com 继续编辑）。 */
export function excalidrawJson(zones: Zone[]): string {
  const flat = flattenZones(zones);
  const elements: Record<string, unknown>[] = [];
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
