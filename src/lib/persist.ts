// 解析结果持久化：内存缓存 + sessionStorage 双保险。
//
// 主区面板切走（切到会话）或浏览器刷新后，重新打开检视器时直接恢复上次
// 解析的文件与视图，无需重新上传。写入前做形状校验，损坏/旧版本的缓存会被丢弃。

import type { WorkbookModel } from "../types.ts";

/** 检视器可持久化的状态。 */
export interface ViewerState {
  model: WorkbookModel | null;
  dashIdx: number;
  /** 当前视图：布局图 / 引用关系。 */
  view: "layout" | "lineage" | "data";
  fileName: string;
}

const CACHE_KEY = "dsh-tableau-twb-viewer.state.v1";
let memoryCache: ViewerState | null = null;

/** 内置示例路由（与 Node 半部 index.js 的 SAMPLE_PATH 保持一致）。 */
export const SAMPLE_URL = "/twb-viewer/sample.twb";

/** 模型形状校验：旧版本 / 损坏的缓存直接丢弃，避免面板白屏。 */
function isValidModel(model: unknown): model is WorkbookModel {
  if (model === null || typeof model !== "object") return false;
  const candidate = model as Partial<WorkbookModel>;
  if (
    !Array.isArray(candidate.dashboards) ||
    !Array.isArray(candidate.worksheets) ||
    !Array.isArray(candidate.datasources)
  ) {
    return false;
  }
  return candidate.datasources.every(
    (ds) => typeof ds === "object" && ds !== null && Array.isArray((ds as { columns?: unknown }).columns)
  );
}

/** 读取持久化状态；形状不合法时返回 null（视为无缓存）。 */
export function loadPersisted(): ViewerState | null {
  if (memoryCache) return memoryCache;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ViewerState> & { model?: unknown };
    if (!parsed || typeof parsed !== "object") return null;
    if (!("model" in parsed) || !isValidModel(parsed.model ?? null)) return null;
    if (parsed.view !== "layout" && parsed.view !== "lineage" && parsed.view !== "data") return null;
    if (!Number.isInteger(parsed.dashIdx) || (parsed.dashIdx as number) < 0) return null;
    memoryCache = parsed as ViewerState;
  } catch {
    /* sessionStorage 不可用 / JSON 损坏时视为无缓存 */
  }
  return memoryCache;
}

/** 写入持久化状态（配额不足时仅保留内存缓存）。 */
export function persistState(state: ViewerState): void {
  memoryCache = state;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(state));
  } catch {
    /* 大文件超出配额时仅保留内存缓存 */
  }
}
