// 字段表：筛选（全部 / 维度 / 度量 / 计算字段）+ 搜索。

import { useMemo, useState } from "react";
import type { WorkbookColumn } from "../types.ts";
import { useT, type Translator } from "../i18n.tsx";

/** 字段表 props。 */
export interface FieldsTableProps {
  columns: WorkbookColumn[];
}

/** 字段角色文案。 */
function roleLabel(t: Translator, role: string | null | undefined): string {
  if (role === "dimension") return t("roleDimension");
  if (role === "measure") return t("roleMeasure");
  return role || "—";
}

export function FieldsTable({ columns }: FieldsTableProps) {
  const t = useT();
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
            ["all", t("focusAll")],
            ["dimension", t("roleDimension")],
            ["measure", t("roleMeasure")],
            ["calc", t("colCalc")]
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
          placeholder={t("searchFields")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="ft-count">{t("fieldCount", { count: rows.length })}</span>
      </div>
      <div className="ft-scroll">
        <table>
          <thead>
            <tr>
              <th>{t("colName")}</th>
              <th>{t("colRole")}</th>
              <th>{t("colDatatype")}</th>
              <th>{t("colType")}</th>
              <th>{t("colCalc")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr key={i} className={c.formula ? "calc-row" : ""}>
                <td className="fname">
                  <div className="fname-main" title={c.caption ? `内部ID: ${c.name}` : undefined}>
                    {c.label}
                    {c.isParameter && <span className="row-param-badge">{t("paramBadge")}</span>}
                  </div>
                </td>
                <td>
                  <span className={`role role-${c.role}`}>{roleLabel(t, c.role)}</span>
                </td>
                <td>{c.datatype || "—"}</td>
                <td>{c.type || "—"}</td>
                <td>{c.formula ? t("yes") : "—"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  {t("noMatch")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
