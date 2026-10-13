// 应用根：恢复上次解析结果、自动加载内置示例、组合布局图 / metadata / 关系图。

import { useEffect, useMemo, useRef, useState } from "react";
import type { WorkbookModel } from "./types.ts";
import { parseWorkbook } from "./parser.ts";
import { SAMPLE_URL, loadPersisted, persistState } from "./lib/persist.ts";
import { summarize } from "./lib/model.ts";
import { useT } from "./i18n.tsx";
import { Uploader } from "./components/Uploader.tsx";
import { DashboardView } from "./components/DashboardView.tsx";
import { WorkbookPanel } from "./components/WorkbookPanel.tsx";
import { LineageView } from "./components/LineageView.tsx";
import { DataModelView } from "./components/DataModelView.tsx";

/** 应用根 props。 */
export interface AppProps {
  /** 是否处于全屏模式（由外壳传入）。 */
  fullscreen?: boolean;
  /** 切换全屏；不传则不显示全屏按钮（如设置页内嵌场景）。 */
  onToggleFullscreen?: () => void;
}

export function App({ fullscreen = false, onToggleFullscreen }: AppProps) {
  const t = useT();
  // 初始化时优先恢复上次解析结果（切换面板 / 刷新页面后仍在）
  const initial = useRef(loadPersisted()).current;
  const [model, setModel] = useState<WorkbookModel | null>(initial?.model ?? null);
  const [dashIdx, setDashIdx] = useState(initial?.dashIdx ?? 0);
  const [view, setView] = useState<"layout" | "lineage" | "data">(initial?.view ?? "layout");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState(initial?.fileName ?? "");
  const [sampleLoading, setSampleLoading] = useState(false);
  /** 布局图上高亮的工作表（由右栏工作表列表点击设置）。 */
  const [highlightSheet, setHighlightSheet] = useState<string | null>(null);

  // 持久化：模型只在变化时序列化一次并缓存（实测 8000 字段 ≈1.7MB / stringify ≈15ms），
  // 切页签与切仪表板复用缓存，不再整份重写主线程。
  const modelJsonRef = useRef<string | null>(null);
  useEffect(() => {
    modelJsonRef.current = model ? JSON.stringify(model) : "null";
  }, [model]);
  useEffect(() => {
    persistState({ model, dashIdx, view, fileName, modelJson: modelJsonRef.current });
  }, [model, dashIdx, view, fileName]);

  const onText = (text: string, name: string) => {
    setError("");
    try {
      const parsed = parseWorkbook(text);
      setModel(parsed);
      setDashIdx(0);
      setFileName(name || "");
    } catch (err) {
      setModel(null);
      setError((err as Error).message || t("parseFailed"));
    }
  };

  // 打开即用：无缓存时自动加载内置示例（不影响随后上传自己的文件）
  const autoLoaded = useRef(false);
  useEffect(() => {
    if (model || autoLoaded.current) return;
    autoLoaded.current = true;
    let cancelled = false;
    setSampleLoading(true);
    fetch(SAMPLE_URL)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) onText(text, t("sampleFileName"));
      })
      .catch((err) => {
        if (!cancelled) setError(t("sampleAutoLoadFailed") + (err as Error).message + t("orChooseManually"));
      })
      .finally(() => {
        // 不能加 !cancelled：示例加载中途被打断（拖入 .twb 会改变 model 触发 cleanup）
        // 时 busy 会永久为真，上传按钮再也点不动。
        setSampleLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 仅在首次挂载且无缓存时自动加载
  }, [model]);

  const stats = useMemo(() => (model ? summarize(model) : null), [model]);
  const dashboards = model?.dashboards || [];
  const dashboard = dashboards[dashIdx] || null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>{t("appTitle")}</h1>
          <p className="sub">{t("appSubtitle")}</p>
        </div>
        <div className="header-actions">
          <div className="view-tabs">
            <button className={view === "layout" ? "vt active" : "vt"} onClick={() => setView("layout")}>
              {t("tabLayout")}
            </button>
            <button className={view === "lineage" ? "vt active" : "vt"} onClick={() => setView("lineage")}>
              {t("tabLineage")}
            </button>
            <button className={view === "data" ? "vt active" : "vt"} onClick={() => setView("data")}>
              {t("tabDataModel")}
            </button>
          </div>
          <Uploader onText={onText} onError={setError} busy={sampleLoading} />
          {onToggleFullscreen && (
            <button
              className="fs-toggle"
              onClick={onToggleFullscreen}
              title={fullscreen ? t("exitFullscreenEsc") : t("fullscreenTooltip")}
            >
              {fullscreen ? t("exitFullscreen") : t("fullscreen")}
            </button>
          )}
        </div>
      </header>

      {error && <div className="error-banner">⚠ {error}</div>}

      {!model && (
        <div className="welcome">
          <div className="welcome-card">
            <h2>{sampleLoading ? t("sampleLoading") : t("welcomeTitle")}</h2>
            <p>{t("helpAuto")}</p>
            <ul>
              <li>
                {t("help1a")}
                <b>1:1</b>
                {t("help1b")}
              </li>
              <li>
                {t("help2a")}
                <b>SVG / PNG / .excalidraw</b>
                {t("help2b")}
              </li>
              <li>
                {t("help3a")}
                <b>{t("welcomeMeta")}</b>
                {t("help3b")}
              </li>
            </ul>
            <p className="muted">
              {t("helpAuto")} {t("helpSecurity")}
            </p>
          </div>
        </div>
      )}

      {model && stats && (
        <div className="summary-bar">
          {fileName && <span className="sf">{fileName}</span>}
          <span>
            {t("statDashboards")} <b>{stats.dashboards}</b>
          </span>
          <span>
            {t("statWorksheets")} <b>{stats.worksheets}</b>
          </span>
          <span>
            {t("statDatasources")} <b>{stats.datasources}</b>
          </span>
          <span>
            {t("statFields")} <b>{stats.fields}</b>
          </span>
          <span>
            {t("statCalcs")} <b>{stats.calculations}</b>
          </span>
          {dashboards.length > 1 && (
            <select className="dash-select" value={dashIdx} onChange={(e) => setDashIdx(+e.target.value)}>
              {dashboards.map((d, i) => (
                <option key={i} value={i}>
                  {d.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {model && view === "layout" && (
        <div className="main">
          <section className="left">
            <DashboardView dashboard={dashboard} highlightSheet={highlightSheet} />
          </section>
          <aside className="right">
            <WorkbookPanel
              model={model}
              dashIdx={dashIdx}
              onSelectDashboard={(i) => {
                setDashIdx(i);
                setHighlightSheet(null);
              }}
              highlightSheet={highlightSheet}
              onHighlightSheet={setHighlightSheet}
            />
          </aside>
        </div>
      )}

      {model && view === "lineage" && <LineageView model={model} />}

      {model && view === "data" && <DataModelView model={model} />}
    </div>
  );
}
