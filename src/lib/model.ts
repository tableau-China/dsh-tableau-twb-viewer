// 模型派生数据：概要统计与节点标签折行。

import type { WorkbookModel, WorkbookStats } from "../types.ts";

export function summarize(model: WorkbookModel): WorkbookStats {
  return {
    dashboards: model.dashboards.length,
    worksheets: model.worksheets.length,
    datasources: model.datasources.length,
    fields: model.datasources.reduce((sum, ds) => sum + ds.columns.length, 0),
    calculations: model.datasources.reduce((sum, ds) => sum + ds.columns.filter((c) => c.formula).length, 0)
  };
}

/** 节点标签折行（每 10 字符一行，最多 3 行后省略）。 */
export function wrapLabel(text: string | null | undefined, per = 10): string[] {
  if (!text) return [""];
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += per) chunks.push(text.slice(i, i + per));
  if (chunks.length <= 3) return chunks;
  const head = chunks.slice(0, 2).join("");
  const tail = chunks.slice(2).join("").slice(0, per - 1) + "…";
  return [head.slice(0, per), head.slice(per, per * 2), tail];
}
