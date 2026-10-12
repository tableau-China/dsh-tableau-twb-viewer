// Metadata 面板：数据源总览 / 字段 / 计算字段 / 工作表。

import { useState } from "react";
import type { WorkbookConnection, WorkbookModel } from "../types.ts";
import { useT, type Translator } from "../i18n.tsx";
import { FieldsTable } from "./FieldsTable.tsx";
import { FormulaCode } from "./FormulaCode.tsx";

/** 数据源连接信息 chip。 */
function ConnectionChip({ c }: { c: WorkbookConnection | null }) {
  const t = useT();
  if (!c) return <span className="muted">{t("noConnection")}</span>;
  const parts = [c.class, c.type, c.server, c.dbname, c.filename].filter(Boolean);
  return <span>{parts.join(" · ") || t("noConnection")}</span>;
}

/** Metadata 面板 props。 */
export interface MetaPanelProps {
  model: WorkbookModel;
}

/** 面板页签（文案取自字典）。 */
function metaTabs(t: Translator): Array<[string, string]> {
  return [
    ["overview", t("tabOverview")],
    ["fields", t("tabFields")],
    ["calc", t("tabCalcs")],
    ["sheets", t("tabWorksheets")],
    ["sql", t("tabCustomSql")]
  ];
}

export function MetaPanel({ model }: MetaPanelProps) {
  const t = useT();
  const [tab, setTab] = useState("overview");
  const [dsIdx, setDsIdx] = useState(0);
  const [calcSearch, setCalcSearch] = useState("");
  const ds = model.datasources[dsIdx];
  const [copied, setCopied] = useState<string | null>(null);

  /** 全部数据源的自定义 SQL（口径核对清单）。 */
  const customSqlRows = model.datasources.flatMap((d) =>
    (d.dataModel?.customSql ?? []).map((c) => ({ ...c, dsCaption: d.caption }))
  );

  const copySql = (sql: string) => {
    void navigator.clipboard?.writeText(sql).then(
      () => {
        setCopied(sql);
        setTimeout(() => setCopied(null), 1600);
      },
      () => undefined
    );
  };

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
        {metaTabs(t).map(([key, label]) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="meta-body">
        {tab === "overview" && (
          <div className="overview">
            {model.datasources.length === 0 && <p className="muted">{t("noDatasources")}</p>}
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
                    <span>{t("fieldCount", { count: dsItem.columns.length })}</span>
                    <span>{t("calcCount", { count: calcCount })}</span>
                    <span>{t("groupCount", { count: dsItem.groups.length })}</span>
                  </div>
                  <div className="ds-stats ds-model-stats">
                    <span>{t("overviewTables", { count: dsItem.dataModel?.tables.length ?? 0 })}</span>
                    <span>{t("overviewJoins", { count: dsItem.dataModel?.joins.length ?? 0 })}</span>
                    <span>{t("overviewSql", { count: dsItem.dataModel?.customSql.length ?? 0 })}</span>
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
                <label>{t("datasourceLabel")}</label>
                <select value={dsIdx} onChange={(e) => setDsIdx(+e.target.value)}>
                  {model.datasources.map((dsItem, i) => (
                    <option key={i} value={i}>
                      {dsItem.caption}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {ds ? <FieldsTable columns={ds.columns} /> : <p className="muted">{t("noFields")}</p>}
          </div>
        )}
        {tab === "calc" && (
          <div className="calc-tab">
            {model.datasources.length > 1 && (
              <div className="ds-select">
                <label>{t("datasourceLabel")}</label>
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
              placeholder={t("searchCalcs")}
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
                    <FormulaCode formula={c.formula ?? ""} />
                  </pre>
                </div>
              ))}
              {calcRows.length === 0 && <p className="muted">{t("noMatchingCalcs")}</p>}
            </div>
          </div>
        )}
        {tab === "sql" && (
          <div className="sql-tab">
            {customSqlRows.length === 0 && <p className="muted">{t("sqlEmpty")}</p>}
            {customSqlRows.map((row, i) => (
              <div key={i} className="sql-item">
                <div className="sql-head">
                  <span className="sql-name">{row.name}</span>
                  <span className="sql-ds">{row.dsCaption}</span>
                  <button className="sql-copy" onClick={() => copySql(row.sql)}>
                    {copied === row.sql ? t("sqlCopied") : t("sqlCopy")}
                  </button>
                </div>
                <pre className="sql-body">{row.sql}</pre>
              </div>
            ))}
            {customSqlRows.length > 0 && <p className="muted sql-note">{t("sqlNote")}</p>}
          </div>
        )}
        {tab === "sheets" && (
          <div className="sheets-tab">
            <p className="muted">{t("worksheetCount", { count: model.worksheets.length })}</p>
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
