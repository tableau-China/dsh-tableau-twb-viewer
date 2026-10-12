// 布局图右侧面板：仪表板列表 + 当前仪表板的工作表列表。
//
// 交付场景下，展开布局图时最需要的是「有哪些仪表板 / 这张仪表板用了哪些工作表」。
// 点击工作表会在左侧布局图上高亮对应的 zone；数据源、字段、公式、参数、自定义 SQL
// 分别在看板上更合适的位置呈现（数据模型视图 / 引用关系图），不在这里堆页签。

import { useMemo } from "react";
import type { WorkbookModel, Zone } from "../types.ts";
import { useT } from "../i18n.tsx";

/** 展平 zone 树。 */
function flatZones(zones: Zone[]): Zone[] {
  return zones.flatMap((z) => [z, ...flatZones(z.children)]);
}

/** 工作簿右侧面板 props。 */
export interface WorkbookPanelProps {
  model: WorkbookModel;
  /** 当前仪表板下标。 */
  dashIdx: number;
  /** 切换仪表板。 */
  onSelectDashboard: (idx: number) => void;
  /** 当前在布局图上高亮的工作表（null = 未高亮）。 */
  highlightSheet: string | null;
  /** 切换工作表高亮。 */
  onHighlightSheet: (name: string | null) => void;
}

export function WorkbookPanel({
  model,
  dashIdx,
  onSelectDashboard,
  highlightSheet,
  onHighlightSheet
}: WorkbookPanelProps) {
  const t = useT();
  const dashboard = model.dashboards[dashIdx] ?? null;

  /** 当前仪表板里的工作表（按 zone 出现顺序去重）。 */
  const sheetsInDashboard = useMemo(() => {
    if (!dashboard) return [];
    const seen = new Set<string>();
    const out: string[] = [];
    for (const z of flatZones(dashboard.zones)) {
      if (z.kind === "worksheet" && z.name && !seen.has(z.name)) {
        seen.add(z.name);
        out.push(z.name);
      }
    }
    return out;
  }, [dashboard]);

  /** 工作簿里未被任何仪表板使用的工作表数量（仅作提示，不占列表）。 */
  const unusedCount = useMemo(() => {
    const used = new Set<string>();
    for (const d of model.dashboards) {
      for (const z of flatZones(d.zones)) if (z.kind === "worksheet" && z.name) used.add(z.name);
    }
    return model.worksheets.filter((w) => !used.has(w)).length;
  }, [model]);

  return (
    <div className="wb-panel">
      <section className="wb-section">
        <h3 className="wb-section-title">
          {t("wbDashboards")}
          <span className="wb-count">{model.dashboards.length}</span>
        </h3>
        <ul className="wb-list">
          {model.dashboards.map((d, i) => {
            const zones = flatZones(d.zones);
            const sheets = zones.filter((z) => z.kind === "worksheet").length;
            return (
              <li key={i}>
                <button
                  className={`wb-item${i === dashIdx ? " active" : ""}`}
                  onClick={() => onSelectDashboard(i)}
                  title={d.name}
                >
                  <span className="wb-item-name">{d.name}</span>
                  <span className="wb-item-meta">{t("wbSheetsInDash", { count: sheets })}</span>
                </button>
              </li>
            );
          })}
          {model.dashboards.length === 0 && <li className="wb-empty">{t("wbNoDashboards")}</li>}
        </ul>
      </section>

      <section className="wb-section">
        <h3 className="wb-section-title">
          {t("wbWorksheets")}
          <span className="wb-count">{sheetsInDashboard.length}</span>
        </h3>
        <ul className="wb-list">
          {sheetsInDashboard.map((name) => (
            <li key={name}>
              <button
                className={`wb-item wb-sheet${highlightSheet === name ? " highlight" : ""}`}
                onClick={() => onHighlightSheet(highlightSheet === name ? null : name)}
                title={t("wbHighlightHint")}
              >
                <span className="wb-item-name">{name}</span>
              </button>
            </li>
          ))}
          {sheetsInDashboard.length === 0 && <li className="wb-empty">{t("wbNoSheetsInDash")}</li>}
        </ul>
        {unusedCount > 0 && <p className="wb-note">{t("wbUnusedNote", { count: unusedCount })}</p>}
      </section>
    </div>
  );
}
