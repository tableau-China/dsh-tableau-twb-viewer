// 字段引用关系图：把工作簿模型转化为「节点 + 边」的依赖图，并计算分层布局。
//
// 忠实移植自原始实现的 Cp（构图）、Mc/jp/_p/Lp（可达性）与 Pp（分层布局）。

import { stripBrackets } from "./parser.js";

// ---- 布局常量（与原始实现一致）----
export const NODE_W = 176; // 节点宽
export const NODE_H = 48; // 节点高
export const LAYER_GAP = 128; // 层间距
export const COL_GAP = 60; // 同层子列间距
export const ROW_GAP = 14; // 同列行间距
export const HEADER_H = 44; // 层标签区高度
export const DS_OFFSET = 24; // 左侧留白
export const PER_COL = 20; // 每子列最多节点数

/** 节点类别对应的视觉样式与图例文案。 */
export const KIND_STYLE = {
  datasource: { fill: "#e7f5ff", stroke: "#1971c2", tag: "数据源" },
  dimension: { fill: "#ffe8cc", stroke: "#f08c00", tag: "维度" },
  measure: { fill: "#d3f9d8", stroke: "#2f9e44", tag: "度量" },
  calc: { fill: "#f3e8ff", stroke: "#7048e8", tag: "计算字段" },
  unknown: { fill: "#f1f3f5", stroke: "#ced4da", tag: "未知" }
};

/** 节点 -> 类别键（datasource / dimension / measure / calc / unknown）。 */
export function nodeCategory(node) {
  if (node.kind === "datasource") return "datasource";
  if (node.kind === "unknown") return "unknown";
  if (node.isCalc) return "calc";
  return node.role === "dimension" ? "dimension" : "measure";
}

/** 从公式中提取所有 [字段引用]。 */
function formulaRefs(formula) {
  if (!formula) return [];
  const out = [];
  const re = /\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(formula))) out.push(m[1]);
  return out;
}

/**
 * 构建字段引用图。
 * 节点 id 规则：数据源 "ds:<idx>"、字段 "f:<dsIdx>:<内部名>"、未知引用 "u:<dsIdx>:<名>"。
 * 边：数据源 -> 原始字段；计算字段 -> 其公式引用的字段（未解析的引用指向 unknown 节点）。
 * @returns {{ nodes: object[], edges: {from,to}[], dsNodes: string[] }}
 */
export function buildGraph(model) {
  const nodes = [];
  const edges = [];
  const dsNodes = [];
  const byName = new Map(); // "dsIdx|内部名" -> 节点 id
  const byCaption = new Map(); // "dsIdx|caption" -> 节点 id

  model.datasources.forEach((ds, dsIdx) => {
    const dsId = "ds:" + dsIdx;
    nodes.push({
      id: dsId,
      kind: "datasource",
      label: ds.caption || ds.name || "数据源 " + (dsIdx + 1),
      name: ds.name,
      dsIdx
    });
    dsNodes.push(dsId);

    // 第一遍：本数据源的全部字段节点 + 数据源 -> 原始字段 边
    for (const col of ds.columns) {
      const id = "f:" + dsIdx + ":" + stripBrackets(col.name);
      const isCalc = !!col.formulaRaw;
      nodes.push({
        id,
        kind: "field",
        label: col.label,
        caption: col.caption,
        name: col.name,
        role: col.role,
        isCalc,
        dsIdx,
        formula: col.formula,
        formulaRaw: col.formulaRaw
      });
      byName.set(dsIdx + "|" + stripBrackets(col.name), id);
      if (col.caption) byCaption.set(dsIdx + "|" + col.caption, id);
      if (!isCalc) edges.push({ from: dsId, to: id });
    }

    // 第二遍：本数据源计算字段 -> 公式引用的字段（未解析的引用指向 unknown 节点）
    for (const col of ds.columns) {
      if (!col.formulaRaw) continue;
      const id = "f:" + dsIdx + ":" + stripBrackets(col.name);
      const seen = new Set();
      for (const ref of formulaRefs(col.formulaRaw)) {
        const key = stripBrackets(ref);
        let target = byName.get(dsIdx + "|" + key);
        if (!target) {
          for (const [k, v] of byName) {
            if (k.endsWith("|" + key)) {
              target = v;
              break;
            }
          }
        }
        if (!target) {
          let byCap = byCaption.get(dsIdx + "|" + ref);
          if (!byCap) {
            for (const [k, v] of byCaption) {
              if (k.endsWith("|" + ref)) {
                byCap = v;
                break;
              }
            }
          }
          target = byCap;
        }
        if (target && target !== id && !seen.has(target)) {
          seen.add(target);
          edges.push({ from: id, to: target });
        } else if (!target && !seen.has(ref)) {
          seen.add(ref);
          const unknownId = "u:" + dsIdx + ":" + key;
          if (!nodes.find((n) => n.id === unknownId)) {
            nodes.push({ id: unknownId, kind: "unknown", label: ref, name: ref, dsIdx });
          }
          edges.push({ from: id, to: unknownId });
        }
      }
    }
  });

  return { nodes, edges, dsNodes };
}

// ---- 可达性 ----

/** 邻接表（出边 / 入边）。 */
export function adjacency(edges) {
  const out = new Map();
  const inc = new Map();
  for (const e of edges) {
    if (!out.has(e.from)) out.set(e.from, []);
    out.get(e.from).push(e.to);
    if (!inc.has(e.to)) inc.set(e.to, []);
    inc.get(e.to).push(e.from);
  }
  return { out, inc };
}

/** 从 id 出发沿出边走，返回可达节点集合（不含自身）。 */
export function upstream(id, edges) {
  const { out } = adjacency(edges);
  const seen = new Set();
  const stack = [...(out.get(id) || [])];
  while (stack.length) {
    const cur = stack.pop();
    if (!seen.has(cur)) {
      seen.add(cur);
      for (const next of out.get(cur) || []) stack.push(next);
    }
  }
  return seen;
}

/** 沿入边反向可达集合（不含自身）。 */
export function downstream(id, edges) {
  const { inc } = adjacency(edges);
  const seen = new Set();
  const stack = [...(inc.get(id) || [])];
  while (stack.length) {
    const cur = stack.pop();
    if (!seen.has(cur)) {
      seen.add(cur);
      for (const next of inc.get(cur) || []) stack.push(next);
    }
  }
  return seen;
}

/** 一个节点的完整血缘：自身 / 上游输入 / 下游依赖。 */
export function lineage(id, edges) {
  return { self: new Set([id]), upstream: upstream(id, edges), downstream: downstream(id, edges) };
}

// ---- 分层布局 ----

/**
 * 按依赖深度分层（数据源=0，原始字段=1，计算字段=其引用深度+1），
 * 同层按子列打包，返回每个节点的像素坐标与层（lane）信息。
 * @returns {{ pos: Record<string,{x,y}>, lanes: object[], width: number, height: number }}
 */
export function layeredLayout(nodes, edges) {
  // 直接依赖表（跳过 数据源->字段 边，深度只看计算字段之间的引用）
  const childrenOf = new Map();
  nodes.forEach((n) => childrenOf.set(n.id, new Set()));
  edges.forEach((e) => {
    if (e.from.startsWith("ds:")) return;
    if (childrenOf.has(e.from)) childrenOf.get(e.from).add(e.to);
  });

  const depth = new Map();
  const visiting = new Set();
  const depthOf = (id) => {
    if (depth.has(id)) return depth.get(id);
    if (visiting.has(id)) return 1; // 环保护
    visiting.add(id);
    const kids = childrenOf.get(id);
    let d = 0;
    if (kids && kids.size) {
      for (const k of kids) d = Math.max(d, depthOf(k));
      d += 1;
    } else {
      const node = nodes.find((n) => n.id === id);
      d = node && node.kind === "datasource" ? 0 : 1;
    }
    visiting.delete(id);
    depth.set(id, d);
    return d;
  };
  nodes.forEach((n) => depthOf(n.id));

  const byLayer = new Map();
  nodes.forEach((n) => {
    const d = depth.get(n.id);
    if (!byLayer.has(d)) byLayer.set(d, []);
    byLayer.get(d).push(n);
  });
  // 第 1 层（原始字段）：维度在前、度量在后
  byLayer.forEach((arr, d) => {
    if (d === 1) {
      arr.sort((a, b) => {
        const ac = a.role === "dimension" ? 0 : 1;
        const bc = b.role === "dimension" ? 0 : 1;
        return ac - bc;
      });
    }
  });

  const pos = {};
  const lanes = [];
  let cursorX = DS_OFFSET;
  let maxLaneH = 0;
  const laneRows = [];

  [...byLayer.keys()].sort((a, b) => a - b).forEach((d) => {
    const arr = byLayer.get(d);
    const count = arr.length;
    const subCols = count > PER_COL ? Math.ceil(count / PER_COL) : 1;
    const perCol = Math.ceil(count / subCols);
    const colHeights = [];
    for (let i = 0; i < subCols; i++) {
      const n = Math.min(count, (i + 1) * perCol) - i * perCol;
      colHeights.push(n * NODE_H + (n - 1) * ROW_GAP);
    }
    const laneH = Math.max(0, ...colHeights);
    laneRows.push({ layer: d, arr, subCols, perCol, laneH });
    maxLaneH = Math.max(maxLaneH, laneH);
  });

  laneRows.forEach(({ layer, arr, subCols, perCol, laneH }) => {
    const top = HEADER_H + Math.max(0, (maxLaneH - laneH) / 2);
    const laneW = subCols * NODE_W + (subCols - 1) * COL_GAP;
    arr.forEach((node, i) => {
      const col = Math.floor(i / perCol);
      const row = i % perCol;
      pos[node.id] = {
        x: cursorX + col * (NODE_W + COL_GAP),
        y: top + row * (NODE_H + ROW_GAP)
      };
    });
    lanes.push({
      layer,
      x: cursorX,
      right: cursorX + laneW,
      width: laneW,
      count: arr.length,
      subCols,
      label:
        layer === 0
          ? "数据源"
          : layer === 1
            ? "原始字段（维度↑ / 度量↓）"
            : `计算字段 · 层级 ${layer - 1}`
    });
    cursorX += laneW + LAYER_GAP;
  });

  lanes.sort((a, b) => a.layer - b.layer);
  const width = Math.max(0, cursorX - LAYER_GAP) + DS_OFFSET;
  const height = HEADER_H + maxLaneH + 48;
  return { pos, lanes, width, height };
}
