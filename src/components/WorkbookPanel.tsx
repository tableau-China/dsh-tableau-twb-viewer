// 布局图右侧面板：只放「仪表板列表」与「工作表列表」。
//
// 交付场景下，展开布局图时最需要的是「这个工作簿有哪些仪表板 / 工作表，
// 我现在在看哪一个」。数据源、字段、公式、参数、自定义 SQL 分别在看板上
// 更合适的位置呈现（数据模型视图 / 引用关系图），不在这里堆页签。

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
}

export function WorkbookPanel({ model, dashIdx, onSelectDashboard }: WorkbookPanelProps) {
  const t = useT();

  /** 每张工作表出现在哪些仪表板里（用于列表标注与跳转）。 */
  const sheetUsage = useMemo(() => {
    const map = new Map<string, number[]>();
    model.dashboards.forEach((d, i) => {
      for (const z of flatZones(d.zones)) {
        if (z.kind === "worksheet" && z.name) {
          if (!map.has(z.name)) map.set(z.name, []);
          const arr = map.get(z.name) as number[];
          if (!arr.includes(i)) arr.push(i);
        }
      }
    });
    return map;
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
                  <span className="wb-item-meta">
                    {Math.round(d.width)} × {Math.round(d.height)}
                    {" · "}
                    {t("wbSheetsInDash", { count: sheets })}
                  </span>
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
          <span className="wb-count">{model.worksheets.length}</span>
        </h3>
        <ul className="wb-list">
          {model.worksheets.map((name) => {
            const usedIn = sheetUsage.get(name) ?? [];
            const inCurrent = usedIn.includes(dashIdx);
            return (
              <li key={name}>
                <button
                  className={`wb-item wb-sheet${inCurrent ? " in-current" : ""}`}
                  onClick={() => {
                    // 点击工作表：跳到第一个用到它的仪表板（已在当前仪表板则不动）
                    if (!inCurrent && usedIn.length) onSelectDashboard(usedIn[0]);
                  }}
                  title={usedIn.length ? t("wbUsedIn", { count: usedIn.length }) : t("wbUnused")}
                >
                  <span className="wb-item-name">{name}</span>
                  {usedIn.length > 0 && <span className="wb-badge">{usedIn.length}</span>}
                </button>
              </li>
            );
          })}
          {model.worksheets.length === 0 && <li className="wb-empty">{t("wbNoWorksheets")}</li>}
        </ul>
      </section>
    </div>
  );
}
