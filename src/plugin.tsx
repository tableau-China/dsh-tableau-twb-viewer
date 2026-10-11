// 插件入口：注册左侧栏面板行（sidebar.panellist）+ 主区整页（main 槽位，keyed by panel id）。
//
// 这是 DSH 0.2.x 的生态惯例（plugin-manager / schedule 同构）：入口常驻可见，
// 不必期待用户去「设置」里找插件。文案通过宿主 locale 服务注册（中 / 英）。

import { useEffect, useState } from "react";
import styleCss from "./style.css";
import pluginCss from "./plugin.css";
import { App } from "./app.tsx";
import { NS, en, makeT, zh, I18nProvider, type Dict, type Translator } from "./i18n.tsx";

// ---- CSS 注入（与官方插件一致的 data-plugin-css 模式）----

function injectCss(plugin: string, tagName: string, css: string): void {
  if (typeof document === "undefined") return;
  if (document.querySelector(`style[data-plugin-css="${tagName}"]`)) return;
  const tag = document.createElement("style");
  tag.dataset.plugin = plugin;
  tag.dataset.pluginCss = tagName;
  tag.textContent = css;
  document.head.appendChild(tag);
}

injectCss("dsh-tableau-twb-viewer", "dsh-tableau-twb-viewer/style.css", styleCss);
injectCss("dsh-tableau-twb-viewer", "dsh-tableau-twb-viewer/plugin.css", pluginCss);

// ---- 面板外壳 ----

/** 面板 id：同时用作左侧栏行 id 与 main 槽位 key。 */
export const PANEL_ID = "twb-viewer";

/** 槽位注册所需的宿主 ctx 结构（只声明用到的部分）。 */
export interface PluginContext {
  slots: {
    inject(name: string, factory: () => unknown): unknown;
    register(options: Record<string, unknown>, component: unknown): unknown;
  };
  locale: {
    register(ns: string, dicts: Record<string, Dict>): () => void;
    bind(ns: string): Translator;
  };
  effect(callback: () => unknown, label?: string): void;
}

/** 左侧栏面板图标（工作簿 + 血缘节点，跟随 host 主题色）。 */
function TwbPanelIcon({ size = 18, active }: { size?: number; active?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", opacity: active ? 1 : 0.85 }}
    >
      <rect x="1.4" y="2.2" width="13.2" height="11.6" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.4 6.2h13.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="5.2" cy="10.4" r="1.35" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="10.8" cy="10.4" r="1.35" stroke="currentColor" strokeWidth="1.1" />
      <path d="M6.55 10.4h2.9" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/** 共享外壳：负责全屏切换（Esc 退出）与根容器（主区整页）。 */
function TwbViewerRoot() {
  const [fullscreen, setFullscreen] = useState(false);

  // Esc 退出全屏
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const toggle = () => setFullscreen((v) => !v);

  // 纯 CSS 全屏：切换只改 className，组件树不变 -> 已解析文件 / 视图 / 缩放平移
  // 状态全部保留。容器无 transform 祖先，position:fixed 即可铺满视口。
  return (
    <div className={`twb-root twb-root--panel${fullscreen ? " twb-fullscreen" : ""}`}>
      <App fullscreen={fullscreen} onToggleFullscreen={toggle} />
    </div>
  );
}

/** 主区整页（左侧栏面板行的落地页）；宿主按 locale: NS 注入 t。 */
function TwbViewerPage({ t }: { t?: Translator }) {
  return (
    <I18nProvider value={t ?? makeT("zh")}>
      <TwbViewerRoot />
    </I18nProvider>
  );
}

/** 客户端服务依赖：slots（槽位注册）与 locale（中英文案）。 */
export const inject = ["slots", "locale"];

/** 客户端插件体：注册文案字典、左侧栏面板行与主区整页。 */
export function apply(ctx: PluginContext): void {
  // 文案字典（宿主的语言切换会即时生效）
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-tableau-twb-viewer: locale");
  const t = ctx.locale.bind(NS);

  // 左侧栏一行 → 点击由 host 调 layout.selectPanel(PANEL_ID) 切到 main 整页
  ctx.slots.inject("sidebar.panellist", () =>
    ctx.slots.register(
      {
        name: "sidebar.panellist",
        id: PANEL_ID,
        order: 20,
        locale: NS,
        label: () => t("panel")
      },
      TwbPanelIcon
    )
  );
  // 主区整页内容（main 是 keyed 槽位，key 必须与面板 id 一致）
  ctx.slots.inject("main", () =>
    ctx.slots.register(
      {
        name: "main",
        key: PANEL_ID,
        locale: NS
      },
      TwbViewerPage
    )
  );
}
