window.__ModuleLoader__.load({
	id: "dsh-tableau-twb-viewer",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var Ee=Object.defineProperty;var Mt=Object.getOwnPropertyDescriptor;var Dt=Object.getOwnPropertyNames;var St=Object.prototype.hasOwnProperty;var Ct=(e,t)=>{for(var o in t)Ee(e,o,{get:t[o],enumerable:!0})},Tt=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Dt(t))!St.call(e,a)&&a!==o&&Ee(e,a,{get:()=>t[a],enumerable:!(n=Mt(t,a))||n.enumerable});return e};var Lt=e=>Tt(Ee({},"__esModule",{value:!0}),e);var uo={};Ct(uo,{PANEL_ID:()=>Te,apply:()=>po,inject:()=>co});module.exports=Lt(uo);var Ne=require("react");var ze=`.twb-root{--twb-bg: #f1f5f9;--twb-panel: #ffffff;--twb-border: #e2e8f0;--twb-text: #1e293b;--twb-muted: #64748b;--twb-primary: #2563eb;--twb-primary-d: #1d4ed8;--twb-accent: #dbeafe;--twb-shadow: 0 1px 3px rgba(15, 23, 42, .08)}.twb-root *{box-sizing:border-box}.twb-root{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;color:var(--twb-text);background:var(--twb-bg);font-size:14px}.twb-root .app{display:flex;flex-direction:column;height:100vh;overflow:hidden}.twb-root .app-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 20px;background:var(--twb-panel);border-bottom:1px solid var(--twb-border);flex-wrap:wrap}.twb-root .brand h1{font-size:18px;margin:0}.twb-root .brand .sub{margin:2px 0 0;color:var(--twb-muted);font-size:12px}.twb-root .header-actions{flex:1;display:flex;justify-content:flex-end}.twb-root .uploader{display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px dashed var(--twb-border);border-radius:10px;background:#f8fafc}.twb-root .uploader.drag{border-color:var(--twb-primary);background:var(--twb-accent)}.twb-root .uploader .hint{color:var(--twb-muted);font-size:12px}.twb-root button{font:inherit;padding:7px 12px;border:1px solid var(--twb-border);background:#fff;border-radius:8px;cursor:pointer;color:var(--twb-text)}.twb-root button:hover{background:#f8fafc}.twb-root button.primary{background:var(--twb-primary);color:#fff;border-color:var(--twb-primary)}.twb-root button.primary:hover{background:var(--twb-primary-d)}.twb-root button:disabled{opacity:.5;cursor:not-allowed}.twb-root .error-banner{background:#fef2f2;color:#b91c1c;padding:8px 20px;font-size:13px;border-bottom:1px solid #fecaca}.twb-root .welcome{flex:1;display:flex;align-items:center;justify-content:center;padding:24px}.twb-root .welcome-card{background:var(--twb-panel);max-width:560px;padding:28px 32px;border-radius:14px;box-shadow:var(--twb-shadow)}.twb-root .welcome-card h2{margin-top:0}.twb-root .welcome-card ul{line-height:1.9}.twb-root .muted{color:var(--twb-muted)}.twb-root .summary-bar{display:flex;align-items:center;gap:18px;padding:8px 20px;background:var(--twb-panel);border-bottom:1px solid var(--twb-border);font-size:13px;flex-wrap:wrap}.twb-root .summary-bar .sf{font-weight:600;color:var(--twb-primary)}.twb-root .summary-bar b{color:var(--twb-text)}.twb-root .dash-select{margin-left:auto;font:inherit;padding:5px 8px;border:1px solid var(--twb-border);border-radius:8px}.twb-root .main{flex:1;display:grid;grid-template-columns:1fr 380px;min-height:0}.twb-root .left{min-width:0;min-height:0;border-right:1px solid var(--twb-border)}.twb-root .right{min-height:0;overflow:hidden;background:var(--twb-panel)}.twb-root .canvas-wrap{display:flex;flex-direction:column;height:100%}.twb-root .canvas-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;background:#f8fafc;border-bottom:1px solid var(--twb-border);flex-wrap:wrap}.twb-root .tb-left{display:flex;align-items:baseline;gap:10px}.twb-root .dash-title{font-weight:600}.twb-root .dash-dim{color:var(--twb-muted);font-size:12px}.twb-root .tb-right{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.twb-root .zoom-label{font-size:12px;color:var(--twb-muted);min-width:42px;text-align:center}.twb-root .tb-sep{width:1px;height:20px;background:var(--twb-border);margin:0 4px}.twb-root .canvas-viewport{flex:1;position:relative;overflow:hidden;background:#eef2f7;background-image:radial-gradient(#dbe2ea 1px,transparent 1px);background-size:22px 22px;cursor:grab}.twb-root .canvas-viewport:active{cursor:grabbing}.twb-root .canvas-viewport svg{display:block;box-shadow:0 2px 12px #0f172a1f}.twb-root .canvas-empty{display:flex;align-items:center;justify-content:center;height:100%;color:var(--twb-muted)}.twb-root .legend{display:flex;gap:16px;padding:6px 14px;background:#f8fafc;border-top:1px solid var(--twb-border);font-size:12px;color:var(--twb-muted);flex-wrap:wrap}.twb-root .legend .sw{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-1px;border:1px solid}.twb-root .sw-ws{background:#dbeafe;border-color:#3b82f6}.twb-root .sw-ct{background:#f8fafc;border-color:#cbd5e1}.twb-root .sw-tx{background:#fff;border-color:#e2e8f0}.twb-root .meta-panel{display:flex;flex-direction:column;height:100%}.twb-root .meta-tabs{display:flex;border-bottom:1px solid var(--twb-border);background:#f8fafc}.twb-root .meta-tabs button{flex:1;border:none;border-radius:0;background:transparent;padding:10px 6px;border-bottom:2px solid transparent}.twb-root .meta-tabs button.active{border-bottom-color:var(--twb-primary);color:var(--twb-primary);font-weight:600}.twb-root .meta-body{flex:1;overflow:auto;padding:14px}.twb-root .ds-card{border:1px solid var(--twb-border);border-radius:10px;padding:12px 14px;margin-bottom:10px;cursor:pointer;background:#fff}.twb-root .ds-card.sel{border-color:var(--twb-primary);box-shadow:0 0 0 2px var(--twb-accent)}.twb-root .ds-name{font-weight:600;font-size:15px}.twb-root .ds-sub{color:var(--twb-muted);font-size:12px;margin:4px 0 8px}.twb-root .ds-stats{display:flex;gap:14px;font-size:12px;color:var(--twb-text)}.twb-root .ft-controls{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}.twb-root .seg{display:inline-flex;border:1px solid var(--twb-border);border-radius:8px;overflow:hidden}.twb-root .seg button{border:none;border-radius:0;padding:6px 10px;font-size:12px}.twb-root .seg button.active{background:var(--twb-primary);color:#fff}.twb-root .ft-search{flex:1;min-width:120px;padding:6px 10px;border:1px solid var(--twb-border);border-radius:8px;font:inherit}.twb-root .ft-count{font-size:12px;color:var(--twb-muted)}.twb-root .ft-scroll{max-height:60vh;overflow:auto;border:1px solid var(--twb-border);border-radius:8px}.twb-root .ft-scroll table{width:100%;border-collapse:collapse;font-size:12.5px}.twb-root .ft-scroll th,.twb-root .ft-scroll td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--twb-border);white-space:nowrap}.twb-root .ft-scroll th{position:sticky;top:0;background:#f8fafc;z-index:1}.twb-root .ft-scroll td.fname{white-space:normal;word-break:break-all;max-width:200px}.twb-root .calc-row td.fname{color:var(--twb-primary-d);font-weight:500}.twb-root .role{padding:1px 7px;border-radius:999px;font-size:11px}.twb-root .role-dimension{background:#ecfdf5;color:#047857}.twb-root .role-measure{background:#fef3c7;color:#b45309}.twb-root .empty{text-align:center;color:var(--twb-muted);padding:20px}.twb-root .ds-select{margin-bottom:10px;font-size:13px}.twb-root .ds-select select{font:inherit;padding:5px 8px;border:1px solid var(--twb-border);border-radius:8px;margin-left:6px}.twb-root .calc-tab .ft-search{margin-bottom:12px;width:100%}.twb-root .calc-list{display:flex;flex-direction:column;gap:10px}.twb-root .calc-item{border:1px solid var(--twb-border);border-radius:10px;padding:10px 12px;background:#fff}.twb-root .calc-name{font-weight:600;color:var(--twb-primary-d);margin-bottom:6px;word-break:break-all}.twb-root .calc-formula{margin:0;background:#f6f8fa;color:#1f2933;border:1px solid var(--twb-border);padding:10px 12px;border-radius:8px;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-family:SFMono-Regular,Consolas,Liberation Mono,monospace}.twb-root .fname-main{font-weight:500;color:var(--twb-text)}.twb-root .calc-row td.fname .fname-main{color:var(--twb-primary-d)}.twb-root .calc-name-main{font-weight:600;color:var(--twb-primary-d)}.twb-root .calc-formula code.formula-hl{font-family:inherit;font-size:inherit;background:none;color:inherit;white-space:pre-wrap;word-break:break-word}.twb-root .fh-kw{color:#c2255c;font-weight:600}.twb-root .fh-fn{color:#0b7285}.twb-root .fh-string{color:#2b8a3e}.twb-root .fh-field{color:#b45309}.twb-root .fh-number{color:#c2410c}.twb-root .fh-comment{color:#868e96;font-style:italic}.twb-root .fh-ident{color:#1f2933}.twb-root .fh-other{color:#495057}.twb-root .sheet-list{margin:0;padding-left:18px;line-height:2}.twb-root .view-tabs{display:inline-flex;background:#f1f3f5;border-radius:9px;padding:3px;gap:2px}.twb-root .view-tabs .vt{border:none;background:transparent;padding:6px 14px;border-radius:7px;font-size:13px;font-weight:600;color:var(--twb-muted);cursor:pointer}.twb-root .view-tabs .vt.active{background:#fff;color:var(--twb-primary-d);box-shadow:0 1px 2px #00000014}.twb-root .header-actions{display:flex;align-items:center;gap:12px}.twb-root .lineage{display:grid;grid-template-columns:240px 1fr 280px;flex:1;min-height:0;height:calc(100vh - 188px)}.twb-root .lineage-picker,.twb-root .lineage-detail{background:#fff;border:1px solid var(--twb-border);overflow-y:auto;padding:12px}.twb-root .lineage-picker{border-right:none;border-radius:12px 0 0 12px}.twb-root .lineage-detail{border-left:none;border-radius:0 12px 12px 0}.twb-root .picker-head{font-weight:700;color:var(--twb-primary-d);margin-bottom:10px}.twb-root .role-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}.twb-root .role-tabs .rt{flex:1 1 auto;border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 4px;font-size:12px;cursor:pointer;color:var(--twb-text)}.twb-root .role-tabs .rt.active{background:var(--twb-primary);color:#fff;border-color:var(--twb-primary)}.twb-root .picker-list{display:flex;flex-direction:column;gap:5px;margin-top:8px}.twb-root .picker-item{text-align:left;border:1px solid transparent;background:#f8f9fa;border-radius:7px;padding:6px 8px;font-size:12.5px;cursor:pointer;color:var(--twb-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.twb-root .picker-item:hover{background:#eef2ff}.twb-root .picker-item.active{border-color:var(--twb-primary);background:#e7f5ff;font-weight:600}.twb-root .picker-item.cat-calc{border-left:3px solid #7048e8}.twb-root .picker-item.cat-dimension{border-left:3px solid #f08c00}.twb-root .picker-item.cat-measure{border-left:3px solid #2f9e44}.twb-root .picker-item.cat-datasource{border-left:3px solid #1971c2}.twb-root .lineage-canvas{display:flex;flex-direction:column;min-width:0;background:#fbfcfe;border:1px solid var(--twb-border)}.twb-root .lineage-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px;border-bottom:1px solid var(--twb-border);background:#fff;flex-wrap:wrap}.twb-root .legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--twb-muted)}.twb-root .legend .lg{display:inline-flex;align-items:center;gap:5px}.twb-root .legend .lg i{width:12px;height:12px;border-radius:3px;border:1.5px solid;display:inline-block}.twb-root .legend .lg-note{color:#868e96;font-style:italic}.twb-root .toolbar-actions button{border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 10px;font-size:12px;cursor:pointer;color:var(--twb-text)}.twb-root .toolbar-actions button:hover{background:#f1f3f5}.twb-root .lineage-svg{flex:1;width:100%;min-height:0;background:radial-gradient(circle,#e7ebf0 1px,transparent 1px) 0 0 / 22px 22px;cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none}.twb-root .lineage-svg:active{cursor:grabbing}.twb-root .ln-edge{fill:none;stroke:#ced4da;stroke-width:1.2}.twb-root .ln-edge-hl{stroke:#1971c2;stroke-width:2}.twb-root .ln-edge-dim{stroke:#e9ecef;stroke-width:1}.twb-root .ln-node .ln-rect{stroke-width:1.5;transition:opacity .15s}.twb-root .ln-label{font-size:12px;fill:#1f2933;font-family:-apple-system,Segoe UI,PingFang SC,sans-serif;pointer-events:none}.twb-root .ln-tag{font-size:9.5px;fill:#868e96;pointer-events:none}.twb-root .ln-node.ln-self .ln-rect{stroke-width:3;filter:drop-shadow(0 0 4px rgba(25,113,194,.5))}.twb-root .ln-node.ln-up .ln-rect{stroke:#1971c2;stroke-width:2.4}.twb-root .ln-node.ln-down .ln-rect{stroke:#2f9e44;stroke-width:2.4}.twb-root .ln-node.ln-dim{opacity:.22}.twb-root .ln-node.ln-dim .ln-label,.twb-root .ln-node.ln-dim .ln-tag{opacity:.5}.twb-root .ln-node.ln-search .ln-rect{stroke:#f08c00;stroke-width:2.8;filter:drop-shadow(0 0 5px rgba(240,140,0,.55))}.twb-root .ln-lane-line{stroke:#e9ecef;stroke-width:1;stroke-dasharray:4 5}.twb-root .ln-lane-label{fill:#adb5bd;font-size:11px;font-weight:600;font-family:-apple-system,Segoe UI,PingFang SC,sans-serif;pointer-events:none}.twb-root .detail-empty{color:var(--twb-muted);font-size:13px;line-height:1.7}.twb-root .detail-head{font-size:16px;font-weight:700;color:var(--twb-primary-d);word-break:break-all;margin-bottom:8px}.twb-root .detail-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}.twb-root .pill{font-size:11px;padding:2px 8px;border-radius:999px;background:#f1f3f5;color:#495057;border:1px solid var(--twb-border)}.twb-root .pill.cat-calc{background:#f3e8ff;color:#6741d9;border-color:#d0bfff}.twb-root .pill.cat-dimension{background:#fff4e6;color:#e8590c;border-color:#ffd8a8}.twb-root .pill.cat-measure{background:#ebfbee;color:#2b8a3e;border-color:#b2f2bb}.twb-root .pill.cat-datasource{background:#e7f5ff;color:#1971c2;border-color:#a5d8ff}.twb-root .detail-internal{font-size:11px;color:#868e96;word-break:break-all;margin-bottom:10px;font-family:SFMono-Regular,Consolas,monospace}.twb-root .detail-formula{margin-bottom:12px}.twb-root .df-title,.twb-root .dl-title{font-size:12px;font-weight:700;color:var(--twb-muted);margin-bottom:6px}.twb-root .dl-title.ln-up{color:#1971c2}.twb-root .dl-title.ln-down{color:#2f9e44}.twb-root .detail-counts{display:flex;gap:10px;margin-bottom:12px}.twb-root .detail-counts .dc{flex:1;border:1px solid var(--twb-border);border-radius:10px;padding:8px;text-align:center}.twb-root .detail-counts .dc.up{background:#e7f5ff}.twb-root .detail-counts .dc.down{background:#ebfbee}.twb-root .dc-num{display:block;font-size:20px;font-weight:700}.twb-root .dc.up .dc-num{color:#1971c2}.twb-root .dc.down .dc-num{color:#2f9e44}.twb-root .dc-lbl{font-size:11px;color:var(--twb-muted)}.twb-root .detail-list{margin-bottom:12px}.twb-root .dl-item{display:block;width:100%;text-align:left;border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 8px;font-size:12px;cursor:pointer;color:var(--twb-text);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.twb-root .dl-item:hover{background:#f1f3f5}
`;var Ie=`/* dsh-tableau-twb-viewer \u63D2\u4EF6\u81EA\u6709\u6837\u5F0F\uFF08\u533A\u522B\u4E8E\u4ECE\u539F\u59CB\u5E94\u7528\u79FB\u690D\u7684 style.css\uFF09 */

/* \u4E3B\u533A\u6574\u9875\uFF08\u5DE6\u4FA7\u680F\u9762\u677F\u884C\u7684\u843D\u5730\u9875\uFF09\uFF1A\u7531 host \u5E03\u5C40\u7ED9\u5B9A\u9AD8\u5EA6\uFF0C\u5360\u6EE1\u5373\u53EF */
.twb-root--panel {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}
.twb-root--panel .app {
  height: 100%;
}

/* \u5168\u5C4F\u6A21\u5F0F\uFF1A\u94FA\u6EE1\u6574\u4E2A\u6D4F\u89C8\u5668\u7A97\u53E3 */
.twb-root.twb-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  height: 100dvh;
  min-height: 0;
  overflow: hidden;
  background: var(--twb-bg, #f1f5f9);
}
.twb-root.twb-fullscreen .app {
  height: 100dvh;
}

/* \u5934\u90E8\u5168\u5C4F\u5207\u6362\u6309\u94AE */
.fs-toggle {
  white-space: nowrap;
}

/* \u5173\u7CFB\u56FE\u805A\u7126\u63A7\u4EF6\uFF08\u5927\u56FE\u53EA\u6E32\u67D3\u9009\u4E2D\u8282\u70B9 \xB1N \u8DF3\uFF09 */
.twb-root .focus-seg {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--twb-muted);
}
.twb-root .focus-seg button {
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 6px;
}
.twb-root .focus-seg button.active {
  background: var(--twb-primary);
  border-color: var(--twb-primary);
  color: #fff;
}
.twb-root .focus-count {
  font-size: 12px;
  color: var(--twb-muted);
  white-space: nowrap;
}

/* ---- \u5E03\u5C40\u56FE\u4F8B\uFF08zone \u7EC6\u5206\u7C7B\u578B\uFF0C\u4E0E ZONE_STYLE \u540C\u6E90\uFF09 ---- */
.twb-root .zone-legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 6px 12px;
  font-size: 12px;
  color: var(--twb-muted);
  border-bottom: 1px solid var(--twb-border, #e2e8f0);
  background: #fff;
}
.twb-root .zl-title {
  font-weight: 600;
  color: var(--twb-text);
}
.twb-root .zl-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}
.twb-root .zl-swatch {
  width: 14px;
  height: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  display: inline-block;
}

/* ---- \u6570\u636E\u6E90\u5361\u7247\u7684\u6570\u636E\u6A21\u578B\u8BA1\u6570 ---- */
.twb-root .ds-model-stats {
  border-top: 1px dashed var(--twb-border, #e2e8f0);
  margin-top: 4px;
  padding-top: 4px;
  color: var(--twb-muted);
}

/* ---- \u81EA\u5B9A\u4E49 SQL \u9875\u7B7E ---- */
.twb-root .sql-tab {
  padding: 12px;
  overflow: auto;
  height: 100%;
}
.twb-root .sql-item {
  border: 1px solid var(--twb-border, #e2e8f0);
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
}
.twb-root .sql-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: #f8fafc;
  border-bottom: 1px solid var(--twb-border, #e2e8f0);
  font-size: 12px;
}
.twb-root .sql-name {
  font-weight: 600;
  color: var(--twb-text);
}
.twb-root .sql-ds {
  color: var(--twb-muted);
  flex: 1;
}
.twb-root .sql-copy {
  padding: 2px 8px;
  font-size: 11px;
}
.twb-root .sql-body {
  margin: 0;
  padding: 10px;
  font-family: var(--twb-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 12px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 260px;
  overflow: auto;
  color: #0f172a;
}
.twb-root .sql-note {
  font-size: 12px;
}

/* ---- \u6570\u636E\u6A21\u578B\u89C6\u56FE ---- */
.twb-root .datamodel-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: #fff;
}
.twb-root .dm-toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--twb-border, #e2e8f0);
  font-size: 12px;
}
.twb-root .dm-stat {
  font-weight: 600;
  color: var(--twb-text);
}
.twb-root .dm-hint {
  color: var(--twb-muted);
}
.twb-root .dm-body {
  display: flex;
  flex: 1;
  min-height: 0;
}
.twb-root .dm-canvas {
  flex: 1;
  overflow: auto;
  background:
    linear-gradient(#f8fafc 1px, transparent 1px) 0 0 / 100% 24px,
    linear-gradient(90deg, #f8fafc 1px, transparent 1px) 0 0 / 24px 100%,
    #fff;
}
.twb-root .dm-svg {
  display: block;
}
.twb-root .dm-node rect {
  fill: #eff6ff;
  stroke: #3b82f6;
  stroke-width: 1.5;
  cursor: pointer;
}
.twb-root .dm-node.dm-custom-sql rect {
  fill: #f5f3ff;
  stroke: #8b5cf6;
}
.twb-root .dm-node.active rect {
  stroke-width: 3;
}
.twb-root .dm-node-title {
  font-size: 12.5px;
  font-weight: 600;
  fill: #0f172a;
  pointer-events: none;
}
.twb-root .dm-node-sub {
  font-size: 10.5px;
  fill: #64748b;
  pointer-events: none;
}
.twb-root .dm-link {
  fill: none;
  stroke: #94a3b8;
  stroke-width: 1.6;
  pointer-events: none;
}
/* \u900F\u660E\u52A0\u7C97\u547D\u4E2D\u5C42\uFF1A\u5F27\u7EBF\u672C\u8EAB\u5F88\u7EC6\uFF0C\u5355\u72EC\u7ED9\u4E00\u6761 12px \u5BBD\u7684\u900F\u660E\u8DEF\u5F84\u63A5\u6536\u70B9\u51FB */
.twb-root .dm-link-hit {
  fill: none;
  stroke: transparent;
  stroke-width: 14;
  cursor: pointer;
  pointer-events: stroke;
}
.twb-root .dm-link.join-inner {
  stroke-dasharray: 0;
}
.twb-root .dm-link.join-left {
  stroke-dasharray: 6 4;
}
.twb-root .dm-link.join-right {
  stroke-dasharray: 2 4;
}
.twb-root .dm-link.join-full {
  stroke-dasharray: 8 3 2 3;
}
/* \u5BF9\u8C61\u6A21\u578B\u7684\u5173\u7CFB\uFF08\u903B\u8F91\u5173\u8054\uFF09\uFF1A\u5B9E\u7EBF + \u7565\u6D45\uFF0C\u533A\u522B\u4E8E\u663E\u5F0F join */
.twb-root .dm-link.join-relationship {
  stroke: #a5b4fc;
  stroke-width: 2;
}
.twb-root .dm-edge.active .dm-link {
  stroke: var(--twb-primary, #2563eb);
  stroke-width: 2.8;
}

/* ---- \u5E03\u5C40\u56FE\u53F3\u680F\uFF1A\u4EEA\u8868\u677F / \u5DE5\u4F5C\u8868\u5217\u8868 ---- */
.twb-root .wb-panel {
  height: 100%;
  overflow: auto;
  padding: 10px 12px;
  background: #fff;
  font-size: 12.5px;
}
.twb-root .wb-section + .wb-section {
  margin-top: 14px;
}
.twb-root .wb-section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--twb-muted);
  text-transform: none;
}
.twb-root .wb-count {
  display: inline-block;
  min-width: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
  text-align: center;
}
.twb-root .wb-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.twb-root .wb-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--twb-text);
  text-align: left;
  cursor: pointer;
}
.twb-root .wb-item:hover {
  background: #f8fafc;
  border-color: var(--twb-border, #e2e8f0);
}
.twb-root .wb-item.active {
  background: #eff6ff;
  border-color: #bfdbfe;
  font-weight: 600;
}
.twb-root .wb-item-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.twb-root .wb-item-meta {
  color: var(--twb-muted);
  font-size: 11px;
  white-space: nowrap;
}
.twb-root .wb-sheet.in-current {
  border-color: #bfdbfe;
  background: #f8fafc;
}
.twb-root .wb-badge {
  min-width: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #e0e7ff;
  color: #3730a3;
  font-size: 10.5px;
  text-align: center;
}
.twb-root .wb-empty {
  color: var(--twb-muted);
  padding: 4px 8px;
}

/* ---- \u6570\u636E\u6A21\u578B\u53F3\u680F\uFF1A\u81EA\u5B9A\u4E49 SQL \u6E05\u5355\u4E0E\u8FDE\u63A5\u4FE1\u606F ---- */
.twb-root .dm-kind-badge {
  margin-left: 6px;
  padding: 0 5px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 400;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}
.twb-root .dm-kind-badge.custom-sql {
  background: #f5f3ff;
  color: #6d28d9;
  border-color: #ddd6fe;
}
.twb-root .dm-sql-list {
  margin-top: 14px;
  border-top: 1px solid var(--twb-border, #e2e8f0);
  padding-top: 10px;
}
.twb-root .dm-sql-list-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--twb-muted);
  margin-bottom: 6px;
}
.twb-root .dm-sql-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 5px 8px;
  margin-bottom: 3px;
  border: 1px solid #ede9fe;
  border-radius: 6px;
  background: #faf5ff;
  color: #5b21b6;
  font-size: 12px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.twb-root .dm-sql-item:hover {
  background: #f3e8ff;
}
.twb-root .dm-sql-item.active {
  border-color: #8b5cf6;
  font-weight: 600;
}
.twb-root .dm-sql-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.twb-root .dm-legend-hint {
  color: var(--twb-muted);
  font-size: 11px;
}

/* ---- \u5F15\u7528\u5173\u7CFB\u56FE\uFF1A\u53C2\u6570\u8BE6\u60C5 ---- */
.twb-root .detail-param {
  margin: 8px 0;
  padding: 8px 10px;
  border: 1px solid #cffafe;
  border-radius: 8px;
  background: #f0fdff;
}
.twb-root .dp-value {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}
.twb-root .dp-label {
  color: var(--twb-muted);
  font-size: 11.5px;
}
.twb-root .dp-num {
  font-size: 16px;
  font-weight: 600;
  color: #0e7490;
}
.twb-root .dp-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 11.5px;
  color: var(--twb-muted);
}
.twb-root .dp-raw {
  margin-top: 4px;
  font-family: var(--twb-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 11px;
  color: #64748b;
  word-break: break-all;
}

/* ---- \u53F3\u4FA7\u680F\u5BBD\u5EA6\u7EDF\u4E00\uFF1A\u5E03\u5C40\u56FE / \u6570\u636E\u6A21\u578B \u4E0E\u5F15\u7528\u5173\u7CFB\u4E00\u81F4\uFF08\u5B9E\u6D4B 280px\uFF09 ---- */
.twb-root .right {
  width: 280px;
  min-width: 280px;
  flex: 0 0 280px;
}
.twb-root .dm-detail {
  flex: 0 0 280px;
  width: 280px;
  padding: 12px;
  font-size: 13px;
}
/* \u753B\u5E03\u5141\u8BB8\u6536\u7F29\uFF0C\u5426\u5219\u4F1A\u628A\u53F3\u4FA7\u8BE6\u60C5\u6324\u6241\uFF08\u5B9E\u6D4B\u4F1A\u538B\u5230 191px\uFF09 */
.twb-root .dm-canvas {
  min-width: 0;
}
.twb-root .dm-detail-title {
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.twb-root .dm-detail dl {
  grid-template-columns: 58px 1fr;
  gap: 6px 8px;
  font-size: 12.5px;
  line-height: 1.5;
}
.twb-root .dm-detail dt {
  color: var(--twb-muted);
}
.twb-root .dm-sql {
  font-size: 12px;
  line-height: 1.6;
}
.twb-root .dm-sql-list-title {
  font-size: 12.5px;
}
.twb-root .dm-sql-item {
  font-size: 12.5px;
  padding: 6px 8px;
}
.twb-root .dm-legend {
  font-size: 12px;
}

/* ---- \u53F3\u680F\uFF1A\u5F53\u524D\u4EEA\u8868\u677F\u7684\u5DE5\u4F5C\u8868 / \u9AD8\u4EAE\u6001 ---- */
.twb-root .wb-sheet.highlight {
  background: #dbeafe;
  border-color: #1d4ed8;
  font-weight: 600;
  color: #1e3a8a;
}
.twb-root .wb-sheet.highlight::after {
  content: "\u25C9";
  margin-left: 6px;
  color: #1d4ed8;
  font-size: 11px;
}
.twb-root .wb-note {
  margin: 8px 0 0;
  font-size: 11.5px;
  color: var(--twb-muted);
}
`;var q=require("react");function I(e,t){return e&&[...e.children].find(o=>(o.localName||o.tagName)===t)||null}function V(e,t){return e?[...e.children].filter(o=>(o.localName||o.tagName)===t):[]}function N(e,t){return e?e.getAttribute(t):null}function oe(e){return e?String(e).replace(/^\[/,"").replace(/\]$/,""):""}function Ft(e){let t=I(e,"formatted-text");if(!t)return"";let o=[...t.getElementsByTagName("run")];return o.length?o.map(n=>n.textContent).join(""):t.textContent||""}function We(e,t,o){return[...e.children||[]].filter(n=>(n.localName||n.tagName)==="zone").map(n=>Pt(n,t,o))}function Pt(e,t,o){let n=parseFloat(e.getAttribute("x")||"0"),a=parseFloat(e.getAttribute("y")||"0"),i=parseFloat(e.getAttribute("w")||"0"),l=parseFloat(e.getAttribute("h")||"0"),f=n/1e5*t.w,w=a/1e5*t.h,r=i/1e5*t.w,u=l/1e5*t.h,p=e.getAttribute("is-fixed")==="true",s=parseFloat(e.getAttribute("fixed-size")||"0");if(p&&s){let A=I(e,"layout-cache"),S=A?A.getAttribute("type-w"):null,D=A?A.getAttribute("type-h"):null;S==="fixed"&&(r=s),D==="fixed"&&(u=s),A||(u=s)}let k=e.getAttribute("type-v2")||"",v=e.getAttribute("name")||"",g=k==="text"?Ft(e):"",d="container";k==="text"?d="text":v&&o.includes(v)&&(d="worksheet");let m=It(k,d),M=_t(e),R=I(e,"zones"),L=R?[...R.children].filter(A=>(A.localName||A.tagName)==="zone"):[...e.children].filter(A=>(A.localName||A.tagName)==="zone");return{x:Math.round(f*10)/10,y:Math.round(w*10)/10,w:Math.round(r*10)/10,h:Math.round(u*10)/10,type:k,name:v,text:g,kind:d,shape:m,format:M,children:L.length?We({children:L},t,o):[]}}var zt=new Set(["filter","color","title","paramctrl","legend","highlight","page","dashboard-title","size","shape","text-object"]);function It(e,t){return t==="worksheet"?"worksheet":e==="text"?"text":e==="empty"?"empty":e==="image"||e==="bitmap"?"image":e==="layout-flow"?"flow":e==="layout-vertical"?"vertical":e==="layout-horizontal"?"horizontal":e==="layout-basic"?"basic":zt.has(e)?"card":"other"}function _t(e){let t={},o=I(e,"zone-style"),a=(o?[e,o]:[e]).flatMap(l=>[...l.children].filter(f=>(f.localName||f.tagName)==="format"));for(let l of a){let f=l.getAttribute("attr"),w=l.getAttribute("value");f&&w!==null&&(t[f]=w)}let i=l=>{let f=t[l];if(f===void 0)return null;let w=parseFloat(f);return Number.isFinite(w)?w:null};return{padding:i("padding"),margin:i("margin"),background:t["background-color"]??null,borderColor:t["border-color"]??null,borderWidth:i("border-width"),borderStyle:t["border-style"]??null}}function _e(e){return(e==="column"||e.endsWith("column"))&&e!=="column-instance"}function Oe(e){let t=new DOMParser().parseFromString(e,"application/xml"),o=t.querySelector("parsererror");if(o)throw new Error("XML \u89E3\u6790\u5931\u8D25\uFF1A"+o.textContent);let n=t.documentElement;if(!n||(n.localName||n.tagName)!=="workbook")throw new Error("\u8FD9\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684 Tableau \u5DE5\u4F5C\u7C3F (.twb) \u6587\u4EF6");let a=I(n,"worksheets"),i=a?V(a,"worksheet").map(r=>N(r,"name")).filter(r=>typeof r=="string"):[],l=[];for(let r of V(I(n,"dashboards"),"dashboard")){let u=N(r,"name")||"(\u672A\u547D\u540D\u4EEA\u8868\u677F)",p=I(r,"size"),s=0,k=0;p&&(s=parseInt(N(p,"minwidth")||N(p,"maxwidth")||"0",10),k=parseInt(N(p,"minheight")||N(p,"maxheight")||"0",10));let v=I(r,"zones"),g=v?We(v,{w:s||1e5,h:k||1e5},i):[];l.push({name:u,width:s,height:k,zones:g})}let f={};for(let r of V(I(n,"datasources"),"datasource"))for(let u of[...r.children].filter(p=>_e(p.localName||p.tagName))){let p=N(u,"name"),s=N(u,"caption");p&&s&&(f[oe(p)]=s)}let w=[];for(let r of V(I(n,"datasources"),"datasource")){let u=N(r,"caption")||N(r,"name")||"(\u672A\u547D\u540D\u6570\u636E\u6E90)",p=N(r,"name"),s=I(r,"connection"),k=s?{class:N(s,"class"),type:N(s,"type"),server:N(s,"server"),dbname:N(s,"dbname"),filename:N(s,"filename")}:null,v=[...r.children].filter(m=>_e(m.localName||m.tagName)).map(m=>{let M=N(m,"name");if(!M)return null;let R=I(m,"calculation"),L=N(m,"param-domain-type"),A=L!==null,S=A?null:R?N(R,"formula"):null,D=S;S&&(D=S.replace(/\[([^\]]+)\]/g,(O,H)=>{let W=oe(H);return f[W]?"["+f[W]+"]":O}));let b=N(m,"caption"),C=I(m,"range");return{name:M,caption:b||null,label:b||M,datatype:N(m,"datatype"),role:N(m,"role"),type:N(m,"type"),formula:D,formulaRaw:S,isParameter:A,parameter:A?{value:N(m,"value"),defaultFormat:N(m,"default-format"),domainType:L,range:C?{min:N(C,"min"),max:N(C,"max"),granularity:N(C,"granularity")}:null}:null}}).filter(m=>m!==null),g=V(r,"group").map(m=>N(m,"name")).filter(m=>typeof m=="string"),d=jt(r);w.push({caption:u,name:p,connection:k,columns:v,groups:g,dataModel:d})}return{dashboards:l,worksheets:i,datasources:w}}function Wt(e){let t=[],o=(a,i)=>{for(let l of[...a.children])(l.localName||l.tagName)==="relation"?(i||t.push(l),o(l,!0)):i||o(l,!1)},n=I(e,"connection");return n&&o(n,!1),t}function Ot(e){let t=N(e,"type"),o=N(e,"name")||"(unnamed)";return t==="text"?{name:o,table:null,kind:"custom-sql",sql:(e.textContent||"").trim()||null,objectId:null}:{name:o,table:N(e,"table"),kind:"table",sql:null,objectId:null}}function $t(e){let t=I(e,"clause");if(!t)return{leftExpr:null,rightExpr:null,cardinality:null};let o=N(t,"cardinality"),n=I(t,"expression"),a=n?V(n,"expression"):[];return{leftExpr:a[0]?N(a[0],"op"):null,rightExpr:a[1]?N(a[1],"op"):N(n,"op"),cardinality:o}}function $e(e){for(let t of[...e.children]){if((t.localName||t.tagName)==="relation")return t;let o=$e(t);if(o)return o}return null}function qt(e){let t=I(e,"object-graph");if(!t)return null;let o=new Map,n=[],a=new Map;for(let l of V(I(t,"objects"),"object")){let f=N(l,"id"),w=$e(l),r=w?N(w,"name"):null,u=N(l,"caption")||r||"(object)",s=(w?N(w,"type"):null)==="text"?{name:u,table:null,kind:"custom-sql",sql:w&&(w.textContent||"").trim()||null,objectId:f}:{name:u,table:w?N(w,"table"):null,kind:"table",sql:null,objectId:f};o.set("obj:"+(f||u),s),f&&a.set(f,s),s.kind==="custom-sql"&&s.sql&&n.push({name:s.name,sql:s.sql})}if(o.size===0)return null;let i=[];for(let l of V(I(t,"relationships"),"relationship")){let f=I(l,"expression"),w=f?V(f,"expression"):[],r=I(l,"first-end-point"),u=I(l,"second-end-point"),p=a.get(N(r,"object-id")||""),s=a.get(N(u,"object-id")||"");!p||!s||i.push({left:p,right:s,joinType:"relationship",leftExpr:w[0]?N(w[0],"op"):null,rightExpr:w[1]?N(w[1],"op"):null,cardinality:N(l,"cardinality")||null})}return{tables:[...o.values()],joins:i,customSql:n}}function jt(e){let t=qt(e);if(t)return t;let o=[],n=new Map,a=[],i=r=>`${r.kind}:${r.name}:${r.table??""}`,l=r=>{let u=i(r);return n.has(u)||n.set(u,r),r.kind==="custom-sql"&&r.sql&&!a.some(p=>p.name===r.name&&p.sql===r.sql)&&a.push({name:r.name,sql:r.sql}),n.get(u)},f=r=>{if(!r)return null;let u=/^\[([^\]]+)\]/.exec(r.trim());if(!u)return null;let p=u[1];for(let s of n.values())if(s.name===p||s.table&&s.table.replace(/[\[\]]/g,"")===p.replace(/[\[\]]/g,""))return s;return null},w=r=>{let u=N(r,"type")||"table";if(u==="collection"||u==="union"){let m=null;for(let M of V(r,"relation")){let R=w(M);m||(m=R)}return m??l({name:N(r,"name")||"(collection)",table:null,kind:"table",sql:null,objectId:null})}if(u!=="join")return l(Ot(r));let p=V(r,"relation"),s=p[0]?w(p[0]):null,k=p[1]?w(p[1]):null;for(let m of p.slice(2))w(m);let{leftExpr:v,rightExpr:g,cardinality:d}=$t(r);if(s&&k){let m=f(v)??s,M=f(g)??k;o.push({left:m,right:M,joinType:N(r,"join")||"inner",leftExpr:v,rightExpr:g,cardinality:d})}return s??k??l({name:"(join)",table:null,kind:"table",sql:null,objectId:null})};for(let r of Wt(e))w(r);return{tables:[...n.values()],joins:o,customSql:a}}var qe="dsh-tableau-twb-viewer.state.v2",ie=null,me="/twb-viewer/sample.twb";function Gt(e){if(e===null||typeof e!="object")return!1;let t=e;if(!Array.isArray(t.dashboards)||!Array.isArray(t.worksheets)||!Array.isArray(t.datasources)||!t.datasources.every(i=>typeof i=="object"&&i!==null&&Array.isArray(i.columns)))return!1;let n=t.datasources[0];if(n&&(typeof n.dataModel!="object"||n.dataModel===null)||n&&!Array.isArray(n.dataModel?.tables))return!1;let a=i=>{if(i===null||typeof i!="object")return!1;let l=i;if(typeof l.shape!="string"||typeof l.format!="object"||l.format===null)return!1;let f=l.children;return!Array.isArray(f)||f.every(a)};return t.dashboards.every(i=>{let l=i.zones;return Array.isArray(l)?l.every(a):!1})}function je(){if(ie)return ie;try{let e=sessionStorage.getItem(qe);if(!e)return null;let t=JSON.parse(e);if(!t||typeof t!="object"||!("model"in t)||!Gt(t.model??null)||t.view!=="layout"&&t.view!=="lineage"&&t.view!=="data"||!Number.isInteger(t.dashIdx)||t.dashIdx<0)return null;ie=t}catch{}return ie}function Ge(e){ie=e;try{sessionStorage.setItem(qe,JSON.stringify(e))}catch{}}function He(e){return{dashboards:e.dashboards.length,worksheets:e.worksheets.length,datasources:e.datasources.length,fields:e.datasources.reduce((t,o)=>t+o.columns.length,0),calculations:e.datasources.reduce((t,o)=>t+o.columns.filter(n=>n.formula).length,0)}}function Ue(e,t=10){if(!e)return[""];let o=[];for(let i=0;i<e.length;i+=t)o.push(e.slice(i,i+t));if(o.length<=3)return o;let n=o.slice(0,2).join(""),a=o.slice(2).join("").slice(0,t-1)+"\u2026";return[n.slice(0,t),n.slice(t,t*2),a]}var fe=require("react"),de="twb-viewer",le={panel:"TWb \u68C0\u89C6\u5668",appTitle:"Tableau .twb \u4EEA\u8868\u677F\u5E03\u5C40\u68C0\u89C6\u5668",appSubtitle:"1:1 SVG \u5E03\u5C40\u56FE \xB7 \u4E00\u952E\u5BFC\u51FA Excalidraw \xB7 \u6570\u636E\u6E90/\u5B57\u6BB5/\u8BA1\u7B97\u5B57\u6BB5 metadata \xB7 \u5B57\u6BB5\u5F15\u7528\u5173\u7CFB",tabLayout:"\u5E03\u5C40\u56FE",tabLineage:"\u5F15\u7528\u5173\u7CFB",fullscreen:"\u26F6 \u5168\u5C4F",fullscreenTooltip:"\u5168\u5C4F\u6A21\u5F0F\uFF0C\u94FA\u6EE1\u7A97\u53E3\u67E5\u770B\u5173\u7CFB\u56FE",exitFullscreen:"\u2715 \u9000\u51FA\u5168\u5C4F",exitFullscreenEsc:"\u9000\u51FA\u5168\u5C4F (Esc)",welcomeTitle:"\u4E0A\u4F20\u4E00\u4E2A Tableau \u5DE5\u4F5C\u7C3F\uFF08.twb\uFF09\u6587\u4EF6\uFF0C\u5373\u53EF\uFF1A",welcomeMeta:"\u6570\u636E\u6E90\u3001\u5B57\u6BB5\u3001\u8BA1\u7B97\u5B57\u6BB5\u516C\u5F0F",help1a:"\u6309 ",help1b:" \u7528 SVG \u7ED8\u5236\u4EEA\u8868\u677F\u5E03\u5C40\uFF0C\u652F\u6301\u7F29\u653E / \u5E73\u79FB\uFF1B",help2a:"\u4E00\u952E\u5BFC\u51FA ",help2b:"\uFF0C\u65B9\u4FBF\u5728 Excalidraw \u91CC\u624B\u7ED8\u6279\u6CE8\uFF1B",help3a:"\u67E5\u770B ",help3b:" \u7B49 metadata\uFF0C\u4FBF\u4E8E\u5BF9\u5BA2\u6237\u8BB2\u89E3\u53E3\u5F84\u3002",helpAuto:"\u6253\u5F00\u65F6\u4F1A\u81EA\u52A8\u8F7D\u5165\u5185\u7F6E\u793A\u4F8B\uFF1B\u4E0A\u4F20\u81EA\u5DF1\u7684 .twb \u4F1A\u66FF\u6362\u793A\u4F8B\u3002",helpSecurity:"\u51FA\u4E8E\u6570\u636E\u5B89\u5168\u8003\u8651\uFF0C\u4E0D\u89E3\u6790 .twbx\uFF08\u6253\u5305\u5DE5\u4F5C\u7C3F\u53EF\u80FD\u5185\u5D4C\u6570\u636E\u63D0\u53D6\uFF09\u3002",statDashboards:"\u4EEA\u8868\u677F",statWorksheets:"\u5DE5\u4F5C\u8868",statDatasources:"\u6570\u636E\u6E90",statFields:"\u5B57\u6BB5",statCalcs:"\u8BA1\u7B97\u5B57\u6BB5",chooseFile:"\u8BF7\u9009\u62E9 .twb \u6587\u4EF6",chooseFileBtn:"\u9009\u62E9 .twb \u6587\u4EF6",loadSample:"\u8F7D\u5165\u793A\u4F8B",loading:"\u52A0\u8F7D\u4E2D\u2026",sampleLoading:"\u6B63\u5728\u52A0\u8F7D\u5185\u7F6E\u793A\u4F8B\u2026",sampleFileName:"sample.twb\uFF08\u5185\u7F6E\u793A\u4F8B\uFF09",fileReadFailed:"\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25",parseFailed:"\u89E3\u6790\u5931\u8D25",sampleAutoLoadFailed:"\u81EA\u52A8\u52A0\u8F7D\u5185\u7F6E\u793A\u4F8B\u5931\u8D25\uFF1A",orChooseManually:"\uFF0C\u53EF\u624B\u52A8\u9009\u62E9 .twb \u6587\u4EF6",sampleLoadFailed:"\u8F7D\u5165\u793A\u4F8B\u5931\u8D25\uFF1A",twbxRejected:"\u51FA\u4E8E\u6570\u636E\u5B89\u5168\u8003\u8651\uFF0C\u672C\u63D2\u4EF6\u4E0D\u89E3\u6790 .twbx\uFF08\u6253\u5305\u5DE5\u4F5C\u7C3F\u53EF\u80FD\u5185\u5D4C\u6570\u636E\u63D0\u53D6\uFF09\u3002\u8BF7\u5728 Tableau \u4E2D\u300C\u53E6\u5B58\u4E3A\u300D.twb \u540E\u518D\u5BFC\u5165\u3002",zoomIn:"\u653E\u5927 +",zoomOut:"\u7F29\u5C0F \u2212",fit:"\u9002\u914D",exportSvg:"\u5BFC\u51FA SVG",exportPng:"\u5BFC\u51FA PNG",exportExcalidraw:"\u5BFC\u51FA Excalidraw",colCalc:"\u8BA1\u7B97\u5B57\u6BB5",roleDimension:"\u7EF4\u5EA6",roleMeasure:"\u5EA6\u91CF",tabDataModel:"\u6570\u636E\u6A21\u578B",dmTables:"{count} \u5F20\u8868",dmJoins:"{count} \u4E2A\u8FDE\u63A5",dmCustomSql:"{count} \u6BB5\u81EA\u5B9A\u4E49 SQL",dmSelectHint:"\u70B9\u51FB\u8868\u6216\u8FDE\u63A5\u7EBF\u67E5\u770B\u8BE6\u60C5",dmSqlList:"\u81EA\u5B9A\u4E49 SQL",dmConnection:"\u8FDE\u63A5",dmEmpty:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u53EF\u5C55\u793A\u7684\u6570\u636E\u6A21\u578B\u3002",dmDatasource:"\u6570\u636E\u6E90",dmPhysical:"\u7269\u7406\u8868",dmSqlText:"\u81EA\u5B9A\u4E49 SQL",dmSqlBadge:"\u81EA\u5B9A\u4E49 SQL",dmTableBadge:"\u8868",dmFrom:"\u5DE6\u8868",dmTo:"\u53F3\u8868",dmOn:"\u8FDE\u63A5\u6761\u4EF6",dmCardinality:"\u57FA\u6570",dmNotStored:"\u6587\u4EF6\u4E2D\u672A\u8BB0\u5F55\uFF08Tableau \u8FD0\u884C\u65F6\u63A8\u65AD\uFF09",joinInner:"\u5185\u8FDE\u63A5",joinLeft:"\u5DE6\u8FDE\u63A5",joinRight:"\u53F3\u8FDE\u63A5",joinFull:"\u5168\u8FDE\u63A5",joinRelationship:"\u5173\u7CFB",sqlCopy:"\u590D\u5236",paramValue:"\u5F53\u524D\u503C",paramDomain:"\u53D6\u503C\u57DF",paramRange:"\u8303\u56F4",paramFormat:"\u683C\u5F0F",paramRaw:"\u539F\u59CB\u503C",paramRawHint:"\u5DE5\u4F5C\u7C3F\u91CC\u4EE5 float64 \u539F\u6837\u5199\u5165\u7684\u503C\uFF08\u5982 0.064 \u5199\u4F5C 0.064000000000000001\uFF09",sqlCopied:"\u5DF2\u590D\u5236",wbDashboards:"\u4EEA\u8868\u677F",wbWorksheets:"\u5DE5\u4F5C\u8868",wbSheetsInDash:"{count} \u4E2A\u5DE5\u4F5C\u8868",wbHighlightHint:"\u5728\u5DE6\u4FA7\u5E03\u5C40\u56FE\u4E0A\u9AD8\u4EAE\u8BE5\u5DE5\u4F5C\u8868\uFF08\u518D\u70B9\u4E00\u6B21\u53D6\u6D88\uFF09",wbNoSheetsInDash:"\u8BE5\u4EEA\u8868\u677F\u6CA1\u6709\u5DE5\u4F5C\u8868\u3002",wbUnusedNote:"\u53E6\u6709 {count} \u4E2A\u5DE5\u4F5C\u8868\u672A\u653E\u5728\u4EFB\u4F55\u4EEA\u8868\u677F\u3002",wbNoDashboards:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u4EEA\u8868\u677F\u3002",legendParameter:"\u53C2\u6570",zoneLegendTitle:"\u56FE\u4F8B",zoneWorksheet:"\u5DE5\u4F5C\u8868",zoneFlow:"\u6D41\u5F0F\u5BB9\u5668",zoneBasic:"\u57FA\u7840\u5BB9\u5668",zoneCard:"\u5361\u7247\uFF08\u7B5B\u9009\u5668 / \u6807\u9898\u7B49\uFF09",zoneText:"\u6587\u672C",zoneEmpty:"\u7A7A\u767D",zonePadding:"\u5185\u8FB9\u8DDD {value}",zoneMargin:"\u5916\u8FB9\u8DDD {value}",zoneColor:"\u5E95\u8272",noDashboard:"\u8BF7\u9009\u62E9\u6216\u4E0A\u4F20\u4E00\u4E2A\u5305\u542B\u4EEA\u8868\u677F\u7684 .twb \u6587\u4EF6",pickerHead:"\u5B57\u6BB5\u9009\u62E9\u5668",searchLineage:"\u641C\u7D22\u5B57\u6BB5\u5E76\u9AD8\u4EAE\u2026",noMatchPeriod:"\u65E0\u5339\u914D\u5B57\u6BB5\u3002",arrowNote:"\u7BAD\u5934\u65B9\u5411\uFF1A\u4E0A\u6E38\uFF08\u5DE6\uFF09\u2192 \u4E0B\u6E38\uFF08\u53F3\uFF09",focus:"\u805A\u7126",focusAuto:"\u81EA\u52A8",focusAll:"\u5168\u90E8",focusTooltip:"\u5927\u56FE\u805A\u7126\uFF1A\u53EA\u6E32\u67D3\u9009\u4E2D\u8282\u70B9 \xB1N \u8DF3\u7684\u8840\u7F18",nodesCount:"{shown} / {total} \u8282\u70B9",fitWindow:"\u9002\u914D\u7A97\u53E3",clearHighlight:"\u6E05\u9664\u9AD8\u4EAE",subCols:"\uFF08{count} \u5217\uFF09",detailEmpty:"\u9009\u62E9\u4E00\u4E2A\u5B57\u6BB5 / \u6570\u636E\u6E90\uFF0C\u67E5\u770B\u5176\u4E0A\u4E0B\u6E38\u5F15\u7528\u5173\u7CFB\u3002",internalName:"\u5185\u90E8\u540D\uFF1A{name}",calcFormula:"\u8BA1\u7B97\u5B57\u6BB5\u516C\u5F0F",upstreamLabel:"\u4E0A\u6E38\uFF08\u8F93\u5165\uFF09",downstreamLabel:"\u4E0B\u6E38\uFF08\u4F9D\u8D56\uFF09",upstreamTitle:"\u4E0A\u6E38\u8F93\u5165",downstreamTitle:"\u4E0B\u6E38\u4F9D\u8D56",kindField:"\u5B57\u6BB5",legendDatasource:"\u6570\u636E\u6E90",legendDimension:"\u7EF4\u5EA6",legendMeasure:"\u5EA6\u91CF",legendCalc:"\u8BA1\u7B97\u5B57\u6BB5",legendUnknown:"\u672A\u89E3\u6790",laneDatasource:"\u6570\u636E\u6E90",laneRawFields:"\u539F\u59CB\u5B57\u6BB5\uFF08\u7EF4\u5EA6\u2191 / \u5EA6\u91CF\u2193\uFF09",laneCalcLayer:"\u8BA1\u7B97\u5B57\u6BB5 \xB7 \u5C42\u7EA7 {level}"},Me={panel:"TWb Viewer",appTitle:"Tableau .twb Dashboard Inspector",appSubtitle:"1:1 SVG layout \xB7 one-click Excalidraw export \xB7 datasource / field / calculation metadata \xB7 field lineage",tabLayout:"Layout",tabLineage:"Lineage",fullscreen:"\u26F6 Full screen",fullscreenTooltip:"Full screen \u2014 use the whole window for the graph",exitFullscreen:"\u2715 Exit full screen",exitFullscreenEsc:"Exit full screen (Esc)",welcomeTitle:"Upload a Tableau workbook (.twb) file to:",welcomeMeta:"datasource, field and calculation metadata",help1a:"Draw the dashboard layout ",help1b:" in SVG at 1:1 real scale, with zoom and pan;",help2a:"Export ",help2b:" in one click and annotate it by hand in Excalidraw;",help3a:"Read ",help3b:" metadata to explain definitions to clients.",helpAuto:"A built-in sample loads automatically; upload your own .twb to replace it.",helpSecurity:"For data safety, .twbx files are not parsed (packaged workbooks may embed data extracts).",statDashboards:"dashboards",statWorksheets:"worksheets",statDatasources:"datasources",statFields:"fields",statCalcs:"calculations",chooseFile:"Choose a .twb file",chooseFileBtn:"Choose .twb file",loadSample:"Load sample",loading:"Loading\u2026",sampleLoading:"Loading the built-in sample\u2026",sampleFileName:"sample.twb (built-in sample)",fileReadFailed:"Failed to read the file",parseFailed:"Failed to parse the workbook",sampleAutoLoadFailed:"Failed to auto-load the built-in sample: ",orChooseManually:". You can pick a .twb file manually.",sampleLoadFailed:"Failed to load the sample: ",twbxRejected:"For data safety this plugin does not parse .twbx (packaged workbooks may embed data extracts). In Tableau use \u201CSave As\u201D \u2192 .twb, then import that file.",zoomIn:"Zoom in +",zoomOut:"Zoom out \u2212",fit:"Fit",exportSvg:"Export SVG",exportPng:"Export PNG",exportExcalidraw:"Export Excalidraw",colCalc:"Calculation",roleDimension:"Dimension",roleMeasure:"Measure",tabDataModel:"Data model",dmTables:"{count} tables",dmJoins:"{count} joins",dmCustomSql:"{count} custom SQL",dmSelectHint:"Click a table or join for details",dmSqlList:"Custom SQL",dmConnection:"Connection",dmEmpty:"No data model to show in this workbook.",dmDatasource:"Datasource",dmPhysical:"Physical table",dmSqlText:"Custom SQL",dmSqlBadge:"Custom SQL",dmTableBadge:"Table",dmFrom:"Left table",dmTo:"Right table",dmOn:"Join condition",dmCardinality:"Cardinality",dmNotStored:"Not stored in the file (inferred by Tableau at runtime)",joinInner:"Inner join",joinLeft:"Left join",joinRight:"Right join",joinFull:"Full join",joinRelationship:"Relationship",sqlCopy:"Copy",paramValue:"Current value",paramDomain:"Domain",paramRange:"Range",paramFormat:"Format",paramRaw:"Raw",paramRawHint:"Value stored verbatim as float64 in the workbook (0.064 is written as 0.064000000000000001)",sqlCopied:"Copied",wbDashboards:"Dashboards",wbWorksheets:"Worksheets",wbSheetsInDash:"{count} worksheets",wbHighlightHint:"Highlight this worksheet in the layout (click again to clear)",wbNoSheetsInDash:"No worksheets on this dashboard.",wbUnusedNote:"{count} worksheets are not placed on any dashboard.",wbNoDashboards:"No dashboards in this workbook.",legendParameter:"Parameter",zoneLegendTitle:"Legend",zoneWorksheet:"Worksheet",zoneFlow:"Flow container",zoneBasic:"Basic container",zoneCard:"Card (filter, title\u2026)",zoneText:"Text",zoneEmpty:"Empty",zonePadding:"Padding {value}",zoneMargin:"Margin {value}",zoneColor:"Fill",noDashboard:"Choose or upload a .twb file that contains a dashboard",pickerHead:"Field picker",searchLineage:"Search and highlight fields\u2026",noMatchPeriod:"No matching fields.",arrowNote:"Arrows point upstream (left) \u2192 downstream (right)",focus:"Focus",focusAuto:"Auto",focusAll:"All",focusTooltip:"Large graphs: render only the selected node's lineage within N hops",nodesCount:"{shown} / {total} nodes",fitWindow:"Fit window",clearHighlight:"Clear highlight",subCols:" ({count} cols)",detailEmpty:"Select a field or datasource to see its upstream and downstream references.",internalName:"Internal name: {name}",calcFormula:"Calculation formula",upstreamLabel:"Upstream (inputs)",downstreamLabel:"Downstream (dependents)",upstreamTitle:"Upstream inputs",downstreamTitle:"Downstream dependents",kindField:"Field",legendDatasource:"Datasource",legendDimension:"Dimension",legendMeasure:"Measure",legendCalc:"Calculation",legendUnknown:"Unresolved",laneDatasource:"Datasource",laneRawFields:"Raw fields (dimensions \u2191 / measures \u2193)",laneCalcLayer:"Calculations \xB7 layer {level}"},Ht={zh:le,en:Me};function Ut(e,t){return t?e.replace(/\{(\w+)\}/g,(o,n)=>n in t?String(t[n]):o):e}function De(e="zh"){let t=Ht[e]??le;return(o,n)=>Ut(t[o]??le[o]??o,n)}var Be=(0,fe.createContext)(null),Ze=Be.Provider;function U(){return(0,fe.useContext)(Be)??De("zh")}var be=require("react");var ne=require("react/jsx-runtime");function Ve({onText:e,onError:t,busy:o}){let n=U(),a=(0,be.useRef)(null),[i,l]=(0,be.useState)(!1),f=r=>{if(!r)return;if(/\.twbx$/i.test(r.name)){t&&t(n("twbxRejected"));return}if(!/\.twb$/i.test(r.name)){t&&t(n("chooseFile"));return}let u=new FileReader;u.onload=()=>{e&&e(String(u.result??""),r.name)},u.onerror=()=>{t&&t(n("fileReadFailed"))},u.readAsText(r)},w=async()=>{try{let r=await fetch(me);if(!r.ok)throw new Error("HTTP "+r.status);let u=await r.text();e&&e(u,n("sampleFileName"))}catch(r){t&&t(n("sampleLoadFailed")+r.message)}};return(0,ne.jsxs)("div",{className:`uploader ${i?"drag":""}`,onDragOver:r=>{r.preventDefault(),l(!0)},onDragLeave:()=>l(!1),onDrop:r=>{r.preventDefault(),l(!1),f(r.dataTransfer.files[0])},children:[(0,ne.jsx)("input",{ref:a,type:"file",accept:".twb",style:{display:"none"},onChange:r=>f(r.target.files?.[0])}),(0,ne.jsx)("button",{className:"primary",onClick:()=>a.current?.click(),disabled:o,children:n("chooseFileBtn")}),(0,ne.jsx)("button",{onClick:w,disabled:o,children:n(o?"loading":"loadSample")})]})}var G=require("react");var he="http://www.w3.org/2000/svg";function we(e,t,o){let n=t instanceof Blob?t:new Blob([t],{type:o}),a=URL.createObjectURL(n),i=document.createElement("a");i.href=a,i.download=e,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e3)}function Ye(e){let t=[];for(let o of e)t.push(o),o.children&&o.children.length&&t.push(...Ye(o.children));return t}var ge=()=>Math.floor(Math.random()*1e5);function Ke(e){let t=Ye(e),o=[],n=1;for(let a of t){let i=a.kind==="worksheet";o.push({id:`rect-${n}`,type:"rectangle",x:Math.round(a.x),y:Math.round(a.y),width:Math.max(1,Math.round(a.w)),height:Math.max(1,Math.round(a.h)),angle:0,strokeColor:i?"#1971c2":"#868e96",backgroundColor:i?"#a5d8ff":"#ffffff",fillStyle:"solid",strokeWidth:1,strokeStyle:"solid",roughness:0,opacity:100,groupIds:[],frameId:null,roundness:null,seed:ge(),version:1,versionNonce:ge(),isDeleted:!1,boundElements:[],updated:Date.now(),link:null,locked:!1});let l=i?a.name:a.text;l&&o.push({id:`text-${n}`,type:"text",x:Math.round(a.x+6),y:Math.round(a.y+6),width:Math.max(20,Math.round(a.w)-12),height:25,angle:0,strokeColor:"#1e1e1e",backgroundColor:"transparent",fillStyle:"solid",strokeWidth:1,strokeStyle:"solid",roughness:0,opacity:100,groupIds:[],frameId:null,roundness:null,seed:ge(),version:1,versionNonce:ge(),isDeleted:!1,updated:Date.now(),link:null,locked:!1,text:l,fontSize:16,fontFamily:1,textAlign:"left",verticalAlign:"top",containerId:null,originalText:l,lineHeight:1.25,baseline:18}),n++}return JSON.stringify({type:"excalidraw",version:2,source:"twb-dashboard-inspector",elements:o,appState:{gridSize:null,viewBackgroundColor:"#ffffff"},files:{}},null,2)}var T=require("react/jsx-runtime"),re={worksheet:{fill:"#dbeafe",stroke:"#3b82f6"},text:{fill:"#ffffff",stroke:"#94a3b8"},flow:{fill:"#f1f5f9",stroke:"#cbd5e1",dash:"5 4"},vertical:{fill:"#f5f3ff",stroke:"#c4b5fd",dash:"5 4"},horizontal:{fill:"#eff6ff",stroke:"#bfdbfe",dash:"5 4"},basic:{fill:"#f8fafc",stroke:"#cbd5e1"},card:{fill:"#fef9c3",stroke:"#facc15"},image:{fill:"#ecfdf5",stroke:"#6ee7b7"},empty:{fill:"none",stroke:"#e2e8f0",dash:"3 3"},other:{fill:"#f8fafc",stroke:"#cbd5e1"}},Bt={worksheet:"zoneWorksheet",flow:"zoneFlow",basic:"zoneBasic",card:"zoneCard",text:"zoneText",empty:"zoneEmpty"};function Xe({z:e,depth:t,t:o,highlightName:n,highlight:a}){let i=e.kind==="worksheet",l=e.kind==="text",f=re[e.shape]??re.other,w=f.dash??"",r=i?Math.max(9,Math.min(15,e.h*.16)):13,u=[e.name||e.type||o("zoneBasic"),`${Math.round(e.w)} \xD7 ${Math.round(e.h)}`,e.format?.padding!==null&&e.format?.padding!==void 0?o("zonePadding",{value:e.format.padding}):null,e.format?.margin!==null&&e.format?.margin!==void 0?o("zoneMargin",{value:e.format.margin}):null,e.format?.background?`${o("zoneColor")} ${e.format.background}`:null].filter(Boolean).join(" \xB7 ");return(0,T.jsxs)("g",{children:[(0,T.jsx)("title",{children:u}),(0,T.jsx)("rect",{x:e.x,y:e.y,width:Math.max(1,e.w),height:Math.max(1,e.h),fill:f.fill,stroke:a?"#1d4ed8":f.stroke,strokeWidth:a?3:1,strokeDasharray:w,rx:2}),i&&e.h>22&&(0,T.jsx)("text",{x:e.x+e.w/2,y:e.y+e.h/2,textAnchor:"middle",dominantBaseline:"middle",fontSize:r,fontWeight:"600",fill:"#1e3a8a",children:e.name}),l&&(0,T.jsx)("text",{x:e.x+6,y:e.y+Math.min(18,e.h-4),fontSize:13,fill:"#334155",children:e.text.length>60?e.text.slice(0,60)+"\u2026":e.text}),!i&&!l&&t>0&&e.type&&e.h>26&&(0,T.jsx)("text",{x:e.x+4,y:e.y+12,fontSize:9,fill:"#94a3b8",children:e.type}),e.children&&e.children.map((p,s)=>(0,T.jsx)(Xe,{z:p,depth:t+1,t:o,highlightName:n,highlight:n!==null&&p.kind==="worksheet"&&p.name===n},s))]})}function Qe({dashboard:e,highlightSheet:t=null}){let o=U(),n=(0,G.useRef)(null),a=(0,G.useRef)(null),[i,l]=(0,G.useState)(.2),[f,w]=(0,G.useState)(0),[r,u]=(0,G.useState)(0),p=(0,G.useRef)(null),s=e?.width||0,k=e?.height||0,v=(0,G.useCallback)(()=>{let b=n.current;if(!b||!s||!k)return;let C=Math.min((b.clientWidth-24)/s,(b.clientHeight-24)/k),O=Math.min(1,C);l(O),w(Math.max(8,(b.clientWidth-s*O)/2)),u(12)},[s,k]);(0,G.useEffect)(()=>{v()},[v,e]),(0,G.useEffect)(()=>{let b=n.current;if(!b)return;let C=new ResizeObserver(()=>v());return C.observe(b),()=>C.disconnect()},[v]);let g=b=>{b.preventDefault();let C=n.current;if(!C)return;let O=C.getBoundingClientRect(),H=b.clientX-O.left,W=b.clientY-O.top,Z=b.deltaY<0?1.1:1/1.1,K=Math.min(4,Math.max(.02,i*Z)),X=K/i;w(H-(H-f)*X),u(W-(W-r)*X),l(K)},d=b=>{p.current={x:b.clientX,y:b.clientY,tx:f,ty:r}},m=b=>{p.current&&(w(p.current.tx+(b.clientX-p.current.x)),u(p.current.ty+(b.clientY-p.current.y)))},M=()=>{p.current=null},R=()=>{let b=document.createElementNS(he,"svg");b.setAttribute("xmlns",he),b.setAttribute("width",String(s)),b.setAttribute("height",String(k)),b.setAttribute("viewBox",`0 0 ${s} ${k}`);let C=document.createElementNS(he,"rect");return C.setAttribute("x","0"),C.setAttribute("y","0"),C.setAttribute("width",String(s)),C.setAttribute("height",String(k)),C.setAttribute("fill","#ffffff"),b.appendChild(C),a.current&&b.appendChild(a.current.cloneNode(!0)),`<?xml version="1.0" encoding="UTF-8"?>
`+new XMLSerializer().serializeToString(b)},L=e?.name||"dashboard",A=()=>we(`${L}.svg`,R(),"image/svg+xml"),S=()=>{let b=R(),C=new Image,O=new Blob([b],{type:"image/svg+xml;charset=utf-8"}),H=URL.createObjectURL(O);C.onload=()=>{let W=document.createElement("canvas");W.width=s*2,W.height=k*2;let Z=W.getContext("2d");Z&&(Z.fillStyle="#fff",Z.fillRect(0,0,W.width,W.height),Z.drawImage(C,0,0,W.width,W.height),URL.revokeObjectURL(H),W.toBlob(K=>{K&&we(`${L}.png`,K,"image/png")},"image/png"))},C.onerror=()=>URL.revokeObjectURL(H),C.src=H},D=()=>{e&&we(`${L}.excalidraw`,Ke(e.zones),"application/json")};return e?(0,T.jsxs)("div",{className:"canvas-wrap",children:[(0,T.jsxs)("div",{className:"canvas-toolbar",children:[(0,T.jsxs)("div",{className:"tb-left",children:[(0,T.jsx)("span",{className:"dash-title",children:e.name}),(0,T.jsxs)("span",{className:"dash-dim",children:[s," \xD7 ",k," px"]})]}),(0,T.jsxs)("div",{className:"tb-right",children:[(0,T.jsx)("button",{onClick:()=>l(b=>Math.min(4,b*1.15)),children:o("zoomIn")}),(0,T.jsx)("button",{onClick:()=>l(b=>Math.max(.02,b/1.15)),children:o("zoomOut")}),(0,T.jsx)("button",{onClick:v,children:o("fit")}),(0,T.jsxs)("span",{className:"zoom-label",children:[Math.round(i*100),"%"]}),(0,T.jsx)("span",{className:"tb-sep"}),(0,T.jsx)("button",{onClick:A,children:o("exportSvg")}),(0,T.jsx)("button",{onClick:S,children:o("exportPng")}),(0,T.jsx)("button",{className:"primary",onClick:D,children:o("exportExcalidraw")})]})]}),(0,T.jsxs)("div",{className:"zone-legend",children:[(0,T.jsx)("span",{className:"zl-title",children:o("zoneLegendTitle")}),["worksheet","flow","basic","card","text","empty"].map(b=>(0,T.jsxs)("span",{className:"zl-item",children:[(0,T.jsx)("span",{className:"zl-swatch",style:{background:re[b].fill==="none"?"transparent":re[b].fill,borderColor:re[b].stroke,borderStyle:re[b].dash?"dashed":"solid"}}),o(Bt[b])]},b))]}),(0,T.jsx)("div",{ref:n,className:"canvas-viewport",onWheel:g,onMouseDown:d,onMouseMove:m,onMouseUp:M,onMouseLeave:M,children:(0,T.jsxs)("svg",{width:s,height:k,style:{transform:`translate(${f}px, ${r}px) scale(${i})`,transformOrigin:"0 0"},children:[(0,T.jsx)("rect",{x:0,y:0,width:s,height:k,fill:"#ffffff"}),(0,T.jsx)("g",{ref:a,children:e.zones.map((b,C)=>(0,T.jsx)(Xe,{z:b,depth:0,t:o,highlightName:t??null,highlight:t!==null&&b.kind==="worksheet"&&b.name===t},C))})]})}),(0,T.jsxs)("div",{className:"legend",children:[(0,T.jsxs)("span",{children:[(0,T.jsx)("i",{className:"sw sw-ws"})," \u5DE5\u4F5C\u8868"]}),(0,T.jsxs)("span",{children:[(0,T.jsx)("i",{className:"sw sw-ct"})," \u5BB9\u5668/\u5E03\u5C40"]}),(0,T.jsxs)("span",{children:[(0,T.jsx)("i",{className:"sw sw-tx"})," \u6587\u672C"]})]})]}):(0,T.jsx)("div",{className:"canvas-empty",children:o("noDashboard")})}var Se=require("react");var _=require("react/jsx-runtime");function xe(e){return e.flatMap(t=>[t,...xe(t.children)])}function Je({model:e,dashIdx:t,onSelectDashboard:o,highlightSheet:n,onHighlightSheet:a}){let i=U(),l=e.dashboards[t]??null,f=(0,Se.useMemo)(()=>{if(!l)return[];let r=new Set,u=[];for(let p of xe(l.zones))p.kind==="worksheet"&&p.name&&!r.has(p.name)&&(r.add(p.name),u.push(p.name));return u},[l]),w=(0,Se.useMemo)(()=>{let r=new Set;for(let u of e.dashboards)for(let p of xe(u.zones))p.kind==="worksheet"&&p.name&&r.add(p.name);return e.worksheets.filter(u=>!r.has(u)).length},[e]);return(0,_.jsxs)("div",{className:"wb-panel",children:[(0,_.jsxs)("section",{className:"wb-section",children:[(0,_.jsxs)("h3",{className:"wb-section-title",children:[i("wbDashboards"),(0,_.jsx)("span",{className:"wb-count",children:e.dashboards.length})]}),(0,_.jsxs)("ul",{className:"wb-list",children:[e.dashboards.map((r,u)=>{let s=xe(r.zones).filter(k=>k.kind==="worksheet").length;return(0,_.jsx)("li",{children:(0,_.jsxs)("button",{className:`wb-item${u===t?" active":""}`,onClick:()=>o(u),title:r.name,children:[(0,_.jsx)("span",{className:"wb-item-name",children:r.name}),(0,_.jsx)("span",{className:"wb-item-meta",children:i("wbSheetsInDash",{count:s})})]})},u)}),e.dashboards.length===0&&(0,_.jsx)("li",{className:"wb-empty",children:i("wbNoDashboards")})]})]}),(0,_.jsxs)("section",{className:"wb-section",children:[(0,_.jsxs)("h3",{className:"wb-section-title",children:[i("wbWorksheets"),(0,_.jsx)("span",{className:"wb-count",children:f.length})]}),(0,_.jsxs)("ul",{className:"wb-list",children:[f.map(r=>(0,_.jsx)("li",{children:(0,_.jsx)("button",{className:`wb-item wb-sheet${n===r?" highlight":""}`,onClick:()=>a(n===r?null:r),title:i("wbHighlightHint"),children:(0,_.jsx)("span",{className:"wb-item-name",children:r})})},r)),f.length===0&&(0,_.jsx)("li",{className:"wb-empty",children:i("wbNoSheetsInDash")})]}),w>0&&(0,_.jsx)("p",{className:"wb-note",children:i("wbUnusedNote",{count:w})})]})]})}var F=require("react");var J=176,ae=48,ce=128,et=60,tt=14,ot=44,nt=24,rt=20,ke={datasource:{fill:"#e7f5ff",stroke:"#1971c2",tag:"\u6570\u636E\u6E90"},dimension:{fill:"#ffe8cc",stroke:"#f08c00",tag:"\u7EF4\u5EA6"},measure:{fill:"#d3f9d8",stroke:"#2f9e44",tag:"\u5EA6\u91CF"},calc:{fill:"#f3e8ff",stroke:"#7048e8",tag:"\u8BA1\u7B97\u5B57\u6BB5"},parameter:{fill:"#cffafe",stroke:"#0891b2",tag:"\u53C2\u6570"},unknown:{fill:"#f1f3f5",stroke:"#ced4da",tag:"\u672A\u77E5"}};function pe(e){return e.kind==="datasource"?"datasource":e.kind==="unknown"?"unknown":e.isParameter?"parameter":e.isCalc?"calc":e.role==="dimension"?"dimension":"measure"}function Zt(e){if(!e)return[];let t=[],o=/\[([^\]]+)\]/g,n;for(;n=o.exec(e);)t.push(n[1]);return t}function at(e){let t=[],o=[],n=[],a=new Set,i=new Map,l=new Map,f=new Map,w=new Map;return e.datasources.forEach((r,u)=>{let p="ds:"+u;a.add(p),t.push({id:p,kind:"datasource",label:r.caption||r.name||"\u6570\u636E\u6E90 "+(u+1),name:r.name,dsIdx:u}),n.push(p);for(let s of r.columns){let k=oe(s.name),v="f:"+u+":"+k,g=!!s.formulaRaw;a.add(v),t.push({id:v,kind:"field",label:s.label,caption:s.caption,name:s.name,role:s.role,isCalc:g,isParameter:s.isParameter?!0:void 0,parameter:s.isParameter?s.parameter??null:void 0,dsIdx:u,formula:s.formula,formulaRaw:s.formulaRaw}),i.set(u+"|"+k,v),f.has(k)||f.set(k,v),s.caption&&(l.set(u+"|"+s.caption,v),w.has(s.caption)||w.set(s.caption,v)),g||o.push({from:p,to:v})}for(let s of r.columns){if(!s.formulaRaw)continue;let k="f:"+u+":"+oe(s.name),v=new Set;for(let g of Zt(s.formulaRaw)){let d=oe(g),m=i.get(u+"|"+d)||f.get(d);if(m||(m=l.get(u+"|"+g)||w.get(g)),m&&m!==k&&!v.has(m))v.add(m),o.push({from:k,to:m});else if(!m&&!v.has(g)){v.add(g);let M="u:"+u+":"+d;a.has(M)||(a.add(M),t.push({id:M,kind:"unknown",label:g,name:g,dsIdx:u})),o.push({from:k,to:M})}}}}),{nodes:t,edges:o,dsNodes:n}}function st(e){let t=new Map,o=new Map;for(let n of e)t.has(n.from)||t.set(n.from,[]),t.get(n.from).push(n.to),o.has(n.to)||o.set(n.to,[]),o.get(n.to).push(n.from);return{out:t,inc:o}}function Vt(e,t){let{out:o}=st(t),n=new Set,a=[...o.get(e)||[]];for(;a.length;){let i=a.pop();if(!n.has(i)){n.add(i);for(let l of o.get(i)||[])a.push(l)}}return n}function Yt(e,t){let{inc:o}=st(t),n=new Set,a=[...o.get(e)||[]];for(;a.length;){let i=a.pop();if(!n.has(i)){n.add(i);for(let l of o.get(i)||[])a.push(l)}}return n}function it(e,t){return{self:new Set([e]),upstream:Vt(e,t),downstream:Yt(e,t)}}function lt(e,t){let o=new Map,n=new Map;e.forEach(g=>{o.set(g.id,new Set),n.set(g.id,g)}),t.forEach(g=>{g.from.startsWith("ds:")||o.has(g.from)&&o.get(g.from).add(g.to)});let a=new Map,i=new Set,l=g=>{if(a.has(g))return a.get(g);if(i.has(g))return 1;i.add(g);let d=o.get(g),m=0;if(d&&d.size){for(let M of d)m=Math.max(m,l(M));m+=1}else{let M=n.get(g);m=M&&M.kind==="datasource"?0:1}return i.delete(g),a.set(g,m),m};e.forEach(g=>l(g.id));let f=new Map;e.forEach(g=>{let d=a.get(g.id)??0;f.has(d)||f.set(d,[]),f.get(d).push(g)}),f.forEach((g,d)=>{d===1&&g.sort((m,M)=>{let R=m.role==="dimension"?0:1,L=M.role==="dimension"?0:1;return R-L})});let w={},r=[],u=nt,p=0,s=[];[...f.keys()].sort((g,d)=>g-d).forEach(g=>{let d=f.get(g),m=d.length,M=m>rt?Math.ceil(m/rt):1,R=Math.ceil(m/M),L=[];for(let S=0;S<M;S++){let D=Math.min(m,(S+1)*R)-S*R;L.push(D*ae+(D-1)*tt)}let A=Math.max(0,...L);s.push({layer:g,arr:d,subCols:M,perCol:R,laneH:A}),p=Math.max(p,A)}),s.forEach(({layer:g,arr:d,subCols:m,perCol:M,laneH:R})=>{let L=ot+Math.max(0,(p-R)/2),A=m*J+(m-1)*et;d.forEach((S,D)=>{let b=Math.floor(D/M),C=D%M;w[S.id]={x:u+b*(J+et),y:L+C*(ae+tt)}}),r.push({layer:g,x:u,right:u+A,width:A,count:d.length,subCols:m,label:g===0?"\u6570\u636E\u6E90":g===1?"\u539F\u59CB\u5B57\u6BB5\uFF08\u7EF4\u5EA6\u2191 / \u5EA6\u91CF\u2193\uFF09":`\u8BA1\u7B97\u5B57\u6BB5 \xB7 \u5C42\u7EA7 ${g-1}`}),u+=A+ce}),r.sort((g,d)=>g.layer-d.layer);let k=Math.max(0,u-ce)+nt,v=ot+p+48;return{pos:w,lanes:r,width:k,height:v}}function ye(e){if(e==null)return null;let t=typeof e=="number"?e:Number(String(e).trim());if(!Number.isFinite(t))return null;let o=Number(t.toPrecision(12));return Number.isFinite(o)?o:t}function ue(e){return new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(e)}function Kt(e){let t=/^[pP](\d*(?:\.\d+)?)%?$/.exec(e.trim())||/^(\d+(?:\.\d+)?)%$/.exec(e.trim());if(!t)return null;let o=t[1];return o===void 0||o===""?0:o.includes(".")?(o.split(".")[1]||"").length:Number(o)}function Xt(e){return/^[cC]/.test(e.trim())?/^[cC]2052/.test(e.trim())?"\xA5":/^[cC]1033/.test(e.trim())?"$":"\xA5":null}function dt(e,t){if(e==null||e==="")return"\u2014";let o=String(e),n=ye(o);if(n===null)return o;let a=(t??"").trim(),i=Kt(a);if(i!==null)return`${(n*100).toFixed(i)}%`;let l=Xt(a);return l?`${l}${ue(n)}`:ue(n)}function Ce(e){if(!e||e.min===null&&e.max===null)return null;let t=ye(e.min),o=ye(e.max),n=ye(e.granularity),a=[];return(t!==null||o!==null)&&a.push(`${t!==null?ue(t):"\u2014"} ~ ${o!==null?ue(o):"\u2014"}`),n!==null&&a.push(`\u6B65\u957F ${ue(n)}`),a.join(" \xB7 ")}var ut=require("react");var Qt=new Set(["IF","THEN","ELSE","ELSEIF","END","CASE","WHEN","AND","OR","NOT","IN","NULL","TRUE","FALSE","BETWEEN","LIKE","IS","AS"]),Jt=new Set(["SUM","AVG","MIN","MAX","COUNT","COUNTD","ATTR","MEDIAN","STDEV","STDEVP","VAR","VARP","ZN","MODE","ABS","ROUND","FLOOR","CEILING","CEIL","SIGN","SQRT","POWER","EXP","LN","LOG","IFNULL","ISNULL","NULLIF","IIF","RUNNING_SUM","RUNNING_AVG","RUNNING_MIN","RUNNING_MAX","WINDOW_SUM","WINDOW_AVG","WINDOW_MIN","WINDOW_MAX","LOOKUP","PREVIOUS_VALUE","RANK","RANK_UNIQUE","RANK_DENSE","RANK_MODIFIED","INDEX","SIZE","FIRST","LAST","TOTAL","DATE","DATEPARSE","DATENAME","DATEPART","DATEADD","DATEDIFF","DATETRUNC","YEAR","QUARTER","MONTH","DAY","WEEK","HOUR","MINUTE","SECOND","TODAY","NOW","MAKEDATE","MAKEDATETIME","MAKETIME","ISOYEAR","LEFT","RIGHT","MID","LEN","CONTAINS","FIND","FINDNTH","REPLACE","REGEXP_EXTRACT","REGEXP_MATCH","REGEXP_REPLACE","SPLIT","UPPER","LOWER","TRIM","LTRIM","RTRIM","SPACE","ASCII","CHAR","STRING","FLOAT","INT","BOOL","DATETIME"]),eo=[["comment",/\/\/[^\n]*|\/\*[\s\S]*?\*\//],["string",/'(?:[^'\\]|\\.)*'/],["field",/\[[^\]]*\]/],["number",/\d+(?:\.\d+)?/],["ident",/[A-Za-z_][A-Za-z0-9_]*/],["ws",/\s+/],["other",/[^\s]/]];function ct(e){let t=[],o=e;for(;o.length>0;){let n=!1;for(let[a,i]of eo){let l=i.exec(o);if(l&&l.index===0){t.push({type:a,value:l[0]}),o=o.slice(l[0].length),n=!0;break}}n||(t.push({type:"other",value:o[0]}),o=o.slice(1))}return t}function pt(e){switch(e.type){case"comment":return"fh-comment";case"string":return"fh-string";case"field":return"fh-field";case"number":return"fh-number";case"ident":{let t=e.value.toUpperCase();return Qt.has(t)?"fh-kw":Jt.has(t)?"fh-fn":"fh-ident"}default:return"fh-other"}}var ve=require("react/jsx-runtime");function mt({formula:e}){if(!e)return null;let t=ct(e);return(0,ve.jsx)("code",{className:"formula-hl",children:t.map((o,n)=>o.type==="ws"?(0,ve.jsx)(ut.Fragment,{children:o.value},n):(0,ve.jsx)("span",{className:pt(o),children:o.value},n))})}var h=require("react/jsx-runtime");function to(e){return[["all",e("focusAll")],["calc",e("colCalc")],["dimension",e("roleDimension")],["measure",e("roleMeasure")],["parameter",e("legendParameter")]]}function oo(e,t){return t===0?e("laneDatasource"):t===1?e("laneRawFields"):e("laneCalcLayer",{level:t-1})}var no=1200;function ft({model:e}){let t=U(),{nodes:o,edges:n}=(0,F.useMemo)(()=>at(e),[e]),a=(0,F.useMemo)(()=>new Map(o.map(c=>[c.id,c])),[o]),[i,l]=(0,F.useState)(null),[f,w]=(0,F.useState)(""),[r,u]=(0,F.useState)("all"),[p,s]=(0,F.useState)("auto"),[k,v]=(0,F.useState)({x:40,y:20,k:1}),g=(0,F.useRef)(null),d=(0,F.useRef)(null),m=(0,F.useRef)(!1),M=p==="all"?1/0:p==="auto"?o.length>no?2:1/0:Number(p),R=(0,F.useMemo)(()=>{if(!i||M===1/0)return{nodes:o,edges:n};let c=new Set([i]),y=new Set([i]);for(let z=0;z<M&&y.size;z++){let j=new Set;for(let $ of n)y.has($.from)&&!c.has($.to)?(c.add($.to),j.add($.to)):y.has($.to)&&!c.has($.from)&&(c.add($.from),j.add($.from));y=j}return{nodes:o.filter(z=>c.has(z.id)),edges:n.filter(z=>c.has(z.from)&&c.has(z.to))}},[o,n,i,M]),L=(0,F.useMemo)(()=>lt(R.nodes,R.edges),[R]),A=R.nodes.length!==o.length,S=(0,F.useMemo)(()=>i?it(i,n):null,[i,n]),D=(0,F.useMemo)(()=>S?new Set([...S.self,...S.upstream,...S.downstream]):null,[S]),b=()=>{let c=g.current;if(!c)return;let y=c.getBoundingClientRect();if(!y||y.width===0)return;let z=Math.min((y.width-24)/L.width,(y.height-24)/L.height,1);v({x:Math.max(8,(y.width-L.width*z)/2),y:12,k:z})};(0,F.useEffect)(()=>{let c=requestAnimationFrame(b);return()=>cancelAnimationFrame(c)},[L]),(0,F.useEffect)(()=>{let c=g.current;if(!c)return;let y=new ResizeObserver(()=>b());return y.observe(c),()=>y.disconnect()},[b]);let C=(0,F.useCallback)(c=>{if(!d.current)return;let y=c.clientX-d.current.x,z=c.clientY-d.current.y;(Math.abs(y)>3||Math.abs(z)>3)&&(d.current.moved=!0);let j=Number.isFinite(d.current.vx+y)?d.current.vx+y:0,$=Number.isFinite(d.current.vy+z)?d.current.vy+z:0;v(Q=>({...Q,x:j,y:$}))},[]),O=(0,F.useCallback)(()=>{d.current&&(m.current=!!d.current.moved,window.removeEventListener("pointermove",C),window.removeEventListener("pointerup",O),window.removeEventListener("blur",O),d.current=null)},[C]),H=(0,F.useCallback)(c=>{c.button===0&&(d.current={x:c.clientX,y:c.clientY,vx:k.x,vy:k.y,moved:!1},window.addEventListener("pointermove",C),window.addEventListener("pointerup",O),window.addEventListener("blur",O))},[k.x,k.y,C,O]),W=c=>{if(c.target===g.current){if(m.current){m.current=!1;return}l(null)}},Z=(0,F.useMemo)(()=>o.filter(c=>c.kind==="field"),[o]),K=(0,F.useMemo)(()=>{let c=f.trim().toLowerCase();return Z.filter(y=>!(r==="parameter"&&!y.isParameter||r==="calc"&&(!y.isCalc||y.isParameter)||r==="dimension"&&(y.isParameter||y.role!=="dimension")||r==="measure"&&(y.isParameter||y.role!=="measure")||c&&!String(y.label).toLowerCase().includes(c)&&!String(y.name).toLowerCase().includes(c)))},[Z,r,f]),X=(0,F.useMemo)(()=>{let c=f.trim().toLowerCase();return c?new Set(Z.filter(y=>String(y.label).toLowerCase().includes(c)||String(y.name).toLowerCase().includes(c)).map(y=>y.id)):null},[Z,f]),P=i?a.get(i):null,Le=S?S.upstream.size:0,Re=S?S.downstream.size:0,Ae=c=>S?D?.has(c.from)&&D.has(c.to)?"ln-edge-hl":"ln-edge-dim":X?X.has(c.from)&&X.has(c.to)?"ln-edge-hl":"ln-edge-dim":"",vt=c=>S?S.self.has(c.id)?"ln-self":S.upstream.has(c.id)?"ln-up":S.downstream.has(c.id)?"ln-down":"ln-dim":X?X.has(c.id)?"ln-search":"ln-dim":"";return(0,h.jsxs)("div",{className:"lineage",children:[(0,h.jsxs)("aside",{className:"lineage-picker",children:[(0,h.jsx)("div",{className:"picker-head",children:t("pickerHead")}),(0,h.jsx)("input",{className:"ft-search",placeholder:t("searchLineage"),value:f,onChange:c=>w(c.target.value)}),(0,h.jsx)("div",{className:"role-tabs",children:to(t).map(([c,y])=>(0,h.jsx)("button",{className:r===c?"rt active":"rt",onClick:()=>u(c),children:y},c))}),(0,h.jsxs)("div",{className:"picker-list",children:[K.map(c=>(0,h.jsx)("button",{className:`picker-item cat-${pe(c)}${i===c.id?" active":""}`,onClick:()=>l(c.id),title:c.name??void 0,children:c.label},c.id)),K.length===0&&(0,h.jsx)("p",{className:"muted",children:t("noMatchPeriod")})]})]}),(0,h.jsxs)("section",{className:"lineage-canvas",children:[(0,h.jsxs)("div",{className:"lineage-toolbar",children:[(0,h.jsxs)("div",{className:"legend",children:[Object.entries(ke).map(([c,y])=>(0,h.jsxs)("span",{className:"lg",children:[(0,h.jsx)("i",{style:{background:y.fill,borderColor:y.stroke}}),y.tag]},c)),(0,h.jsx)("span",{className:"lg-note",children:t("arrowNote")})]}),(0,h.jsxs)("div",{className:"toolbar-actions",children:[(0,h.jsxs)("span",{className:"focus-seg",title:t("focusTooltip"),children:[t("focus"),[["auto",t("focusAuto")],["1","\xB11"],["2","\xB12"],["3","\xB13"],["all",t("focusAll")]].map(([c,y])=>(0,h.jsx)("button",{className:p===c?"active":"",onClick:()=>s(c),children:y},c))]}),A&&(0,h.jsx)("span",{className:"focus-count",children:t("nodesCount",{shown:R.nodes.length,total:o.length})}),(0,h.jsx)("button",{onClick:b,children:t("fitWindow")}),(0,h.jsx)("button",{onClick:()=>l(null),children:t("clearHighlight")})]})]}),(0,h.jsxs)("svg",{ref:g,className:"lineage-svg",onPointerDown:H,onClick:W,children:[(0,h.jsxs)("defs",{children:[(0,h.jsx)("marker",{id:"ln-arrow",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:(0,h.jsx)("path",{d:"M0,0 L10,5 L0,10 z",fill:"#868e96"})}),(0,h.jsx)("marker",{id:"ln-arrow-hl",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:(0,h.jsx)("path",{d:"M0,0 L10,5 L0,10 z",fill:"#1971c2"})})]}),(0,h.jsxs)("g",{transform:`translate(${k.x},${k.y}) scale(${k.k})`,children:[L.lanes.map(c=>(0,h.jsxs)("g",{children:[c.layer!==0&&(0,h.jsx)("line",{className:"ln-lane-line",x1:c.x-ce/2,y1:0,x2:c.x-ce/2,y2:Math.max(0,L.height-48)}),(0,h.jsxs)("text",{className:"ln-lane-label",x:c.x+c.width/2,y:20,textAnchor:"middle",children:[oo(t,c.layer),c.subCols>1?t("subCols",{count:c.subCols}):""]})]},"lane-"+c.layer)),R.edges.map((c,y)=>{let z=L.pos[c.from],j=L.pos[c.to];if(!z||!j)return null;let $=z.x<=j.x?z:j,Q=z.x<=j.x?j:z,se=$.x+J,ee=$.y+ae/2,te=Q.x,Fe=Q.y+ae/2,Pe=Math.max(30,Math.abs(te-se)/2),Nt=`M${se},${ee} C${se+Pe},${ee} ${te-Pe},${Fe} ${te},${Fe}`,Et=Ae(c)==="ln-edge-hl";return(0,h.jsx)("path",{d:Nt,className:"ln-edge "+Ae(c),markerEnd:"url(#"+(Et?"ln-arrow-hl":"ln-arrow")+")"},y)}),R.nodes.map(c=>{let y=L.pos[c.id];if(!y)return null;let z=pe(c),j=ke[z],$=Ue(c.label),Q=13,se=24-($.length-1)*Q/2+10;return(0,h.jsxs)("g",{className:"ln-node "+vt(c),transform:`translate(${y.x},${y.y})`,onClick:ee=>{ee.stopPropagation(),l(c.id)},style:{cursor:"pointer"},children:[(0,h.jsx)("rect",{width:J,height:ae,rx:9,className:"ln-rect",style:{fill:j.fill,stroke:j.stroke}}),(0,h.jsx)("text",{className:"ln-label",x:J/2,textAnchor:"middle",children:$.map((ee,te)=>(0,h.jsx)("tspan",{x:J/2,y:se+te*Q,children:ee},te))})]},c.id)})]})]})]}),(0,h.jsxs)("aside",{className:"lineage-detail",children:[!P&&(0,h.jsx)("div",{className:"detail-empty",children:t("detailEmpty")}),P&&(0,h.jsxs)("div",{className:"detail-body",children:[(0,h.jsx)("div",{className:"detail-head",children:P.label}),(0,h.jsxs)("div",{className:"detail-meta",children:[(0,h.jsx)("span",{className:`pill cat-${pe(P)}`,children:ke[pe(P)].tag}),P.kind==="field"&&!P.isParameter&&(0,h.jsx)("span",{className:"pill",children:P.role==="dimension"?t("roleDimension"):P.role==="measure"?t("roleMeasure"):t("kindField")})]}),P.isParameter&&(0,h.jsxs)("div",{className:"detail-param",children:[(0,h.jsxs)("div",{className:"dp-value",children:[(0,h.jsx)("span",{className:"dp-label",children:t("paramValue")}),(0,h.jsx)("span",{className:"dp-num",children:dt(P.parameter?.value,P.parameter?.defaultFormat)})]}),(0,h.jsxs)("div",{className:"dp-meta",children:[(0,h.jsxs)("span",{children:[t("paramDomain"),": ",P.parameter?.domainType??"\u2014"]}),Ce(P.parameter?.range)&&(0,h.jsxs)("span",{children:[t("paramRange"),": ",Ce(P.parameter?.range)]}),(0,h.jsxs)("span",{children:[t("paramFormat"),": ",P.parameter?.defaultFormat??"\u2014"]})]}),(0,h.jsxs)("div",{className:"dp-raw",title:t("paramRawHint"),children:[t("paramRaw"),": ",P.parameter?.value??"\u2014"]})]}),P.kind==="field"&&(0,h.jsx)("div",{className:"detail-internal",title:P.name??void 0,children:t("internalName",{name:P.name??""})}),P.formulaRaw&&(0,h.jsxs)("div",{className:"detail-formula",children:[(0,h.jsx)("div",{className:"df-title",children:t("calcFormula")}),(0,h.jsx)("pre",{className:"calc-formula",children:(0,h.jsx)(mt,{formula:P.formula||P.formulaRaw})})]}),(0,h.jsxs)("div",{className:"detail-counts",children:[(0,h.jsxs)("div",{className:"dc up",children:[(0,h.jsx)("span",{className:"dc-num",children:Le}),(0,h.jsx)("span",{className:"dc-lbl",children:t("upstreamLabel")})]}),(0,h.jsxs)("div",{className:"dc down",children:[(0,h.jsx)("span",{className:"dc-num",children:Re}),(0,h.jsx)("span",{className:"dc-lbl",children:t("downstreamLabel")})]})]}),S&&Le>0&&(0,h.jsxs)("div",{className:"detail-list",children:[(0,h.jsx)("div",{className:"dl-title ln-up",children:t("upstreamTitle")}),[...S.upstream].map(c=>{let y=a.get(c);return(0,h.jsx)("button",{className:"dl-item",onClick:()=>l(c),children:y?y.label:c},c)})]}),S&&Re>0&&(0,h.jsxs)("div",{className:"detail-list",children:[(0,h.jsx)("div",{className:"dl-title ln-down",children:t("downstreamTitle")}),[...S.downstream].map(c=>{let y=a.get(c);return(0,h.jsx)("button",{className:"dl-item",onClick:()=>l(c),children:y?y.label:c},c)})]})]})]})]})}var Y=require("react");function bt(e){let t=[],o=[],n=new Set;return e.datasources.forEach((a,i)=>{let l=a.dataModel;if(!l||l.tables.length===0)return;let f=a.caption||`#${i+1}`,w=(r,u,p,s)=>`ds${i}:${p}:${r}:${u??""}:${s??""}`;for(let r of l.tables){let u=w(r.name,r.table,r.kind,r.objectId);n.has(u)||(n.add(u),t.push({id:u,label:r.name,sublabel:r.table||null,kind:r.kind,datasource:f,connection:a.connection??null,sql:r.sql}))}l.joins.forEach((r,u)=>{let p=w(r.left.name,r.left.table,r.left.kind,r.left.objectId),s=w(r.right.name,r.right.table,r.right.kind,r.right.objectId);!n.has(p)||!n.has(s)||o.push({id:`ds${i}:join${u}`,from:p,to:s,joinType:r.joinType,leftExpr:r.leftExpr,rightExpr:r.rightExpr,cardinality:r.cardinality,datasource:f})})}),{nodes:t,edges:o}}function gt(e){let{nodes:t,edges:o}=e,n=new Map;for(let s of t)n.set(s.id,[]);for(let s of o)n.get(s.to)?.push(s.from);let a=new Map;for(let s of t)(n.get(s.id)||[]).length===0&&a.set(s.id,0);for(let s of t)a.has(s.id)||a.set(s.id,0);for(let s=0;s<t.length;s++){let k=!1;for(let v of o){let g=a.get(v.from)??0;(a.get(v.to)??0)<g+1&&(a.set(v.to,g+1),k=!0)}if(!k)break}let i=new Map;for(let s of t){let k=a.get(s.id)??0;i.has(k)||i.set(k,[]),i.get(k).push(s)}let l=[...i.keys()].sort((s,k)=>s-k),f={},w=s=>(f[s]?.y??24)+56/2;l.forEach((s,k)=>{let v=i.get(s).slice(),g=24+k*288;if(s===0){let D=24;for(let b of v)f[b.id]={x:g,y:D},D+=78;return}let d=v.map(D=>{let C=(n.get(D.id)||[]).map(w),O=C.length?C.reduce((H,W)=>H+W,0)/C.length:24+56/2;return{node:D,anchor:O}});d.sort((D,b)=>D.anchor-b.anchor);let m=[],M=24;for(let D of d){let b=Math.max(M,D.anchor-28);m.push({id:D.node.id,top:b,anchor:D.anchor}),M=b+56+22}let R=m[0].top,L=m[m.length-1].top+56,A=m.reduce((D,b)=>D+b.anchor,0)/m.length,S=Math.max(A-(R+L)/2,24-R);for(let D of m)f[D.id]={x:g,y:D.top+S}});let r=t.length?Math.max(...t.map(s=>f[s.id].y+56)):56,u=48+l.length*168+Math.max(0,l.length-1)*120,p=r+24;return{pos:f,layers:l.length,width:Math.max(u,320),height:Math.max(p,160)}}function ht(e,t,o=168,n=56){let a=e.x+o,i=e.y+n/2,l=t.x,f=t.y+n/2,w=l-a;if(w>8){let p=Math.min(Math.max(w*.45,28),130);return`M ${a} ${i} C ${a+p} ${i}, ${l-p} ${f}, ${l} ${f}`}let r=Math.max(56,Math.abs(f-i)/2+40),u=(a+l)/2;return`M ${a} ${i} Q ${u} ${Math.min(i,f)-r}, ${l} ${f}`}var x=require("react/jsx-runtime");function wt(e,t){return{inner:e("joinInner"),left:e("joinLeft"),right:e("joinRight"),full:e("joinFull"),relationship:e("joinRelationship")}[t]??t}function xt({model:e}){let t=U(),o=(0,Y.useMemo)(()=>bt(e),[e]),n=(0,Y.useMemo)(()=>gt(o),[o]),[a,i]=(0,Y.useState)(null),[l,f]=(0,Y.useState)(!1),w=d=>{navigator.clipboard?.writeText(d).then(()=>{f(!0),setTimeout(()=>f(!1),1600)},()=>{})},r=(0,Y.useMemo)(()=>new Map(o.nodes.map(d=>[d.id,d])),[o.nodes]);(0,Y.useEffect)(()=>{i(d=>{if(d)return d;let m=o.nodes.find(M=>M.kind==="custom-sql");return m?{kind:"node",id:m.id}:d})},[o.nodes]);let u=d=>{let m=d.connection;return m?[m.class,m.type,m.server,m.dbname,m.filename].filter(Boolean).join(" \xB7 "):""},p=a?.kind==="node"?r.get(a.id)??null:null,s=a?.kind==="edge"?o.edges.find(d=>d.id===a.id)??null:null,k=o.edges.length,v=o.nodes.filter(d=>d.kind==="custom-sql"),g=d=>n.pos[d]??{x:0,y:0};return(0,x.jsxs)("div",{className:"datamodel-view",children:[(0,x.jsxs)("div",{className:"dm-toolbar",children:[(0,x.jsx)("span",{className:"dm-stat",children:t("dmTables",{count:o.nodes.length})}),(0,x.jsx)("span",{className:"dm-stat",children:t("dmJoins",{count:k})}),v.length>0&&(0,x.jsx)("span",{className:"dm-stat",children:t("dmCustomSql",{count:v.length})}),(0,x.jsx)("span",{className:"dm-hint",children:t("dmSelectHint")})]}),(0,x.jsxs)("div",{className:"dm-body",children:[(0,x.jsx)("div",{className:"dm-canvas",children:(0,x.jsxs)("svg",{className:"dm-svg",width:n.width,height:n.height,viewBox:`0 0 ${n.width} ${n.height}`,children:[o.edges.map(d=>{let m=g(d.from),M=g(d.to),R=a?.kind==="edge"&&a.id===d.id,L=r.get(d.from),A=r.get(d.to),S=ht(m,M);return(0,x.jsxs)("g",{className:`dm-edge${R?" active":""}`,children:[(0,x.jsx)("path",{d:S,className:"dm-link-hit",onClick:()=>i({kind:"edge",id:d.id})}),(0,x.jsx)("path",{d:S,className:`dm-link join-${d.joinType}`}),(0,x.jsx)("title",{children:`${L?.label??"?"} \u2014 ${wt(t,d.joinType)} \u2014 ${A?.label??"?"}
${t("dmOn")}: ${d.leftExpr??"\u2014"} = ${d.rightExpr??"\u2014"}`+(d.cardinality?`
${t("dmCardinality")}: ${d.cardinality}`:"")})]},d.id)}),o.nodes.map(d=>{let m=n.pos[d.id]??{x:0,y:0},M=a?.kind==="node"&&a.id===d.id;return(0,x.jsxs)("g",{className:`dm-node dm-${d.kind}${M?" active":""}`,transform:`translate(${m.x}, ${m.y})`,onClick:()=>i({kind:"node",id:d.id}),children:[(0,x.jsx)("title",{children:`${d.label}${d.sublabel?`
`+d.sublabel:""}
${t("dmDatasource")}: ${d.datasource}`}),(0,x.jsx)("rect",{width:168,height:56,rx:8}),(0,x.jsx)("text",{x:12,y:23,className:"dm-node-title",children:d.label.length>16?d.label.slice(0,15)+"\u2026":d.label}),(0,x.jsx)("text",{x:12,y:41,className:"dm-node-sub",children:d.kind==="custom-sql"?t("dmSqlBadge"):(d.sublabel??"").slice(0,20)})]},d.id)})]})}),(0,x.jsxs)("aside",{className:"dm-detail",children:[!a&&(0,x.jsx)("div",{className:"dm-detail-empty",children:o.nodes.length?t("dmSelectHint"):t("dmEmpty")}),p&&(0,x.jsxs)("div",{className:"dm-detail-card",children:[(0,x.jsxs)("div",{className:"dm-detail-title",children:[p.label,(0,x.jsx)("span",{className:`dm-kind-badge ${p.kind}`,children:p.kind==="custom-sql"?t("dmSqlBadge"):t("dmTableBadge")})]}),(0,x.jsxs)("dl",{children:[(0,x.jsx)("dt",{children:t("dmDatasource")}),(0,x.jsx)("dd",{children:p.datasource}),p.sublabel&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("dt",{children:t("dmPhysical")}),(0,x.jsx)("dd",{className:"mono",children:p.sublabel})]}),u(p)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("dt",{children:t("dmConnection")}),(0,x.jsx)("dd",{className:"mono",children:u(p)})]})]}),p.sql&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"dm-sql-title",children:[t("dmSqlText"),(0,x.jsx)("button",{className:"sql-copy",onClick:()=>w(p.sql),children:t(l?"sqlCopied":"sqlCopy")})]}),(0,x.jsx)("pre",{className:"dm-sql",children:p.sql})]})]}),s&&(0,x.jsxs)("div",{className:"dm-detail-card",children:[(0,x.jsx)("div",{className:"dm-detail-title",children:wt(t,s.joinType)}),(0,x.jsxs)("dl",{children:[(0,x.jsx)("dt",{children:t("dmFrom")}),(0,x.jsx)("dd",{children:r.get(s.from)?.label??"?"}),(0,x.jsx)("dt",{children:t("dmTo")}),(0,x.jsx)("dd",{children:r.get(s.to)?.label??"?"}),(0,x.jsx)("dt",{children:t("dmOn")}),(0,x.jsxs)("dd",{className:"mono",children:[s.leftExpr??"\u2014"," = ",s.rightExpr??"\u2014"]}),(0,x.jsx)("dt",{children:t("dmCardinality")}),(0,x.jsx)("dd",{children:s.cardinality??t("dmNotStored")})]})]}),v.length>0&&(0,x.jsxs)("div",{className:"dm-sql-list",children:[(0,x.jsxs)("div",{className:"dm-sql-list-title",children:[t("dmSqlList"),(0,x.jsx)("span",{className:"wb-count",children:v.length})]}),v.map(d=>(0,x.jsx)("button",{className:`dm-sql-item${a?.kind==="node"&&a.id===d.id?" active":""}`,onClick:()=>i({kind:"node",id:d.id}),title:d.datasource,children:d.label},d.id))]}),(0,x.jsxs)("div",{className:"dm-legend",children:[(0,x.jsxs)("div",{className:"dm-legend-item",children:[(0,x.jsx)("span",{className:"dm-swatch dm-table"}),t("dmTableBadge")]}),(0,x.jsxs)("div",{className:"dm-legend-item",children:[(0,x.jsx)("span",{className:"dm-swatch dm-custom-sql"}),t("dmSqlBadge")]}),(0,x.jsx)("div",{className:"dm-legend-item dm-legend-hint",children:t("dmSelectHint")})]})]})]})]})}var E=require("react/jsx-runtime");function kt({fullscreen:e=!1,onToggleFullscreen:t}){let o=U(),n=(0,q.useRef)(je()).current,[a,i]=(0,q.useState)(n?.model??null),[l,f]=(0,q.useState)(n?.dashIdx??0),[w,r]=(0,q.useState)(n?.view??"layout"),[u,p]=(0,q.useState)(""),[s,k]=(0,q.useState)(n?.fileName??""),[v,g]=(0,q.useState)(!1),[d,m]=(0,q.useState)(null);(0,q.useEffect)(()=>{Ge({model:a,dashIdx:l,view:w,fileName:s})},[a,l,w,s]);let M=(D,b)=>{p("");try{let C=Oe(D);i(C),f(0),k(b||"")}catch(C){i(null),p(C.message||o("parseFailed"))}},R=(0,q.useRef)(!1);(0,q.useEffect)(()=>{if(a||R.current)return;R.current=!0;let D=!1;return g(!0),fetch(me).then(b=>{if(!b.ok)throw new Error("HTTP "+b.status);return b.text()}).then(b=>{D||M(b,o("sampleFileName"))}).catch(b=>{D||p(o("sampleAutoLoadFailed")+b.message+o("orChooseManually"))}).finally(()=>{D||g(!1)}),()=>{D=!0}},[a]);let L=(0,q.useMemo)(()=>a?He(a):null,[a]),A=a?.dashboards||[],S=A[l]||null;return(0,E.jsxs)("div",{className:"app",children:[(0,E.jsxs)("header",{className:"app-header",children:[(0,E.jsxs)("div",{className:"brand",children:[(0,E.jsx)("h1",{children:o("appTitle")}),(0,E.jsx)("p",{className:"sub",children:o("appSubtitle")})]}),(0,E.jsxs)("div",{className:"header-actions",children:[(0,E.jsxs)("div",{className:"view-tabs",children:[(0,E.jsx)("button",{className:w==="layout"?"vt active":"vt",onClick:()=>r("layout"),children:o("tabLayout")}),(0,E.jsx)("button",{className:w==="lineage"?"vt active":"vt",onClick:()=>r("lineage"),children:o("tabLineage")}),(0,E.jsx)("button",{className:w==="data"?"vt active":"vt",onClick:()=>r("data"),children:o("tabDataModel")})]}),(0,E.jsx)(Ve,{onText:M,onError:p,busy:v}),t&&(0,E.jsx)("button",{className:"fs-toggle",onClick:t,title:o(e?"exitFullscreenEsc":"fullscreenTooltip"),children:o(e?"exitFullscreen":"fullscreen")})]})]}),u&&(0,E.jsxs)("div",{className:"error-banner",children:["\u26A0 ",u]}),!a&&(0,E.jsx)("div",{className:"welcome",children:(0,E.jsxs)("div",{className:"welcome-card",children:[(0,E.jsx)("h2",{children:o(v?"sampleLoading":"welcomeTitle")}),(0,E.jsx)("p",{children:o("welcomeTitle")}),(0,E.jsxs)("ul",{children:[(0,E.jsxs)("li",{children:[o("help1a"),(0,E.jsx)("b",{children:"1:1"}),o("help1b")]}),(0,E.jsxs)("li",{children:[o("help2a"),(0,E.jsx)("b",{children:"SVG / PNG / .excalidraw"}),o("help2b")]}),(0,E.jsxs)("li",{children:[o("help3a"),(0,E.jsx)("b",{children:o("welcomeMeta")}),o("help3b")]})]}),(0,E.jsxs)("p",{className:"muted",children:[o("helpAuto")," ",o("helpSecurity")]})]})}),a&&L&&(0,E.jsxs)("div",{className:"summary-bar",children:[s&&(0,E.jsx)("span",{className:"sf",children:s}),(0,E.jsxs)("span",{children:[o("statDashboards")," ",(0,E.jsx)("b",{children:L.dashboards})]}),(0,E.jsxs)("span",{children:[o("statWorksheets")," ",(0,E.jsx)("b",{children:L.worksheets})]}),(0,E.jsxs)("span",{children:[o("statDatasources")," ",(0,E.jsx)("b",{children:L.datasources})]}),(0,E.jsxs)("span",{children:[o("statFields")," ",(0,E.jsx)("b",{children:L.fields})]}),(0,E.jsxs)("span",{children:[o("statCalcs")," ",(0,E.jsx)("b",{children:L.calculations})]}),A.length>1&&(0,E.jsx)("select",{className:"dash-select",value:l,onChange:D=>f(+D.target.value),children:A.map((D,b)=>(0,E.jsx)("option",{value:b,children:D.name},b))})]}),a&&w==="layout"&&(0,E.jsxs)("div",{className:"main",children:[(0,E.jsx)("section",{className:"left",children:(0,E.jsx)(Qe,{dashboard:S,highlightSheet:d})}),(0,E.jsx)("aside",{className:"right",children:(0,E.jsx)(Je,{model:a,dashIdx:l,onSelectDashboard:D=>{f(D),m(null)},highlightSheet:d,onHighlightSheet:m})})]}),a&&w==="lineage"&&(0,E.jsx)(ft,{model:a}),a&&w==="data"&&(0,E.jsx)(xt,{model:a})]})}var B=require("react/jsx-runtime");function yt(e,t,o){if(typeof document>"u"||document.querySelector(`style[data-plugin-css="${t}"]`))return;let n=document.createElement("style");n.dataset.plugin=e,n.dataset.pluginCss=t,n.textContent=o,document.head.appendChild(n)}yt("dsh-tableau-twb-viewer","dsh-tableau-twb-viewer/style.css",ze);yt("dsh-tableau-twb-viewer","dsh-tableau-twb-viewer/plugin.css",Ie);var Te="twb-viewer";function so({size:e=18,active:t}){return(0,B.jsxs)("svg",{width:e,height:e,viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",style:{display:"block",opacity:t?1:.85},children:[(0,B.jsx)("rect",{x:"1.4",y:"2.2",width:"13.2",height:"11.6",rx:"2",stroke:"currentColor",strokeWidth:"1.2"}),(0,B.jsx)("path",{d:"M1.4 6.2h13.2",stroke:"currentColor",strokeWidth:"1.2"}),(0,B.jsx)("circle",{cx:"5.2",cy:"10.4",r:"1.35",stroke:"currentColor",strokeWidth:"1.1"}),(0,B.jsx)("circle",{cx:"10.8",cy:"10.4",r:"1.35",stroke:"currentColor",strokeWidth:"1.1"}),(0,B.jsx)("path",{d:"M6.55 10.4h2.9",stroke:"currentColor",strokeWidth:"1.1"})]})}function io(){let[e,t]=(0,Ne.useState)(!1);return(0,Ne.useEffect)(()=>{if(!e)return;let n=a=>{a.key==="Escape"&&t(!1)};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e]),(0,B.jsx)("div",{className:`twb-root twb-root--panel${e?" twb-fullscreen":""}`,children:(0,B.jsx)(kt,{fullscreen:e,onToggleFullscreen:()=>t(n=>!n)})})}function lo({t:e}){return(0,B.jsx)(Ze,{value:e??De("zh"),children:(0,B.jsx)(io,{})})}var co=["slots","locale"];function po(e){e.effect(()=>e.locale.register(de,{zh:le,en:Me}),"dsh-tableau-twb-viewer: locale");let t=e.locale.bind(de);e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:Te,order:20,locale:de,label:()=>t("panel")},so)),e.slots.inject("main",()=>e.slots.register({name:"main",key:Te,locale:de},lo))}

		return module.exports;
	}
});
