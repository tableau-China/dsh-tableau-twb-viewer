window.__ModuleLoader__.load({
	id: "dsh-tableau-twb-viewer",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var Ce=Object.defineProperty;var St=Object.getOwnPropertyDescriptor;var Ct=Object.getOwnPropertyNames;var Tt=Object.prototype.hasOwnProperty;var Lt=(e,t)=>{for(var o in t)Ce(e,o,{get:t[o],enumerable:!0})},Rt=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Ct(t))!Tt.call(e,a)&&a!==o&&Ce(e,a,{get:()=>t[a],enumerable:!(n=St(t,a))||n.enumerable});return e};var At=e=>Rt(Ce({},"__esModule",{value:!0}),e);var bo={};Lt(bo,{PANEL_ID:()=>Fe,apply:()=>fo,inject:()=>mo});module.exports=At(bo);var Se=require("react");var _e=`.twb-root{--twb-bg: #f1f5f9;--twb-panel: #ffffff;--twb-border: #e2e8f0;--twb-text: #1e293b;--twb-muted: #64748b;--twb-primary: #2563eb;--twb-primary-d: #1d4ed8;--twb-accent: #dbeafe;--twb-shadow: 0 1px 3px rgba(15, 23, 42, .08)}.twb-root *{box-sizing:border-box}.twb-root{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;color:var(--twb-text);background:var(--twb-bg);font-size:14px}.twb-root .app{display:flex;flex-direction:column;height:100vh;overflow:hidden}.twb-root .app-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 20px;background:var(--twb-panel);border-bottom:1px solid var(--twb-border);flex-wrap:wrap}.twb-root .brand h1{font-size:18px;margin:0}.twb-root .brand .sub{margin:2px 0 0;color:var(--twb-muted);font-size:12px}.twb-root .header-actions{flex:1;display:flex;justify-content:flex-end}.twb-root .uploader{display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px dashed var(--twb-border);border-radius:10px;background:#f8fafc}.twb-root .uploader.drag{border-color:var(--twb-primary);background:var(--twb-accent)}.twb-root .uploader .hint{color:var(--twb-muted);font-size:12px}.twb-root button{font:inherit;padding:7px 12px;border:1px solid var(--twb-border);background:#fff;border-radius:8px;cursor:pointer;color:var(--twb-text)}.twb-root button:hover{background:#f8fafc}.twb-root button.primary{background:var(--twb-primary);color:#fff;border-color:var(--twb-primary)}.twb-root button.primary:hover{background:var(--twb-primary-d)}.twb-root button:disabled{opacity:.5;cursor:not-allowed}.twb-root .error-banner{background:#fef2f2;color:#b91c1c;padding:8px 20px;font-size:13px;border-bottom:1px solid #fecaca}.twb-root .welcome{flex:1;display:flex;align-items:center;justify-content:center;padding:24px}.twb-root .welcome-card{background:var(--twb-panel);max-width:560px;padding:28px 32px;border-radius:14px;box-shadow:var(--twb-shadow)}.twb-root .welcome-card h2{margin-top:0}.twb-root .welcome-card ul{line-height:1.9}.twb-root .muted{color:var(--twb-muted)}.twb-root .summary-bar{display:flex;align-items:center;gap:18px;padding:8px 20px;background:var(--twb-panel);border-bottom:1px solid var(--twb-border);font-size:13px;flex-wrap:wrap}.twb-root .summary-bar .sf{font-weight:600;color:var(--twb-primary)}.twb-root .summary-bar b{color:var(--twb-text)}.twb-root .dash-select{margin-left:auto;font:inherit;padding:5px 8px;border:1px solid var(--twb-border);border-radius:8px}.twb-root .main{flex:1;display:grid;grid-template-columns:1fr 380px;min-height:0}.twb-root .left{min-width:0;min-height:0;border-right:1px solid var(--twb-border)}.twb-root .right{min-height:0;overflow:hidden;background:var(--twb-panel)}.twb-root .canvas-wrap{display:flex;flex-direction:column;height:100%}.twb-root .canvas-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;background:#f8fafc;border-bottom:1px solid var(--twb-border);flex-wrap:wrap}.twb-root .tb-left{display:flex;align-items:baseline;gap:10px}.twb-root .dash-title{font-weight:600}.twb-root .dash-dim{color:var(--twb-muted);font-size:12px}.twb-root .tb-right{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.twb-root .zoom-label{font-size:12px;color:var(--twb-muted);min-width:42px;text-align:center}.twb-root .tb-sep{width:1px;height:20px;background:var(--twb-border);margin:0 4px}.twb-root .canvas-viewport{flex:1;position:relative;overflow:hidden;background:#eef2f7;background-image:radial-gradient(#dbe2ea 1px,transparent 1px);background-size:22px 22px;cursor:grab}.twb-root .canvas-viewport:active{cursor:grabbing}.twb-root .canvas-viewport svg{display:block;box-shadow:0 2px 12px #0f172a1f}.twb-root .canvas-empty{display:flex;align-items:center;justify-content:center;height:100%;color:var(--twb-muted)}.twb-root .legend{display:flex;gap:16px;padding:6px 14px;background:#f8fafc;border-top:1px solid var(--twb-border);font-size:12px;color:var(--twb-muted);flex-wrap:wrap}.twb-root .legend .sw{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-1px;border:1px solid}.twb-root .sw-ws{background:#dbeafe;border-color:#3b82f6}.twb-root .sw-ct{background:#f8fafc;border-color:#cbd5e1}.twb-root .sw-tx{background:#fff;border-color:#e2e8f0}.twb-root .meta-panel{display:flex;flex-direction:column;height:100%}.twb-root .meta-tabs{display:flex;border-bottom:1px solid var(--twb-border);background:#f8fafc}.twb-root .meta-tabs button{flex:1;border:none;border-radius:0;background:transparent;padding:10px 6px;border-bottom:2px solid transparent}.twb-root .meta-tabs button.active{border-bottom-color:var(--twb-primary);color:var(--twb-primary);font-weight:600}.twb-root .meta-body{flex:1;overflow:auto;padding:14px}.twb-root .ds-card{border:1px solid var(--twb-border);border-radius:10px;padding:12px 14px;margin-bottom:10px;cursor:pointer;background:#fff}.twb-root .ds-card.sel{border-color:var(--twb-primary);box-shadow:0 0 0 2px var(--twb-accent)}.twb-root .ds-name{font-weight:600;font-size:15px}.twb-root .ds-sub{color:var(--twb-muted);font-size:12px;margin:4px 0 8px}.twb-root .ds-stats{display:flex;gap:14px;font-size:12px;color:var(--twb-text)}.twb-root .ft-controls{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}.twb-root .seg{display:inline-flex;border:1px solid var(--twb-border);border-radius:8px;overflow:hidden}.twb-root .seg button{border:none;border-radius:0;padding:6px 10px;font-size:12px}.twb-root .seg button.active{background:var(--twb-primary);color:#fff}.twb-root .ft-search{flex:1;min-width:120px;padding:6px 10px;border:1px solid var(--twb-border);border-radius:8px;font:inherit}.twb-root .ft-count{font-size:12px;color:var(--twb-muted)}.twb-root .ft-scroll{max-height:60vh;overflow:auto;border:1px solid var(--twb-border);border-radius:8px}.twb-root .ft-scroll table{width:100%;border-collapse:collapse;font-size:12.5px}.twb-root .ft-scroll th,.twb-root .ft-scroll td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--twb-border);white-space:nowrap}.twb-root .ft-scroll th{position:sticky;top:0;background:#f8fafc;z-index:1}.twb-root .ft-scroll td.fname{white-space:normal;word-break:break-all;max-width:200px}.twb-root .calc-row td.fname{color:var(--twb-primary-d);font-weight:500}.twb-root .role{padding:1px 7px;border-radius:999px;font-size:11px}.twb-root .role-dimension{background:#ecfdf5;color:#047857}.twb-root .role-measure{background:#fef3c7;color:#b45309}.twb-root .empty{text-align:center;color:var(--twb-muted);padding:20px}.twb-root .ds-select{margin-bottom:10px;font-size:13px}.twb-root .ds-select select{font:inherit;padding:5px 8px;border:1px solid var(--twb-border);border-radius:8px;margin-left:6px}.twb-root .calc-tab .ft-search{margin-bottom:12px;width:100%}.twb-root .calc-list{display:flex;flex-direction:column;gap:10px}.twb-root .calc-item{border:1px solid var(--twb-border);border-radius:10px;padding:10px 12px;background:#fff}.twb-root .calc-name{font-weight:600;color:var(--twb-primary-d);margin-bottom:6px;word-break:break-all}.twb-root .calc-formula{margin:0;background:#f6f8fa;color:#1f2933;border:1px solid var(--twb-border);padding:10px 12px;border-radius:8px;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-family:SFMono-Regular,Consolas,Liberation Mono,monospace}.twb-root .fname-main{font-weight:500;color:var(--twb-text)}.twb-root .calc-row td.fname .fname-main{color:var(--twb-primary-d)}.twb-root .calc-name-main{font-weight:600;color:var(--twb-primary-d)}.twb-root .calc-formula code.formula-hl{font-family:inherit;font-size:inherit;background:none;color:inherit;white-space:pre-wrap;word-break:break-word}.twb-root .fh-kw{color:#c2255c;font-weight:600}.twb-root .fh-fn{color:#0b7285}.twb-root .fh-string{color:#2b8a3e}.twb-root .fh-field{color:#b45309}.twb-root .fh-number{color:#c2410c}.twb-root .fh-comment{color:#868e96;font-style:italic}.twb-root .fh-ident{color:#1f2933}.twb-root .fh-other{color:#495057}.twb-root .sheet-list{margin:0;padding-left:18px;line-height:2}.twb-root .view-tabs{display:inline-flex;background:#f1f3f5;border-radius:9px;padding:3px;gap:2px}.twb-root .view-tabs .vt{border:none;background:transparent;padding:6px 14px;border-radius:7px;font-size:13px;font-weight:600;color:var(--twb-muted);cursor:pointer}.twb-root .view-tabs .vt.active{background:#fff;color:var(--twb-primary-d);box-shadow:0 1px 2px #00000014}.twb-root .header-actions{display:flex;align-items:center;gap:12px}.twb-root .lineage{display:grid;grid-template-columns:240px 1fr 280px;flex:1;min-height:0;height:calc(100vh - 188px)}.twb-root .lineage-picker,.twb-root .lineage-detail{background:#fff;border:1px solid var(--twb-border);overflow-y:auto;padding:12px}.twb-root .lineage-picker{border-right:none;border-radius:12px 0 0 12px}.twb-root .lineage-detail{border-left:none;border-radius:0 12px 12px 0}.twb-root .picker-head{font-weight:700;color:var(--twb-primary-d);margin-bottom:10px}.twb-root .role-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}.twb-root .role-tabs .rt{flex:1 1 auto;border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 4px;font-size:12px;cursor:pointer;color:var(--twb-text)}.twb-root .role-tabs .rt.active{background:var(--twb-primary);color:#fff;border-color:var(--twb-primary)}.twb-root .picker-list{display:flex;flex-direction:column;gap:5px;margin-top:8px}.twb-root .picker-item{text-align:left;border:1px solid transparent;background:#f8f9fa;border-radius:7px;padding:6px 8px;font-size:12.5px;cursor:pointer;color:var(--twb-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.twb-root .picker-item:hover{background:#eef2ff}.twb-root .picker-item.active{border-color:var(--twb-primary);background:#e7f5ff;font-weight:600}.twb-root .picker-item.cat-calc{border-left:3px solid #7048e8}.twb-root .picker-item.cat-dimension{border-left:3px solid #f08c00}.twb-root .picker-item.cat-measure{border-left:3px solid #2f9e44}.twb-root .picker-item.cat-datasource{border-left:3px solid #1971c2}.twb-root .lineage-canvas{display:flex;flex-direction:column;min-width:0;background:#fbfcfe;border:1px solid var(--twb-border)}.twb-root .lineage-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px;border-bottom:1px solid var(--twb-border);background:#fff;flex-wrap:wrap}.twb-root .legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--twb-muted)}.twb-root .legend .lg{display:inline-flex;align-items:center;gap:5px}.twb-root .legend .lg i{width:12px;height:12px;border-radius:3px;border:1.5px solid;display:inline-block}.twb-root .legend .lg-note{color:#868e96;font-style:italic}.twb-root .toolbar-actions button{border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 10px;font-size:12px;cursor:pointer;color:var(--twb-text)}.twb-root .toolbar-actions button:hover{background:#f1f3f5}.twb-root .lineage-svg{flex:1;width:100%;min-height:0;background:radial-gradient(circle,#e7ebf0 1px,transparent 1px) 0 0 / 22px 22px;cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none}.twb-root .lineage-svg:active{cursor:grabbing}.twb-root .ln-edge{fill:none;stroke:#ced4da;stroke-width:1.2}.twb-root .ln-edge-hl{stroke:#1971c2;stroke-width:2}.twb-root .ln-edge-dim{stroke:#e9ecef;stroke-width:1}.twb-root .ln-node .ln-rect{stroke-width:1.5;transition:opacity .15s}.twb-root .ln-label{font-size:12px;fill:#1f2933;font-family:-apple-system,Segoe UI,PingFang SC,sans-serif;pointer-events:none}.twb-root .ln-tag{font-size:9.5px;fill:#868e96;pointer-events:none}.twb-root .ln-node.ln-self .ln-rect{stroke-width:3;filter:drop-shadow(0 0 4px rgba(25,113,194,.5))}.twb-root .ln-node.ln-up .ln-rect{stroke:#1971c2;stroke-width:2.4}.twb-root .ln-node.ln-down .ln-rect{stroke:#2f9e44;stroke-width:2.4}.twb-root .ln-node.ln-dim{opacity:.22}.twb-root .ln-node.ln-dim .ln-label,.twb-root .ln-node.ln-dim .ln-tag{opacity:.5}.twb-root .ln-node.ln-search .ln-rect{stroke:#f08c00;stroke-width:2.8;filter:drop-shadow(0 0 5px rgba(240,140,0,.55))}.twb-root .ln-lane-line{stroke:#e9ecef;stroke-width:1;stroke-dasharray:4 5}.twb-root .ln-lane-label{fill:#adb5bd;font-size:11px;font-weight:600;font-family:-apple-system,Segoe UI,PingFang SC,sans-serif;pointer-events:none}.twb-root .detail-empty{color:var(--twb-muted);font-size:13px;line-height:1.7}.twb-root .detail-head{font-size:16px;font-weight:700;color:var(--twb-primary-d);word-break:break-all;margin-bottom:8px}.twb-root .detail-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}.twb-root .pill{font-size:11px;padding:2px 8px;border-radius:999px;background:#f1f3f5;color:#495057;border:1px solid var(--twb-border)}.twb-root .pill.cat-calc{background:#f3e8ff;color:#6741d9;border-color:#d0bfff}.twb-root .pill.cat-dimension{background:#fff4e6;color:#e8590c;border-color:#ffd8a8}.twb-root .pill.cat-measure{background:#ebfbee;color:#2b8a3e;border-color:#b2f2bb}.twb-root .pill.cat-datasource{background:#e7f5ff;color:#1971c2;border-color:#a5d8ff}.twb-root .detail-internal{font-size:11px;color:#868e96;word-break:break-all;margin-bottom:10px;font-family:SFMono-Regular,Consolas,monospace}.twb-root .detail-formula{margin-bottom:12px}.twb-root .df-title,.twb-root .dl-title{font-size:12px;font-weight:700;color:var(--twb-muted);margin-bottom:6px}.twb-root .dl-title.ln-up{color:#1971c2}.twb-root .dl-title.ln-down{color:#2f9e44}.twb-root .detail-counts{display:flex;gap:10px;margin-bottom:12px}.twb-root .detail-counts .dc{flex:1;border:1px solid var(--twb-border);border-radius:10px;padding:8px;text-align:center}.twb-root .detail-counts .dc.up{background:#e7f5ff}.twb-root .detail-counts .dc.down{background:#ebfbee}.twb-root .dc-num{display:block;font-size:20px;font-weight:700}.twb-root .dc.up .dc-num{color:#1971c2}.twb-root .dc.down .dc-num{color:#2f9e44}.twb-root .dc-lbl{font-size:11px;color:var(--twb-muted)}.twb-root .detail-list{margin-bottom:12px}.twb-root .dl-item{display:block;width:100%;text-align:left;border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 8px;font-size:12px;cursor:pointer;color:var(--twb-text);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.twb-root .dl-item:hover{background:#f1f3f5}
`;var Oe=`/* dsh-tableau-twb-viewer \u63D2\u4EF6\u81EA\u6709\u6837\u5F0F\uFF08\u533A\u522B\u4E8E\u4ECE\u539F\u59CB\u5E94\u7528\u79FB\u690D\u7684 style.css\uFF09 */

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
`;var U=require("react");function _(e,t){return e&&[...e.children].find(o=>(o.localName||o.tagName)===t)||null}function J(e,t){return e?[...e.children].filter(o=>(o.localName||o.tagName)===t):[]}function E(e,t){return e?e.getAttribute(t):null}function re(e){return e?String(e).replace(/^\[/,"").replace(/\]$/,""):""}function zt(e){let t=_(e,"formatted-text");if(!t)return"";let o=[...t.getElementsByTagName("run")];return o.length?o.map(n=>n.textContent).join(""):t.textContent||""}function $e(e,t,o){return[...e.children||[]].filter(n=>(n.localName||n.tagName)==="zone").map(n=>It(n,t,o))}function de(e,t,o=0){let n=parseFloat(e.getAttribute(t)||"");return Number.isFinite(n)?n:o}function It(e,t,o){let n=de(e,"x"),a=de(e,"y"),i=de(e,"w"),l=de(e,"h"),b=n/1e5*t.w,h=a/1e5*t.h,r=i/1e5*t.w,m=l/1e5*t.h,p=e.getAttribute("is-fixed")==="true",u=de(e,"fixed-size");if(p&&u){let L=_(e,"layout-cache"),S=L?L.getAttribute("type-w"):null,W=L?L.getAttribute("type-h"):null;S==="fixed"&&(r=u),W==="fixed"&&(m=u),L||(m=u)}let v=e.getAttribute("type-v2")||"",D=e.getAttribute("name")||"",g=v==="text"?zt(e):"",d="container";v==="text"?d="text":D&&o.includes(D)&&(d="worksheet");let f=Ot(v,d),N=Wt(e),C=_(e,"zones"),R=C?[...C.children].filter(L=>(L.localName||L.tagName)==="zone"):[...e.children].filter(L=>(L.localName||L.tagName)==="zone");return{x:Math.round(b*10)/10,y:Math.round(h*10)/10,w:Math.round(r*10)/10,h:Math.round(m*10)/10,type:v,name:D,text:g,kind:d,shape:f,format:N,children:R.length?$e({children:R},t,o):[]}}var _t=new Set(["filter","color","title","paramctrl","legend","highlight","page","dashboard-title","size","shape","text-object"]);function Ot(e,t){return t==="worksheet"?"worksheet":e==="text"?"text":e==="empty"?"empty":e==="image"||e==="bitmap"?"image":e==="layout-flow"?"flow":e==="layout-vertical"?"vertical":e==="layout-horizontal"?"horizontal":e==="layout-basic"?"basic":_t.has(e)?"card":"other"}function Wt(e){let t={},o=_(e,"zone-style"),a=(o?[e,o]:[e]).flatMap(l=>[...l.children].filter(b=>(b.localName||b.tagName)==="format"));for(let l of a){let b=l.getAttribute("attr"),h=l.getAttribute("value");b&&h!==null&&(t[b]=h)}let i=l=>{let b=t[l];if(b===void 0)return null;let h=parseFloat(b);return Number.isFinite(h)?h:null};return{padding:i("padding"),margin:i("margin"),background:t["background-color"]??null,borderColor:t["border-color"]??null,borderWidth:i("border-width"),borderStyle:t["border-style"]??null}}function We(e){return(e==="column"||e.endsWith("column"))&&e!=="column-instance"}function qe(e){let t=new DOMParser().parseFromString(e,"application/xml"),o=t.querySelector("parsererror");if(o)throw new Error("XML \u89E3\u6790\u5931\u8D25\uFF1A"+o.textContent);let n=t.documentElement;if(!n||(n.localName||n.tagName)!=="workbook")throw new Error("\u8FD9\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684 Tableau \u5DE5\u4F5C\u7C3F (.twb) \u6587\u4EF6");let a=_(n,"worksheets"),i=a?J(a,"worksheet").map(r=>E(r,"name")).filter(r=>typeof r=="string"):[],l=[];for(let r of J(_(n,"dashboards"),"dashboard")){let m=E(r,"name")||"(\u672A\u547D\u540D\u4EEA\u8868\u677F)",p=_(r,"size"),u=0,v=0;p&&(u=parseInt(E(p,"minwidth")||E(p,"maxwidth")||"0",10),v=parseInt(E(p,"minheight")||E(p,"maxheight")||"0",10));let D=_(r,"zones"),g=D?$e(D,{w:u||1e5,h:v||1e5},i):[];l.push({name:m,width:u,height:v,zones:g})}let b={};for(let r of J(_(n,"datasources"),"datasource"))for(let m of[...r.children].filter(p=>We(p.localName||p.tagName))){let p=E(m,"name"),u=E(m,"caption");p&&u&&(b[re(p)]=u)}let h=[];for(let r of J(_(n,"datasources"),"datasource")){let m=E(r,"caption")||E(r,"name")||"(\u672A\u547D\u540D\u6570\u636E\u6E90)",p=E(r,"name"),u=_(r,"connection"),v=u?{class:E(u,"class"),type:E(u,"type"),server:E(u,"server"),dbname:E(u,"dbname"),filename:E(u,"filename")}:null,D=[...r.children].filter(f=>We(f.localName||f.tagName)).map(f=>{let N=E(f,"name");if(!N)return null;let C=_(f,"calculation"),R=E(f,"param-domain-type"),L=R!==null,S=L?null:C?E(C,"formula"):null,W=S;S&&(W=S.replace(/\[([^\]]+)\]/g,(A,H)=>{let $=re(H);return b[$]?"["+b[$]+"]":A}));let s=E(f,"caption"),w=_(f,"range");return{name:N,caption:s||null,label:s||N,datatype:E(f,"datatype"),role:E(f,"role"),type:E(f,"type"),formula:W,formulaRaw:S,isParameter:L,parameter:L?{value:E(f,"value"),defaultFormat:E(f,"default-format"),domainType:R,range:w?{min:E(w,"min"),max:E(w,"max"),granularity:E(w,"granularity")}:null}:null}}).filter(f=>f!==null),g=J(r,"group").map(f=>E(f,"name")).filter(f=>typeof f=="string"),d=Ut(r);h.push({caption:m,name:p,connection:v,columns:D,groups:g,dataModel:d})}return{dashboards:l,worksheets:i,datasources:h}}function $t(e){let t=[],o=(a,i)=>{for(let l of[...a.children])(l.localName||l.tagName)==="relation"?(i||t.push(l),o(l,!0)):i||o(l,!1)},n=_(e,"connection");return n&&o(n,!1),t}function qt(e){let t=E(e,"type"),o=E(e,"name")||"(unnamed)";return t==="text"?{name:o,table:null,kind:"custom-sql",sql:(e.textContent||"").trim()||null,objectId:null}:{name:o,table:E(e,"table"),kind:"table",sql:null,objectId:null}}function jt(e){let t=_(e,"clause");if(!t)return{leftExpr:null,rightExpr:null,cardinality:null};let o=E(t,"cardinality"),n=_(t,"expression"),a=n?J(n,"expression"):[];return{leftExpr:a[0]?E(a[0],"op"):null,rightExpr:a[1]?E(a[1],"op"):null,cardinality:o}}function je(e){for(let t of[...e.children]){if((t.localName||t.tagName)==="relation")return t;let o=je(t);if(o)return o}return null}function Gt(e){let t=_(e,"object-graph");if(!t)return null;let o=new Map,n=[],a=new Map;for(let l of J(_(t,"objects"),"object")){let b=E(l,"id"),h=je(l),r=h?E(h,"name"):null,m=E(l,"caption")||r||"(object)",p=h?E(h,"type"):null;if(h&&(p==="join"||p==="collection"||p==="union"))return null;let u=p==="text"?{name:m,table:null,kind:"custom-sql",sql:h&&(h.textContent||"").trim()||null,objectId:b}:{name:m,table:h?E(h,"table"):null,kind:"table",sql:null,objectId:b};o.set("obj:"+(b||m),u),b&&a.set(b,u),u.kind==="custom-sql"&&u.sql&&n.push({name:u.name,sql:u.sql})}if(o.size===0)return null;let i=[];for(let l of J(_(t,"relationships"),"relationship")){let b=_(l,"expression"),h=b?J(b,"expression"):[],r=_(l,"first-end-point"),m=_(l,"second-end-point"),p=a.get(E(r,"object-id")||""),u=a.get(E(m,"object-id")||"");!p||!u||i.push({left:p,right:u,joinType:"relationship",leftExpr:h[0]?E(h[0],"op"):null,rightExpr:h[1]?E(h[1],"op"):null,cardinality:E(l,"cardinality")||null})}return{tables:[...o.values()],joins:i,customSql:n}}function Ut(e){let t=Gt(e);if(t)return t;let o=[],n=new Map,a=[],i=r=>`${r.kind}:${r.name}:${r.table??""}`,l=r=>{let m=i(r);return n.has(m)||n.set(m,r),r.kind==="custom-sql"&&r.sql&&!a.some(p=>p.name===r.name&&p.sql===r.sql)&&a.push({name:r.name,sql:r.sql}),n.get(m)},b=r=>{if(!r)return null;let m=/^\[([^\]]+)\]/.exec(r.trim());if(!m)return null;let p=m[1];for(let u of n.values())if(u.name===p||u.table&&u.table.replace(/[\[\]]/g,"")===p.replace(/[\[\]]/g,""))return u;return null},h=r=>{let m=E(r,"type")||"table";if(m==="collection"||m==="union"){let f=null;for(let N of J(r,"relation")){let C=h(N);f||(f=C)}return f??l({name:E(r,"name")||"(collection)",table:null,kind:"table",sql:null,objectId:null})}if(m!=="join")return l(qt(r));let p=J(r,"relation"),u=p[0]?h(p[0]):null,v=p[1]?h(p[1]):null;for(let f of p.slice(2))h(f);let{leftExpr:D,rightExpr:g,cardinality:d}=jt(r);if(u&&v){let f=b(D)??u,N=b(g)??v;o.push({left:f,right:N,joinType:E(r,"join")||"inner",leftExpr:D,rightExpr:g,cardinality:d})}return u??v??l({name:"(join)",table:null,kind:"table",sql:null,objectId:null})};for(let r of $t(e))h(r);return{tables:[...n.values()],joins:o,customSql:a}}var Ge="dsh-tableau-twb-viewer.state.v2",ce=null,we="/twb-viewer/sample.twb";function Ht(e){if(e===null||typeof e!="object")return!1;let t=e;if(!Array.isArray(t.dashboards)||!Array.isArray(t.worksheets)||!Array.isArray(t.datasources)||!t.datasources.every(i=>typeof i=="object"&&i!==null&&Array.isArray(i.columns)))return!1;let n=t.datasources[0];if(n&&(typeof n.dataModel!="object"||n.dataModel===null)||n&&!Array.isArray(n.dataModel?.tables))return!1;let a=i=>{if(i===null||typeof i!="object")return!1;let l=i;if(typeof l.shape!="string"||typeof l.format!="object"||l.format===null)return!1;let b=l.children;return!Array.isArray(b)||b.every(a)};return t.dashboards.every(i=>{let l=i.zones;return Array.isArray(l)?l.every(a):!1})}function Ue(){if(ce)return ce;try{let e=sessionStorage.getItem(Ge);if(!e)return null;let t=JSON.parse(e);if(!t||typeof t!="object"||!("model"in t)||!Ht(t.model??null)||t.view!=="layout"&&t.view!=="lineage"&&t.view!=="data"||!Number.isInteger(t.dashIdx)||t.dashIdx<0)return null;ce=t}catch{}return ce}function He(e){ce=e;try{let t=e.modelJson?`{"model":${e.modelJson},"dashIdx":${e.dashIdx},"view":${JSON.stringify(e.view)},"fileName":${JSON.stringify(e.fileName)}}`:JSON.stringify(e);sessionStorage.setItem(Ge,t)}catch{}}function Be(e){return{dashboards:e.dashboards.length,worksheets:e.worksheets.length,datasources:e.datasources.length,fields:e.datasources.reduce((t,o)=>t+o.columns.length,0),calculations:e.datasources.reduce((t,o)=>t+o.columns.filter(n=>n.formula).length,0)}}function Ze(e,t=10){if(!e)return[""];let o=[];for(let i=0;i<e.length;i+=t)o.push(e.slice(i,i+t));if(o.length<=3)return o;let n=o.slice(0,2).join(""),a=o.slice(2).join("").slice(0,t-1)+"\u2026";return[n.slice(0,t),n.slice(t,t*2),a]}var xe=require("react"),ue="twb-viewer",pe={panel:"TWb \u68C0\u89C6\u5668",appTitle:"Tableau .twb \u4EEA\u8868\u677F\u5E03\u5C40\u68C0\u89C6\u5668",appSubtitle:"1:1 SVG \u5E03\u5C40\u56FE \xB7 \u4E00\u952E\u5BFC\u51FA Excalidraw \xB7 \u6570\u636E\u6E90/\u5B57\u6BB5/\u8BA1\u7B97\u5B57\u6BB5 metadata \xB7 \u5B57\u6BB5\u5F15\u7528\u5173\u7CFB",tabLayout:"\u5E03\u5C40\u56FE",tabLineage:"\u5F15\u7528\u5173\u7CFB",fullscreen:"\u26F6 \u5168\u5C4F",fullscreenTooltip:"\u5168\u5C4F\u6A21\u5F0F\uFF0C\u94FA\u6EE1\u7A97\u53E3\u67E5\u770B\u5173\u7CFB\u56FE",exitFullscreen:"\u2715 \u9000\u51FA\u5168\u5C4F",exitFullscreenEsc:"\u9000\u51FA\u5168\u5C4F (Esc)",welcomeTitle:"\u4E0A\u4F20\u4E00\u4E2A Tableau \u5DE5\u4F5C\u7C3F\uFF08.twb\uFF09\u6587\u4EF6\uFF0C\u5373\u53EF\uFF1A",welcomeMeta:"\u6570\u636E\u6E90\u3001\u5B57\u6BB5\u3001\u8BA1\u7B97\u5B57\u6BB5\u516C\u5F0F",help1a:"\u6309 ",help1b:" \u7528 SVG \u7ED8\u5236\u4EEA\u8868\u677F\u5E03\u5C40\uFF0C\u652F\u6301\u7F29\u653E / \u5E73\u79FB\uFF1B",help2a:"\u4E00\u952E\u5BFC\u51FA ",help2b:"\uFF0C\u65B9\u4FBF\u5728 Excalidraw \u91CC\u624B\u7ED8\u6279\u6CE8\uFF1B",help3a:"\u67E5\u770B ",help3b:" \u7B49 metadata\uFF0C\u4FBF\u4E8E\u5BF9\u5BA2\u6237\u8BB2\u89E3\u53E3\u5F84\u3002",helpAuto:"\u6253\u5F00\u65F6\u4F1A\u81EA\u52A8\u8F7D\u5165\u5185\u7F6E\u793A\u4F8B\uFF1B\u4E0A\u4F20\u81EA\u5DF1\u7684 .twb \u4F1A\u66FF\u6362\u793A\u4F8B\u3002",helpSecurity:"\u51FA\u4E8E\u6570\u636E\u5B89\u5168\u8003\u8651\uFF0C\u4E0D\u89E3\u6790 .twbx\uFF08\u6253\u5305\u5DE5\u4F5C\u7C3F\u53EF\u80FD\u5185\u5D4C\u6570\u636E\u63D0\u53D6\uFF09\u3002",statDashboards:"\u4EEA\u8868\u677F",statWorksheets:"\u5DE5\u4F5C\u8868",statDatasources:"\u6570\u636E\u6E90",statFields:"\u5B57\u6BB5",statCalcs:"\u8BA1\u7B97\u5B57\u6BB5",chooseFile:"\u8BF7\u9009\u62E9 .twb \u6587\u4EF6",chooseFileBtn:"\u9009\u62E9 .twb \u6587\u4EF6",loadSample:"\u8F7D\u5165\u793A\u4F8B",loading:"\u52A0\u8F7D\u4E2D\u2026",sampleLoading:"\u6B63\u5728\u52A0\u8F7D\u5185\u7F6E\u793A\u4F8B\u2026",sampleFileName:"sample.twb\uFF08\u5185\u7F6E\u793A\u4F8B\uFF09",fileReadFailed:"\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25",parseFailed:"\u89E3\u6790\u5931\u8D25",sampleAutoLoadFailed:"\u81EA\u52A8\u52A0\u8F7D\u5185\u7F6E\u793A\u4F8B\u5931\u8D25\uFF1A",orChooseManually:"\uFF0C\u53EF\u624B\u52A8\u9009\u62E9 .twb \u6587\u4EF6",sampleLoadFailed:"\u8F7D\u5165\u793A\u4F8B\u5931\u8D25\uFF1A",twbxRejected:"\u51FA\u4E8E\u6570\u636E\u5B89\u5168\u8003\u8651\uFF0C\u672C\u63D2\u4EF6\u4E0D\u89E3\u6790 .twbx\uFF08\u6253\u5305\u5DE5\u4F5C\u7C3F\u53EF\u80FD\u5185\u5D4C\u6570\u636E\u63D0\u53D6\uFF09\u3002\u8BF7\u5728 Tableau \u4E2D\u300C\u53E6\u5B58\u4E3A\u300D.twb \u540E\u518D\u5BFC\u5165\u3002",zoomIn:"\u653E\u5927 +",zoomOut:"\u7F29\u5C0F \u2212",fit:"\u9002\u914D",exportSvg:"\u5BFC\u51FA SVG",exportPng:"\u5BFC\u51FA PNG",exportExcalidraw:"\u5BFC\u51FA Excalidraw",colCalc:"\u8BA1\u7B97\u5B57\u6BB5",roleDimension:"\u7EF4\u5EA6",roleMeasure:"\u5EA6\u91CF",tabDataModel:"\u6570\u636E\u6A21\u578B",dmTables:"{count} \u5F20\u8868",dmJoins:"{count} \u4E2A\u8FDE\u63A5",dmCustomSql:"{count} \u6BB5\u81EA\u5B9A\u4E49 SQL",dmSelectHint:"\u70B9\u51FB\u8868\u6216\u8FDE\u63A5\u7EBF\u67E5\u770B\u8BE6\u60C5",dmSqlList:"\u81EA\u5B9A\u4E49 SQL",dmConnection:"\u8FDE\u63A5",dmEmpty:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u53EF\u5C55\u793A\u7684\u6570\u636E\u6A21\u578B\u3002",dmDatasource:"\u6570\u636E\u6E90",dmPhysical:"\u7269\u7406\u8868",dmSqlText:"\u81EA\u5B9A\u4E49 SQL",dmSqlBadge:"\u81EA\u5B9A\u4E49 SQL",dmTableBadge:"\u8868",dmFrom:"\u5DE6\u8868",dmTo:"\u53F3\u8868",dmOn:"\u8FDE\u63A5\u6761\u4EF6",dmCardinality:"\u57FA\u6570",dmNotStored:"\u6587\u4EF6\u4E2D\u672A\u8BB0\u5F55\uFF08Tableau \u8FD0\u884C\u65F6\u63A8\u65AD\uFF09",joinInner:"\u5185\u8FDE\u63A5",joinLeft:"\u5DE6\u8FDE\u63A5",joinRight:"\u53F3\u8FDE\u63A5",joinFull:"\u5168\u8FDE\u63A5",joinRelationship:"\u5173\u7CFB",sqlCopy:"\u590D\u5236",paramValue:"\u5F53\u524D\u503C",paramDomain:"\u53D6\u503C\u57DF",paramRange:"\u8303\u56F4",paramFormat:"\u683C\u5F0F",paramRaw:"\u539F\u59CB\u503C",paramStep:"\u6B65\u957F",paramRawHint:"\u5DE5\u4F5C\u7C3F\u91CC\u4EE5 float64 \u539F\u6837\u5199\u5165\u7684\u503C\uFF08\u5982 0.064 \u5199\u4F5C 0.064000000000000001\uFF09",sqlCopied:"\u5DF2\u590D\u5236",wbDashboards:"\u4EEA\u8868\u677F",wbWorksheets:"\u5DE5\u4F5C\u8868",wbSheetsInDash:"{count} \u4E2A\u5DE5\u4F5C\u8868",wbHighlightHint:"\u5728\u5DE6\u4FA7\u5E03\u5C40\u56FE\u4E0A\u9AD8\u4EAE\u8BE5\u5DE5\u4F5C\u8868\uFF08\u518D\u70B9\u4E00\u6B21\u53D6\u6D88\uFF09",wbNoSheetsInDash:"\u8BE5\u4EEA\u8868\u677F\u6CA1\u6709\u5DE5\u4F5C\u8868\u3002",wbUnusedNote:"\u53E6\u6709 {count} \u4E2A\u5DE5\u4F5C\u8868\u672A\u653E\u5728\u4EFB\u4F55\u4EEA\u8868\u677F\u3002",wbNoDashboards:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u4EEA\u8868\u677F\u3002",legendParameter:"\u53C2\u6570",zoneLegendTitle:"\u56FE\u4F8B",zoneWorksheet:"\u5DE5\u4F5C\u8868",zoneContainer:"\u5BB9\u5668 / \u5E03\u5C40",zoneFlow:"\u6D41\u5F0F\u5BB9\u5668",zoneBasic:"\u57FA\u7840\u5BB9\u5668",zoneCard:"\u5361\u7247\uFF08\u7B5B\u9009\u5668 / \u6807\u9898\u7B49\uFF09",zoneText:"\u6587\u672C",zoneEmpty:"\u7A7A\u767D",zonePadding:"\u5185\u8FB9\u8DDD {value}",zoneMargin:"\u5916\u8FB9\u8DDD {value}",zoneColor:"\u5E95\u8272",noDashboard:"\u8BF7\u9009\u62E9\u6216\u4E0A\u4F20\u4E00\u4E2A\u5305\u542B\u4EEA\u8868\u677F\u7684 .twb \u6587\u4EF6",pickerHead:"\u5B57\u6BB5\u9009\u62E9\u5668",searchLineage:"\u641C\u7D22\u5B57\u6BB5\u5E76\u9AD8\u4EAE\u2026",noMatchPeriod:"\u65E0\u5339\u914D\u5B57\u6BB5\u3002",arrowNote:"\u7BAD\u5934\u65B9\u5411\uFF1A\u4E0A\u6E38\uFF08\u5DE6\uFF09\u2192 \u4E0B\u6E38\uFF08\u53F3\uFF09",focus:"\u805A\u7126",focusAuto:"\u81EA\u52A8",focusAll:"\u5168\u90E8",focusTooltip:"\u5927\u56FE\u805A\u7126\uFF1A\u53EA\u6E32\u67D3\u9009\u4E2D\u8282\u70B9 \xB1N \u8DF3\u7684\u8840\u7F18",nodesCount:"{shown} / {total} \u8282\u70B9",fitWindow:"\u9002\u914D\u7A97\u53E3",clearHighlight:"\u6E05\u9664\u9AD8\u4EAE",subCols:"\uFF08{count} \u5217\uFF09",detailEmpty:"\u9009\u62E9\u4E00\u4E2A\u5B57\u6BB5 / \u6570\u636E\u6E90\uFF0C\u67E5\u770B\u5176\u4E0A\u4E0B\u6E38\u5F15\u7528\u5173\u7CFB\u3002",internalName:"\u5185\u90E8\u540D\uFF1A{name}",calcFormula:"\u8BA1\u7B97\u5B57\u6BB5\u516C\u5F0F",upstreamLabel:"\u4E0A\u6E38\uFF08\u8F93\u5165\uFF09",downstreamLabel:"\u4E0B\u6E38\uFF08\u4F9D\u8D56\uFF09",upstreamTitle:"\u4E0A\u6E38\u8F93\u5165",downstreamTitle:"\u4E0B\u6E38\u4F9D\u8D56",kindField:"\u5B57\u6BB5",legendDatasource:"\u6570\u636E\u6E90",legendDimension:"\u7EF4\u5EA6",legendMeasure:"\u5EA6\u91CF",legendCalc:"\u8BA1\u7B97\u5B57\u6BB5",legendUnknown:"\u672A\u89E3\u6790",laneDatasource:"\u6570\u636E\u6E90",laneRawFields:"\u539F\u59CB\u5B57\u6BB5\uFF08\u7EF4\u5EA6\u2191 / \u5EA6\u91CF\u2193\uFF09",laneCalcLayer:"\u8BA1\u7B97\u5B57\u6BB5 \xB7 \u5C42\u7EA7 {level}"},Te={panel:"TWb Viewer",appTitle:"Tableau .twb Dashboard Inspector",appSubtitle:"1:1 SVG layout \xB7 one-click Excalidraw export \xB7 datasource / field / calculation metadata \xB7 field lineage",tabLayout:"Layout",tabLineage:"Lineage",fullscreen:"\u26F6 Full screen",fullscreenTooltip:"Full screen \u2014 use the whole window for the graph",exitFullscreen:"\u2715 Exit full screen",exitFullscreenEsc:"Exit full screen (Esc)",welcomeTitle:"Upload a Tableau workbook (.twb) file to:",welcomeMeta:"datasource, field and calculation metadata",help1a:"Draw the dashboard layout ",help1b:" in SVG at 1:1 real scale, with zoom and pan;",help2a:"Export ",help2b:" in one click and annotate it by hand in Excalidraw;",help3a:"Read ",help3b:" metadata to explain definitions to clients.",helpAuto:"A built-in sample loads automatically; upload your own .twb to replace it.",helpSecurity:"For data safety, .twbx files are not parsed (packaged workbooks may embed data extracts).",statDashboards:"dashboards",statWorksheets:"worksheets",statDatasources:"datasources",statFields:"fields",statCalcs:"calculations",chooseFile:"Choose a .twb file",chooseFileBtn:"Choose .twb file",loadSample:"Load sample",loading:"Loading\u2026",sampleLoading:"Loading the built-in sample\u2026",sampleFileName:"sample.twb (built-in sample)",fileReadFailed:"Failed to read the file",parseFailed:"Failed to parse the workbook",sampleAutoLoadFailed:"Failed to auto-load the built-in sample: ",orChooseManually:". You can pick a .twb file manually.",sampleLoadFailed:"Failed to load the sample: ",twbxRejected:"For data safety this plugin does not parse .twbx (packaged workbooks may embed data extracts). In Tableau use \u201CSave As\u201D \u2192 .twb, then import that file.",zoomIn:"Zoom in +",zoomOut:"Zoom out \u2212",fit:"Fit",exportSvg:"Export SVG",exportPng:"Export PNG",exportExcalidraw:"Export Excalidraw",colCalc:"Calculation",roleDimension:"Dimension",roleMeasure:"Measure",tabDataModel:"Data model",dmTables:"{count} tables",dmJoins:"{count} joins",dmCustomSql:"{count} custom SQL",dmSelectHint:"Click a table or join for details",dmSqlList:"Custom SQL",dmConnection:"Connection",dmEmpty:"No data model to show in this workbook.",dmDatasource:"Datasource",dmPhysical:"Physical table",dmSqlText:"Custom SQL",dmSqlBadge:"Custom SQL",dmTableBadge:"Table",dmFrom:"Left table",dmTo:"Right table",dmOn:"Join condition",dmCardinality:"Cardinality",dmNotStored:"Not stored in the file (inferred by Tableau at runtime)",joinInner:"Inner join",joinLeft:"Left join",joinRight:"Right join",joinFull:"Full join",joinRelationship:"Relationship",sqlCopy:"Copy",paramValue:"Current value",paramDomain:"Domain",paramRange:"Range",paramFormat:"Format",paramRaw:"Raw",paramStep:"Step",paramRawHint:"Value stored verbatim as float64 in the workbook (0.064 is written as 0.064000000000000001)",sqlCopied:"Copied",wbDashboards:"Dashboards",wbWorksheets:"Worksheets",wbSheetsInDash:"{count} worksheets",wbHighlightHint:"Highlight this worksheet in the layout (click again to clear)",wbNoSheetsInDash:"No worksheets on this dashboard.",wbUnusedNote:"{count} worksheets are not placed on any dashboard.",wbNoDashboards:"No dashboards in this workbook.",legendParameter:"Parameter",zoneLegendTitle:"Legend",zoneWorksheet:"Worksheet",zoneContainer:"Container / layout",zoneFlow:"Flow container",zoneBasic:"Basic container",zoneCard:"Card (filter, title\u2026)",zoneText:"Text",zoneEmpty:"Empty",zonePadding:"Padding {value}",zoneMargin:"Margin {value}",zoneColor:"Fill",noDashboard:"Choose or upload a .twb file that contains a dashboard",pickerHead:"Field picker",searchLineage:"Search and highlight fields\u2026",noMatchPeriod:"No matching fields.",arrowNote:"Arrows point upstream (left) \u2192 downstream (right)",focus:"Focus",focusAuto:"Auto",focusAll:"All",focusTooltip:"Large graphs: render only the selected node's lineage within N hops",nodesCount:"{shown} / {total} nodes",fitWindow:"Fit window",clearHighlight:"Clear highlight",subCols:" ({count} cols)",detailEmpty:"Select a field or datasource to see its upstream and downstream references.",internalName:"Internal name: {name}",calcFormula:"Calculation formula",upstreamLabel:"Upstream (inputs)",downstreamLabel:"Downstream (dependents)",upstreamTitle:"Upstream inputs",downstreamTitle:"Downstream dependents",kindField:"Field",legendDatasource:"Datasource",legendDimension:"Dimension",legendMeasure:"Measure",legendCalc:"Calculation",legendUnknown:"Unresolved",laneDatasource:"Datasource",laneRawFields:"Raw fields (dimensions \u2191 / measures \u2193)",laneCalcLayer:"Calculations \xB7 layer {level}"},Bt={zh:pe,en:Te};function Zt(e,t){return t?e.replace(/\{(\w+)\}/g,(o,n)=>n in t?String(t[n]):o):e}function Le(e="zh"){let t=Bt[e]??pe;return(o,n)=>Zt(t[o]??pe[o]??o,n)}var Ve=(0,xe.createContext)(null),Ye=Ve.Provider;function Z(){return(0,xe.useContext)(Ve)??Le("zh")}var ke=require("react");var ae=require("react/jsx-runtime");function Ke({onText:e,onError:t,busy:o}){let n=Z(),a=(0,ke.useRef)(null),[i,l]=(0,ke.useState)(!1),b=r=>{if(!r)return;if(/\.twbx$/i.test(r.name)){t&&t(n("twbxRejected"));return}if(!/\.twb$/i.test(r.name)){t&&t(n("chooseFile"));return}let m=new FileReader;m.onload=()=>{e&&e(String(m.result??""),r.name)},m.onerror=()=>{t&&t(n("fileReadFailed"))},m.readAsText(r)},h=async()=>{try{let r=await fetch(we);if(!r.ok)throw new Error("HTTP "+r.status);let m=await r.text();e&&e(m,n("sampleFileName"))}catch(r){t&&t(n("sampleLoadFailed")+r.message)}};return(0,ae.jsxs)("div",{className:`uploader ${i?"drag":""}`,onDragOver:r=>{r.preventDefault(),l(!0)},onDragLeave:()=>l(!1),onDrop:r=>{r.preventDefault(),l(!1),b(r.dataTransfer.files[0])},children:[(0,ae.jsx)("input",{ref:a,type:"file",accept:".twb",style:{display:"none"},onChange:r=>{b(r.target.files?.[0]),r.target.value=""}}),(0,ae.jsx)("button",{className:"primary",onClick:()=>a.current?.click(),disabled:o,children:n("chooseFileBtn")}),(0,ae.jsx)("button",{onClick:h,disabled:o,children:n(o?"loading":"loadSample")})]})}var B=require("react");var ve="http://www.w3.org/2000/svg";function Ne(e,t,o){let n=t instanceof Blob?t:new Blob([t],{type:o}),a=URL.createObjectURL(n),i=document.createElement("a");i.href=a,i.download=e,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e3)}function Xe(e){let t=[];for(let o of e)t.push(o),o.children&&o.children.length&&t.push(...Xe(o.children));return t}var ye=()=>Math.floor(Math.random()*1e5);function Je(e){let t=Xe(e),o=[],n=1;for(let a of t){let i=a.kind==="worksheet";o.push({id:`rect-${n}`,type:"rectangle",x:Math.round(a.x),y:Math.round(a.y),width:Math.max(1,Math.round(a.w)),height:Math.max(1,Math.round(a.h)),angle:0,strokeColor:i?"#1971c2":"#868e96",backgroundColor:i?"#a5d8ff":"#ffffff",fillStyle:"solid",strokeWidth:1,strokeStyle:"solid",roughness:0,opacity:100,groupIds:[],frameId:null,roundness:null,seed:ye(),version:1,versionNonce:ye(),isDeleted:!1,boundElements:[],updated:Date.now(),link:null,locked:!1});let l=i?a.name:a.text;l&&o.push({id:`text-${n}`,type:"text",x:Math.round(a.x+6),y:Math.round(a.y+6),width:Math.max(20,Math.round(a.w)-12),height:25,angle:0,strokeColor:"#1e1e1e",backgroundColor:"transparent",fillStyle:"solid",strokeWidth:1,strokeStyle:"solid",roughness:0,opacity:100,groupIds:[],frameId:null,roundness:null,seed:ye(),version:1,versionNonce:ye(),isDeleted:!1,updated:Date.now(),link:null,locked:!1,text:l,fontSize:16,fontFamily:1,textAlign:"left",verticalAlign:"top",containerId:null,originalText:l,lineHeight:1.25,baseline:18}),n++}return JSON.stringify({type:"excalidraw",version:2,source:"twb-dashboard-inspector",elements:o,appState:{gridSize:null,viewBackgroundColor:"#ffffff"},files:{}},null,2)}var T=require("react/jsx-runtime"),se={worksheet:{fill:"#dbeafe",stroke:"#3b82f6"},text:{fill:"#ffffff",stroke:"#94a3b8"},flow:{fill:"#f1f5f9",stroke:"#cbd5e1",dash:"5 4"},vertical:{fill:"#f5f3ff",stroke:"#c4b5fd",dash:"5 4"},horizontal:{fill:"#eff6ff",stroke:"#bfdbfe",dash:"5 4"},basic:{fill:"#f8fafc",stroke:"#cbd5e1"},card:{fill:"#fef9c3",stroke:"#facc15"},image:{fill:"#ecfdf5",stroke:"#6ee7b7"},empty:{fill:"none",stroke:"#e2e8f0",dash:"3 3"},other:{fill:"#f8fafc",stroke:"#cbd5e1"}},Vt={worksheet:"zoneWorksheet",flow:"zoneFlow",basic:"zoneBasic",card:"zoneCard",text:"zoneText",empty:"zoneEmpty"};function Qe({z:e,depth:t,t:o,highlightName:n,highlight:a}){let i=e.kind==="worksheet",l=e.kind==="text",b=se[e.shape]??se.other,h=b.dash??"",r=i?Math.max(9,Math.min(15,e.h*.16)):13,m=[e.name||e.type||o("zoneBasic"),`${Math.round(e.w)} \xD7 ${Math.round(e.h)}`,e.format?.padding!==null&&e.format?.padding!==void 0?o("zonePadding",{value:e.format.padding}):null,e.format?.margin!==null&&e.format?.margin!==void 0?o("zoneMargin",{value:e.format.margin}):null,e.format?.background?`${o("zoneColor")} ${e.format.background}`:null].filter(Boolean).join(" \xB7 ");return(0,T.jsxs)("g",{children:[(0,T.jsx)("title",{children:m}),(0,T.jsx)("rect",{x:e.x,y:e.y,width:Math.max(1,e.w),height:Math.max(1,e.h),fill:b.fill,stroke:a?"#1d4ed8":b.stroke,strokeWidth:a?3:1,strokeDasharray:h,rx:2}),i&&e.h>22&&(0,T.jsx)("text",{x:e.x+e.w/2,y:e.y+e.h/2,textAnchor:"middle",dominantBaseline:"middle",fontSize:r,fontWeight:"600",fill:"#1e3a8a",children:e.name}),l&&(0,T.jsx)("text",{x:e.x+6,y:e.y+Math.min(18,e.h-4),fontSize:13,fill:"#334155",children:e.text.length>60?e.text.slice(0,60)+"\u2026":e.text}),!i&&!l&&t>0&&e.type&&e.h>26&&(0,T.jsx)("text",{x:e.x+4,y:e.y+12,fontSize:9,fill:"#94a3b8",children:e.type}),e.children&&e.children.map((p,u)=>(0,T.jsx)(Qe,{z:p,depth:t+1,t:o,highlightName:n,highlight:n!==null&&p.kind==="worksheet"&&p.name===n},u))]})}function et({dashboard:e,highlightSheet:t=null}){let o=Z(),n=(0,B.useRef)(null),a=(0,B.useRef)(null),[i,l]=(0,B.useState)(.2),[b,h]=(0,B.useState)(0),[r,m]=(0,B.useState)(0),p=(0,B.useRef)(null),u=e?.width||0,v=e?.height||0,D=(0,B.useCallback)(()=>{let s=n.current;if(!s||!u||!v)return;let w=Math.min((s.clientWidth-24)/u,(s.clientHeight-24)/v),A=Math.min(1,w);l(A),h(Math.max(8,(s.clientWidth-u*A)/2)),m(12)},[u,v]);(0,B.useEffect)(()=>{D()},[D,e]),(0,B.useEffect)(()=>{let s=n.current;if(!s)return;let w=new ResizeObserver(()=>D());return w.observe(s),()=>w.disconnect()},[D]);let g=(0,B.useCallback)(s=>{s.preventDefault();let w=n.current;if(!w)return;let A=w.getBoundingClientRect(),H=s.clientX-A.left,$=s.clientY-A.top,q=s.deltaY<0?1.1:1/1.1,Y=Math.min(4,Math.max(.02,i*q)),K=Y/i;h(H-(H-b)*K),m($-($-r)*K),l(Y)},[i,b,r]);(0,B.useEffect)(()=>{let s=n.current;if(s)return s.addEventListener("wheel",g,{passive:!1}),()=>s.removeEventListener("wheel",g)},[g]);let d=s=>{p.current={x:s.clientX,y:s.clientY,tx:b,ty:r}},f=s=>{p.current&&(h(p.current.tx+(s.clientX-p.current.x)),m(p.current.ty+(s.clientY-p.current.y)))},N=()=>{p.current=null},C=()=>{let s=document.createElementNS(ve,"svg");s.setAttribute("xmlns",ve),s.setAttribute("width",String(u)),s.setAttribute("height",String(v)),s.setAttribute("viewBox",`0 0 ${u} ${v}`);let w=document.createElementNS(ve,"rect");return w.setAttribute("x","0"),w.setAttribute("y","0"),w.setAttribute("width",String(u)),w.setAttribute("height",String(v)),w.setAttribute("fill","#ffffff"),s.appendChild(w),a.current&&s.appendChild(a.current.cloneNode(!0)),`<?xml version="1.0" encoding="UTF-8"?>
`+new XMLSerializer().serializeToString(s)},R=e?.name||"dashboard",L=()=>Ne(`${R}.svg`,C(),"image/svg+xml"),S=()=>{let s=C(),w=new Image,A=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),H=URL.createObjectURL(A);w.onload=()=>{let $=document.createElement("canvas");$.width=u*2,$.height=v*2;let q=$.getContext("2d");q&&(q.fillStyle="#fff",q.fillRect(0,0,$.width,$.height),q.drawImage(w,0,0,$.width,$.height),URL.revokeObjectURL(H),$.toBlob(Y=>{Y&&Ne(`${R}.png`,Y,"image/png")},"image/png"))},w.onerror=()=>URL.revokeObjectURL(H),w.src=H},W=()=>{e&&Ne(`${R}.excalidraw`,Je(e.zones),"application/json")};return e?(0,T.jsxs)("div",{className:"canvas-wrap",children:[(0,T.jsxs)("div",{className:"canvas-toolbar",children:[(0,T.jsxs)("div",{className:"tb-left",children:[(0,T.jsx)("span",{className:"dash-title",children:e.name}),(0,T.jsxs)("span",{className:"dash-dim",children:[u," \xD7 ",v," px"]})]}),(0,T.jsxs)("div",{className:"tb-right",children:[(0,T.jsx)("button",{onClick:()=>l(s=>Math.min(4,s*1.15)),children:o("zoomIn")}),(0,T.jsx)("button",{onClick:()=>l(s=>Math.max(.02,s/1.15)),children:o("zoomOut")}),(0,T.jsx)("button",{onClick:D,children:o("fit")}),(0,T.jsxs)("span",{className:"zoom-label",children:[Math.round(i*100),"%"]}),(0,T.jsx)("span",{className:"tb-sep"}),(0,T.jsx)("button",{onClick:L,children:o("exportSvg")}),(0,T.jsx)("button",{onClick:S,children:o("exportPng")}),(0,T.jsx)("button",{className:"primary",onClick:W,children:o("exportExcalidraw")})]})]}),(0,T.jsxs)("div",{className:"zone-legend",children:[(0,T.jsx)("span",{className:"zl-title",children:o("zoneLegendTitle")}),["worksheet","flow","basic","card","text","empty"].map(s=>(0,T.jsxs)("span",{className:"zl-item",children:[(0,T.jsx)("span",{className:"zl-swatch",style:{background:se[s].fill==="none"?"transparent":se[s].fill,borderColor:se[s].stroke,borderStyle:se[s].dash?"dashed":"solid"}}),o(Vt[s])]},s))]}),(0,T.jsx)("div",{ref:n,className:"canvas-viewport",onMouseDown:d,onMouseMove:f,onMouseUp:N,onMouseLeave:N,children:(0,T.jsxs)("svg",{width:u,height:v,style:{transform:`translate(${b}px, ${r}px) scale(${i})`,transformOrigin:"0 0"},children:[(0,T.jsx)("rect",{x:0,y:0,width:u,height:v,fill:"#ffffff"}),(0,T.jsx)("g",{ref:a,children:e.zones.map((s,w)=>(0,T.jsx)(Qe,{z:s,depth:0,t:o,highlightName:t??null,highlight:t!==null&&s.kind==="worksheet"&&s.name===t},w))})]})}),(0,T.jsxs)("div",{className:"legend",children:[(0,T.jsxs)("span",{children:[(0,T.jsx)("i",{className:"sw sw-ws"})," ",o("zoneWorksheet")]}),(0,T.jsxs)("span",{children:[(0,T.jsx)("i",{className:"sw sw-ct"})," ",o("zoneContainer")]}),(0,T.jsxs)("span",{children:[(0,T.jsx)("i",{className:"sw sw-tx"})," ",o("zoneText")]})]})]}):(0,T.jsx)("div",{className:"canvas-empty",children:o("noDashboard")})}var Re=require("react");var O=require("react/jsx-runtime");function Ee(e){return e.flatMap(t=>[t,...Ee(t.children)])}function tt({model:e,dashIdx:t,onSelectDashboard:o,highlightSheet:n,onHighlightSheet:a}){let i=Z(),l=e.dashboards[t]??null,b=(0,Re.useMemo)(()=>{if(!l)return[];let r=new Set,m=[];for(let p of Ee(l.zones))p.kind==="worksheet"&&p.name&&!r.has(p.name)&&(r.add(p.name),m.push(p.name));return m},[l]),h=(0,Re.useMemo)(()=>{let r=new Set;for(let m of e.dashboards)for(let p of Ee(m.zones))p.kind==="worksheet"&&p.name&&r.add(p.name);return e.worksheets.filter(m=>!r.has(m)).length},[e]);return(0,O.jsxs)("div",{className:"wb-panel",children:[(0,O.jsxs)("section",{className:"wb-section",children:[(0,O.jsxs)("h3",{className:"wb-section-title",children:[i("wbDashboards"),(0,O.jsx)("span",{className:"wb-count",children:e.dashboards.length})]}),(0,O.jsxs)("ul",{className:"wb-list",children:[e.dashboards.map((r,m)=>{let u=Ee(r.zones).filter(v=>v.kind==="worksheet").length;return(0,O.jsx)("li",{children:(0,O.jsxs)("button",{className:`wb-item${m===t?" active":""}`,onClick:()=>o(m),title:r.name,children:[(0,O.jsx)("span",{className:"wb-item-name",children:r.name}),(0,O.jsx)("span",{className:"wb-item-meta",children:i("wbSheetsInDash",{count:u})})]})},m)}),e.dashboards.length===0&&(0,O.jsx)("li",{className:"wb-empty",children:i("wbNoDashboards")})]})]}),(0,O.jsxs)("section",{className:"wb-section",children:[(0,O.jsxs)("h3",{className:"wb-section-title",children:[i("wbWorksheets"),(0,O.jsx)("span",{className:"wb-count",children:b.length})]}),(0,O.jsxs)("ul",{className:"wb-list",children:[b.map(r=>(0,O.jsx)("li",{children:(0,O.jsx)("button",{className:`wb-item wb-sheet${n===r?" highlight":""}`,onClick:()=>a(n===r?null:r),title:i("wbHighlightHint"),children:(0,O.jsx)("span",{className:"wb-item-name",children:r})})},r)),b.length===0&&(0,O.jsx)("li",{className:"wb-empty",children:i("wbNoSheetsInDash")})]}),h>0&&(0,O.jsx)("p",{className:"wb-note",children:i("wbUnusedNote",{count:h})})]})]})}var F=require("react");var te=176,ie=48,me=128,ot=60,nt=14,rt=44,at=24,st=20,Ae={datasource:{fill:"#e7f5ff",stroke:"#1971c2",tag:"\u6570\u636E\u6E90"},dimension:{fill:"#ffe8cc",stroke:"#f08c00",tag:"\u7EF4\u5EA6"},measure:{fill:"#d3f9d8",stroke:"#2f9e44",tag:"\u5EA6\u91CF"},calc:{fill:"#f3e8ff",stroke:"#7048e8",tag:"\u8BA1\u7B97\u5B57\u6BB5"},parameter:{fill:"#cffafe",stroke:"#0891b2",tag:"\u53C2\u6570"},unknown:{fill:"#f1f3f5",stroke:"#ced4da",tag:"\u672A\u77E5"}};function fe(e){return e.kind==="datasource"?"datasource":e.kind==="unknown"?"unknown":e.isParameter?"parameter":e.isCalc?"calc":e.role==="dimension"?"dimension":"measure"}function Yt(e){if(!e)return[];let t=[],o=/\[([^\]]+)\]/g,n;for(;n=o.exec(e);)t.push(n[1]);return t}function it(e){let t=[],o=[],n=[],a=new Set,i=new Map,l=new Map,b=new Map,h=new Map;return e.datasources.forEach((r,m)=>{let p="ds:"+m;a.add(p),t.push({id:p,kind:"datasource",label:r.caption||r.name||"\u6570\u636E\u6E90 "+(m+1),name:r.name,dsIdx:m}),n.push(p);for(let u of r.columns){let v=re(u.name),D="f:"+m+":"+v,g=!!u.formulaRaw;a.add(D),t.push({id:D,kind:"field",label:u.label,caption:u.caption,name:u.name,role:u.role,isCalc:g,isParameter:u.isParameter?!0:void 0,parameter:u.isParameter?u.parameter??null:void 0,dsIdx:m,formula:u.formula,formulaRaw:u.formulaRaw}),i.set(m+"|"+v,D),b.has(v)||b.set(v,D),u.caption&&(l.set(m+"|"+u.caption,D),h.has(u.caption)||h.set(u.caption,D)),g||o.push({from:p,to:D})}for(let u of r.columns){if(!u.formulaRaw)continue;let v="f:"+m+":"+re(u.name),D=new Set;for(let g of Yt(u.formulaRaw)){let d=re(g),f=i.get(m+"|"+d)||b.get(d);if(f||(f=l.get(m+"|"+g)||h.get(g)),f&&f!==v&&!D.has(f))D.add(f),o.push({from:v,to:f});else if(!f&&!D.has(g)){D.add(g);let N="u:"+m+":"+d;a.has(N)||(a.add(N),t.push({id:N,kind:"unknown",label:g,name:g,dsIdx:m})),o.push({from:v,to:N})}}}}),{nodes:t,edges:o,dsNodes:n}}function lt(e){let t=new Map,o=new Map;for(let n of e)t.has(n.from)||t.set(n.from,[]),t.get(n.from).push(n.to),o.has(n.to)||o.set(n.to,[]),o.get(n.to).push(n.from);return{out:t,inc:o}}function Kt(e,t){let{out:o}=lt(t),n=new Set,a=[...o.get(e)||[]];for(;a.length;){let i=a.pop();if(!n.has(i)){n.add(i);for(let l of o.get(i)||[])a.push(l)}}return n}function Xt(e,t){let{inc:o}=lt(t),n=new Set,a=[...o.get(e)||[]];for(;a.length;){let i=a.pop();if(!n.has(i)){n.add(i);for(let l of o.get(i)||[])a.push(l)}}return n}function dt(e,t){return{self:new Set([e]),upstream:Kt(e,t),downstream:Xt(e,t)}}function ct(e,t){let o=new Map,n=new Map;e.forEach(g=>{o.set(g.id,new Set),n.set(g.id,g)}),t.forEach(g=>{g.from.startsWith("ds:")||o.has(g.from)&&o.get(g.from).add(g.to)});let a=new Map,i=new Set,l=g=>{if(a.has(g))return a.get(g);if(i.has(g))return 1;i.add(g);let d=o.get(g),f=0;if(d&&d.size){for(let N of d)f=Math.max(f,l(N));f+=1}else{let N=n.get(g);f=N&&N.kind==="datasource"?0:1}return i.delete(g),a.set(g,f),f};e.forEach(g=>l(g.id));let b=new Map;e.forEach(g=>{let d=a.get(g.id)??0;b.has(d)||b.set(d,[]),b.get(d).push(g)}),b.forEach((g,d)=>{d===1&&g.sort((f,N)=>{let C=f.role==="dimension"?0:1,R=N.role==="dimension"?0:1;return C-R})});let h={},r=[],m=at,p=0,u=[];[...b.keys()].sort((g,d)=>g-d).forEach(g=>{let d=b.get(g),f=d.length,N=f>st?Math.ceil(f/st):1,C=Math.ceil(f/N),R=[];for(let S=0;S<N;S++){let W=Math.min(f,(S+1)*C)-S*C;R.push(W*ie+(W-1)*nt)}let L=Math.max(0,...R);u.push({layer:g,arr:d,subCols:N,perCol:C,laneH:L}),p=Math.max(p,L)}),u.forEach(({layer:g,arr:d,subCols:f,perCol:N,laneH:C})=>{let R=rt+Math.max(0,(p-C)/2),L=f*te+(f-1)*ot;d.forEach((S,W)=>{let s=Math.floor(W/N),w=W%N;h[S.id]={x:m+s*(te+ot),y:R+w*(ie+nt)}}),r.push({layer:g,x:m,right:m+L,width:L,count:d.length,subCols:f,label:g===0?"\u6570\u636E\u6E90":g===1?"\u539F\u59CB\u5B57\u6BB5\uFF08\u7EF4\u5EA6\u2191 / \u5EA6\u91CF\u2193\uFF09":`\u8BA1\u7B97\u5B57\u6BB5 \xB7 \u5C42\u7EA7 ${g-1}`}),m+=L+me}),r.sort((g,d)=>g.layer-d.layer);let v=Math.max(0,m-me)+at,D=rt+p+48;return{pos:h,lanes:r,width:v,height:D}}function Me(e){if(e==null)return null;let t=typeof e=="number"?String(e):String(e).trim();if(t==="")return null;let o=Number(t);if(!Number.isFinite(o))return null;let n=Number(o.toPrecision(15));return Number.isFinite(n)?n:o}function be(e){return new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(e)}function Jt(e){let t=/^[pP](\d*(?:\.\d+)?)%?$/.exec(e.trim())||/^(\d+(?:\.\d+)?)%$/.exec(e.trim());if(!t)return null;let o=t[1];return o===void 0||o===""?0:o.includes(".")?(o.split(".")[1]||"").length:Number(o)}function Qt(e){return/^[cC]/.test(e.trim())?/^[cC]2052/.test(e.trim())?"\xA5":/^[cC]1033/.test(e.trim())?"$":"\xA5":null}function pt(e,t){if(e==null||e==="")return"\u2014";let o=String(e),n=Me(o);if(n===null)return o;let a=(t??"").trim(),i=Jt(a);if(i!==null)return`${(n*100).toFixed(i)}%`;let l=Qt(a);return l?`${l}${be(n)}`:be(n)}function Pe(e,t="step"){if(!e)return null;let o=Me(e.min),n=Me(e.max),a=Me(e.granularity);if(o===null&&n===null&&a===null)return null;let i=[];return(o!==null||n!==null)&&i.push(`${o!==null?be(o):"\u2014"} ~ ${n!==null?be(n):"\u2014"}`),a!==null&&i.push(`${t} ${be(a)}`),i.join(" \xB7 ")}var ft=require("react");var eo=new Set(["IF","THEN","ELSE","ELSEIF","END","CASE","WHEN","AND","OR","NOT","IN","NULL","TRUE","FALSE","BETWEEN","LIKE","IS","AS"]),to=new Set(["SUM","AVG","MIN","MAX","COUNT","COUNTD","ATTR","MEDIAN","STDEV","STDEVP","VAR","VARP","ZN","MODE","ABS","ROUND","FLOOR","CEILING","CEIL","SIGN","SQRT","POWER","EXP","LN","LOG","IFNULL","ISNULL","NULLIF","IIF","RUNNING_SUM","RUNNING_AVG","RUNNING_MIN","RUNNING_MAX","WINDOW_SUM","WINDOW_AVG","WINDOW_MIN","WINDOW_MAX","LOOKUP","PREVIOUS_VALUE","RANK","RANK_UNIQUE","RANK_DENSE","RANK_MODIFIED","INDEX","SIZE","FIRST","LAST","TOTAL","DATE","DATEPARSE","DATENAME","DATEPART","DATEADD","DATEDIFF","DATETRUNC","YEAR","QUARTER","MONTH","DAY","WEEK","HOUR","MINUTE","SECOND","TODAY","NOW","MAKEDATE","MAKEDATETIME","MAKETIME","ISOYEAR","LEFT","RIGHT","MID","LEN","CONTAINS","FIND","FINDNTH","REPLACE","REGEXP_EXTRACT","REGEXP_MATCH","REGEXP_REPLACE","SPLIT","UPPER","LOWER","TRIM","LTRIM","RTRIM","SPACE","ASCII","CHAR","STRING","FLOAT","INT","BOOL","DATETIME"]),oo=[["comment",/\/\/[^\n]*|\/\*[\s\S]*?\*\//],["string",/'(?:[^'\\]|\\.)*'/],["field",/\[[^\]]*\]/],["number",/\d+(?:\.\d+)?/],["ident",/[A-Za-z_][A-Za-z0-9_]*/],["ws",/\s+/],["other",/[^\s]/]];function ut(e){let t=[],o=e;for(;o.length>0;){let n=!1;for(let[a,i]of oo){let l=i.exec(o);if(l&&l.index===0){t.push({type:a,value:l[0]}),o=o.slice(l[0].length),n=!0;break}}n||(t.push({type:"other",value:o[0]}),o=o.slice(1))}return t}function mt(e){switch(e.type){case"comment":return"fh-comment";case"string":return"fh-string";case"field":return"fh-field";case"number":return"fh-number";case"ident":{let t=e.value.toUpperCase();return eo.has(t)?"fh-kw":to.has(t)?"fh-fn":"fh-ident"}default:return"fh-other"}}var De=require("react/jsx-runtime");function bt({formula:e}){if(!e)return null;let t=ut(e);return(0,De.jsx)("code",{className:"formula-hl",children:t.map((o,n)=>o.type==="ws"?(0,De.jsx)(ft.Fragment,{children:o.value},n):(0,De.jsx)("span",{className:mt(o),children:o.value},n))})}var x=require("react/jsx-runtime"),no={datasource:"legendDatasource",dimension:"legendDimension",measure:"legendMeasure",calc:"legendCalc",parameter:"legendParameter",unknown:"legendUnknown"};function ro(e){return[["datasource",e("legendDatasource")],["dimension",e("legendDimension")],["measure",e("legendMeasure")],["calc",e("legendCalc")],["parameter",e("legendParameter")],["unknown",e("legendUnknown")]]}function ao(e){return[["all",e("focusAll")],["calc",e("colCalc")],["dimension",e("roleDimension")],["measure",e("roleMeasure")],["parameter",e("legendParameter")]]}function so(e,t){return t===0?e("laneDatasource"):t===1?e("laneRawFields"):e("laneCalcLayer",{level:t-1})}var gt=1200;function ht({model:e}){let t=Z(),{nodes:o,edges:n}=(0,F.useMemo)(()=>it(e),[e]),a=(0,F.useMemo)(()=>new Map(o.map(c=>[c.id,c])),[o]),[i,l]=(0,F.useState)(null),[b,h]=(0,F.useState)(""),[r,m]=(0,F.useState)("all"),[p,u]=(0,F.useState)("auto"),[v,D]=(0,F.useState)({x:40,y:20,k:1}),g=(0,F.useRef)(null),d=(0,F.useRef)(null),f=(0,F.useRef)(!1),N=p==="all"?1/0:p==="auto"?o.length>gt?2:1/0:Number(p),C=(0,F.useMemo)(()=>{if(!i||N===1/0)return{nodes:o,edges:n};let c=new Set([i]),y=new Set([i]);for(let P=0;P<N&&y.size;P++){let G=new Set;for(let I of n)y.has(I.from)&&!c.has(I.to)?(c.add(I.to),G.add(I.to)):y.has(I.to)&&!c.has(I.from)&&(c.add(I.from),G.add(I.from));y=G}return{nodes:o.filter(P=>c.has(P.id)),edges:n.filter(P=>c.has(P.from)&&c.has(P.to))}},[o,n,i,N]);(0,F.useEffect)(()=>{o.length<=gt||l(c=>{if(c)return c;let y=new Map;for(let I of n)y.set(I.from,(y.get(I.from)??0)+1),y.set(I.to,(y.get(I.to)??0)+1);let P=null,G=-1;for(let I of o){let Q=y.get(I.id)??0;Q>G&&(G=Q,P=I.id)}return P})},[o,n]);let R=(0,F.useMemo)(()=>ct(C.nodes,C.edges),[C]),L=C.nodes.length!==o.length,S=(0,F.useMemo)(()=>i?dt(i,n):null,[i,n]),W=(0,F.useMemo)(()=>S?new Set([...S.self,...S.upstream,...S.downstream]):null,[S]),s=(0,F.useCallback)(()=>{let c=g.current;if(!c)return;let y=c.getBoundingClientRect();if(!y||y.width===0)return;let P=Math.min((y.width-24)/R.width,(y.height-24)/R.height,1);D({x:Math.max(8,(y.width-R.width*P)/2),y:12,k:P})},[R.width,R.height]);(0,F.useEffect)(()=>{let c=requestAnimationFrame(s);return()=>cancelAnimationFrame(c)},[s]),(0,F.useEffect)(()=>{let c=g.current;if(!c)return;let y=new ResizeObserver(()=>s());return y.observe(c),()=>y.disconnect()},[s]);let w=(0,F.useCallback)(c=>{if(!d.current)return;let y=c.clientX-d.current.x,P=c.clientY-d.current.y;(Math.abs(y)>3||Math.abs(P)>3)&&(d.current.moved=!0);let G=Number.isFinite(d.current.vx+y)?d.current.vx+y:0,I=Number.isFinite(d.current.vy+P)?d.current.vy+P:0;D(Q=>({...Q,x:G,y:I}))},[]),A=(0,F.useCallback)(()=>{d.current&&(f.current=!!d.current.moved,window.removeEventListener("pointermove",w),window.removeEventListener("pointerup",A),window.removeEventListener("blur",A),d.current=null)},[w]);(0,F.useEffect)(()=>()=>{window.removeEventListener("pointermove",w),window.removeEventListener("pointerup",A),window.removeEventListener("blur",A)},[w,A]);let H=(0,F.useCallback)(c=>{c.button===0&&(d.current={x:c.clientX,y:c.clientY,vx:v.x,vy:v.y,moved:!1},window.addEventListener("pointermove",w),window.addEventListener("pointerup",A),window.addEventListener("blur",A))},[v.x,v.y,w,A]),$=c=>{if(c.target===g.current){if(f.current){f.current=!1;return}l(null)}},q=(0,F.useMemo)(()=>o.filter(c=>c.kind==="field"),[o]),Y=(0,F.useMemo)(()=>{let c=b.trim().toLowerCase();return q.filter(y=>!(r==="parameter"&&!y.isParameter||r==="calc"&&(!y.isCalc||y.isParameter)||r==="dimension"&&(y.isParameter||y.role!=="dimension")||r==="measure"&&(y.isParameter||y.role!=="measure")||c&&!String(y.label).toLowerCase().includes(c)&&!String(y.name).toLowerCase().includes(c)))},[q,r,b]),K=(0,F.useMemo)(()=>{let c=b.trim().toLowerCase();return c?new Set(q.filter(y=>String(y.label).toLowerCase().includes(c)||String(y.name).toLowerCase().includes(c)).map(y=>y.id)):null},[q,b]),z=i?a.get(i):null,ge=S?S.upstream.size:0,he=S?S.downstream.size:0,j=c=>S?W?.has(c.from)&&W.has(c.to)?"ln-edge-hl":"ln-edge-dim":K?K.has(c.from)&&K.has(c.to)?"ln-edge-hl":"ln-edge-dim":"",X=c=>S?S.self.has(c.id)?"ln-self":S.upstream.has(c.id)?"ln-up":S.downstream.has(c.id)?"ln-down":"ln-dim":K?K.has(c.id)?"ln-search":"ln-dim":"";return(0,x.jsxs)("div",{className:"lineage",children:[(0,x.jsxs)("aside",{className:"lineage-picker",children:[(0,x.jsx)("div",{className:"picker-head",children:t("pickerHead")}),(0,x.jsx)("input",{className:"ft-search",placeholder:t("searchLineage"),value:b,onChange:c=>h(c.target.value)}),(0,x.jsx)("div",{className:"role-tabs",children:ao(t).map(([c,y])=>(0,x.jsx)("button",{className:r===c?"rt active":"rt",onClick:()=>m(c),children:y},c))}),(0,x.jsxs)("div",{className:"picker-list",children:[Y.map(c=>(0,x.jsx)("button",{className:`picker-item cat-${fe(c)}${i===c.id?" active":""}`,onClick:()=>l(c.id),title:c.name??void 0,children:c.label},c.id)),Y.length===0&&(0,x.jsx)("p",{className:"muted",children:t("noMatchPeriod")})]})]}),(0,x.jsxs)("section",{className:"lineage-canvas",children:[(0,x.jsxs)("div",{className:"lineage-toolbar",children:[(0,x.jsxs)("div",{className:"legend",children:[ro(t).map(([c,y])=>{let P=Ae[c];return(0,x.jsxs)("span",{className:"lg",children:[(0,x.jsx)("i",{style:{background:P.fill,borderColor:P.stroke}}),y]},c)}),(0,x.jsx)("span",{className:"lg-note",children:t("arrowNote")})]}),(0,x.jsxs)("div",{className:"toolbar-actions",children:[(0,x.jsxs)("span",{className:"focus-seg",title:t("focusTooltip"),children:[t("focus"),[["auto",t("focusAuto")],["1","\xB11"],["2","\xB12"],["3","\xB13"],["all",t("focusAll")]].map(([c,y])=>(0,x.jsx)("button",{className:p===c?"active":"",onClick:()=>u(c),children:y},c))]}),L&&(0,x.jsx)("span",{className:"focus-count",children:t("nodesCount",{shown:C.nodes.length,total:o.length})}),(0,x.jsx)("button",{onClick:s,children:t("fitWindow")}),(0,x.jsx)("button",{onClick:()=>l(null),children:t("clearHighlight")})]})]}),(0,x.jsxs)("svg",{ref:g,className:"lineage-svg",onPointerDown:H,onClick:$,children:[(0,x.jsxs)("defs",{children:[(0,x.jsx)("marker",{id:"ln-arrow",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:(0,x.jsx)("path",{d:"M0,0 L10,5 L0,10 z",fill:"#868e96"})}),(0,x.jsx)("marker",{id:"ln-arrow-hl",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:(0,x.jsx)("path",{d:"M0,0 L10,5 L0,10 z",fill:"#1971c2"})})]}),(0,x.jsxs)("g",{transform:`translate(${v.x},${v.y}) scale(${v.k})`,children:[R.lanes.map(c=>(0,x.jsxs)("g",{children:[c.layer!==0&&(0,x.jsx)("line",{className:"ln-lane-line",x1:c.x-me/2,y1:0,x2:c.x-me/2,y2:Math.max(0,R.height-48)}),(0,x.jsxs)("text",{className:"ln-lane-label",x:c.x+c.width/2,y:20,textAnchor:"middle",children:[so(t,c.layer),c.subCols>1?t("subCols",{count:c.subCols}):""]})]},"lane-"+c.layer)),C.edges.map((c,y)=>{let P=R.pos[c.from],G=R.pos[c.to];if(!P||!G)return null;let I=P.x<=G.x?P:G,Q=P.x<=G.x?G:P,le=I.x+te,oe=I.y+ie/2,ne=Q.x,ze=Q.y+ie/2,Ie=Math.max(30,Math.abs(ne-le)/2),Mt=`M${le},${oe} C${le+Ie},${oe} ${ne-Ie},${ze} ${ne},${ze}`,Dt=j(c)==="ln-edge-hl";return(0,x.jsx)("path",{d:Mt,className:"ln-edge "+j(c),markerEnd:"url(#"+(Dt?"ln-arrow-hl":"ln-arrow")+")"},y)}),C.nodes.map(c=>{let y=R.pos[c.id];if(!y)return null;let P=fe(c),G=Ae[P],I=Ze(c.label),Q=13,le=24-(I.length-1)*Q/2+10;return(0,x.jsxs)("g",{className:"ln-node "+X(c),transform:`translate(${y.x},${y.y})`,onClick:oe=>{oe.stopPropagation(),l(c.id)},style:{cursor:"pointer"},children:[(0,x.jsx)("rect",{width:te,height:ie,rx:9,className:"ln-rect",style:{fill:G.fill,stroke:G.stroke}}),(0,x.jsx)("text",{className:"ln-label",x:te/2,textAnchor:"middle",children:I.map((oe,ne)=>(0,x.jsx)("tspan",{x:te/2,y:le+ne*Q,children:oe},ne))})]},c.id)})]})]})]}),(0,x.jsxs)("aside",{className:"lineage-detail",children:[!z&&(0,x.jsx)("div",{className:"detail-empty",children:t("detailEmpty")}),z&&(0,x.jsxs)("div",{className:"detail-body",children:[(0,x.jsx)("div",{className:"detail-head",children:z.label}),(0,x.jsxs)("div",{className:"detail-meta",children:[(0,x.jsx)("span",{className:`pill cat-${fe(z)}`,children:t(no[fe(z)])}),z.kind==="field"&&!z.isParameter&&(0,x.jsx)("span",{className:"pill",children:z.role==="dimension"?t("roleDimension"):z.role==="measure"?t("roleMeasure"):t("kindField")})]}),z.isParameter&&(0,x.jsxs)("div",{className:"detail-param",children:[(0,x.jsxs)("div",{className:"dp-value",children:[(0,x.jsx)("span",{className:"dp-label",children:t("paramValue")}),(0,x.jsx)("span",{className:"dp-num",children:pt(z.parameter?.value,z.parameter?.defaultFormat)})]}),(0,x.jsxs)("div",{className:"dp-meta",children:[(0,x.jsxs)("span",{children:[t("paramDomain"),": ",z.parameter?.domainType??"\u2014"]}),Pe(z.parameter?.range,t("paramStep"))&&(0,x.jsxs)("span",{children:[t("paramRange"),": ",Pe(z.parameter?.range,t("paramStep"))]}),(0,x.jsxs)("span",{children:[t("paramFormat"),": ",z.parameter?.defaultFormat??"\u2014"]})]}),(0,x.jsxs)("div",{className:"dp-raw",title:t("paramRawHint"),children:[t("paramRaw"),": ",z.parameter?.value??"\u2014"]})]}),z.kind==="field"&&(0,x.jsx)("div",{className:"detail-internal",title:z.name??void 0,children:t("internalName",{name:z.name??""})}),z.formulaRaw&&(0,x.jsxs)("div",{className:"detail-formula",children:[(0,x.jsx)("div",{className:"df-title",children:t("calcFormula")}),(0,x.jsx)("pre",{className:"calc-formula",children:(0,x.jsx)(bt,{formula:z.formula||z.formulaRaw})})]}),(0,x.jsxs)("div",{className:"detail-counts",children:[(0,x.jsxs)("div",{className:"dc up",children:[(0,x.jsx)("span",{className:"dc-num",children:ge}),(0,x.jsx)("span",{className:"dc-lbl",children:t("upstreamLabel")})]}),(0,x.jsxs)("div",{className:"dc down",children:[(0,x.jsx)("span",{className:"dc-num",children:he}),(0,x.jsx)("span",{className:"dc-lbl",children:t("downstreamLabel")})]})]}),S&&ge>0&&(0,x.jsxs)("div",{className:"detail-list",children:[(0,x.jsx)("div",{className:"dl-title ln-up",children:t("upstreamTitle")}),[...S.upstream].map(c=>{let y=a.get(c);return(0,x.jsx)("button",{className:"dl-item",onClick:()=>l(c),children:y?y.label:c},c)})]}),S&&he>0&&(0,x.jsxs)("div",{className:"detail-list",children:[(0,x.jsx)("div",{className:"dl-title ln-down",children:t("downstreamTitle")}),[...S.downstream].map(c=>{let y=a.get(c);return(0,x.jsx)("button",{className:"dl-item",onClick:()=>l(c),children:y?y.label:c},c)})]})]})]})]})}var ee=require("react");function wt(e){let t=[],o=[],n=new Set;return e.datasources.forEach((a,i)=>{let l=a.dataModel;if(!l||l.tables.length===0)return;let b=a.caption||`#${i+1}`,h=(r,m,p,u)=>`ds${i}:${p}:${r}:${m??""}:${u??""}`;for(let r of l.tables){let m=h(r.name,r.table,r.kind,r.objectId);n.has(m)||(n.add(m),t.push({id:m,label:r.name,sublabel:r.table||null,kind:r.kind,datasource:b,connection:a.connection??null,sql:r.sql}))}l.joins.forEach((r,m)=>{let p=h(r.left.name,r.left.table,r.left.kind,r.left.objectId),u=h(r.right.name,r.right.table,r.right.kind,r.right.objectId);!n.has(p)||!n.has(u)||o.push({id:`ds${i}:join${m}`,from:p,to:u,joinType:r.joinType,leftExpr:r.leftExpr,rightExpr:r.rightExpr,cardinality:r.cardinality,datasource:b})})}),{nodes:t,edges:o}}function xt(e){let{nodes:t,edges:o}=e,n=new Map;for(let s of t)n.set(s.id,[]);for(let s of o)n.get(s.to)?.push(s.from);let a=new Map;for(let s of t)a.set(s.id,[]);for(let s of o)a.get(s.from)?.push(s.to);let i=new Map,l=new Map,b=new Set,h=[],r=new Map,m=0,p=0,u=s=>{i.set(s,m),l.set(s,m),m+=1,h.push(s),b.add(s);for(let w of a.get(s)||[])i.has(w)?b.has(w)&&l.set(s,Math.min(l.get(s),i.get(w))):(u(w),l.set(s,Math.min(l.get(s),l.get(w))));if(l.get(s)===i.get(s)){for(;;){let w=h.pop();if(b.delete(w),r.set(w,p),w===s)break}p+=1}};for(let s of t)i.has(s.id)||u(s.id);let v=new Map;for(let s=0;s<p;s++)v.set(s,new Set);for(let s of o){let w=r.get(s.from),A=r.get(s.to);w!==A&&v.get(A).add(w)}let D=new Map,g=s=>{let w=D.get(s);if(w!==void 0)return w;let A=[...v.get(s)||[]],H=A.length===0?0:Math.max(...A.map(g))+1;return D.set(s,H),H},d=new Map;for(let s of t)d.set(s.id,g(r.get(s.id)));let f=new Map;for(let s of t){let w=d.get(s.id)??0;f.has(w)||f.set(w,[]),f.get(w).push(s)}let N=[...f.keys()].sort((s,w)=>s-w),C={},R=s=>(C[s]?.y??24)+56/2;N.forEach((s,w)=>{let A=f.get(s).slice(),H=24+w*288;if(s===0){let j=24;for(let X of A)C[X.id]={x:H,y:j},j+=78;return}let $=A.map(j=>{let c=(n.get(j.id)||[]).map(R),y=c.length?c.reduce((P,G)=>P+G,0)/c.length:24+56/2;return{node:j,anchor:y}});$.sort((j,X)=>j.anchor-X.anchor);let q=[],Y=24;for(let j of $){let X=Math.max(Y,j.anchor-28);q.push({id:j.node.id,top:X,anchor:j.anchor}),Y=X+56+22}let K=q[0].top,z=q[q.length-1].top+56,ge=q.reduce((j,X)=>j+X.anchor,0)/q.length,he=Math.max(ge-(K+z)/2,24-K);for(let j of q)C[j.id]={x:H,y:j.top+he}});let L=t.length?Math.max(...t.map(s=>C[s.id].y+56)):56,S=48+N.length*168+Math.max(0,N.length-1)*120,W=L+24;return{pos:C,layers:N.length,width:Math.max(S,320),height:Math.max(W,160)}}function kt(e,t,o=168,n=56){let a=e.x+o,i=e.y+n/2,l=t.x,b=t.y+n/2,h=l-a;if(h>8){let p=Math.min(Math.max(h*.45,28),130);return`M ${a} ${i} C ${a+p} ${i}, ${l-p} ${b}, ${l} ${b}`}let r=Math.max(56,Math.abs(b-i)/2+40),m=(a+l)/2;return`M ${a} ${i} Q ${m} ${Math.min(i,b)-r}, ${l} ${b}`}var k=require("react/jsx-runtime");function yt(e,t){return{inner:e("joinInner"),left:e("joinLeft"),right:e("joinRight"),full:e("joinFull"),relationship:e("joinRelationship")}[t]??t}function vt({model:e}){let t=Z(),o=(0,ee.useMemo)(()=>wt(e),[e]),n=(0,ee.useMemo)(()=>xt(o),[o]),[a,i]=(0,ee.useState)(null),[l,b]=(0,ee.useState)(!1),h=d=>{navigator.clipboard?.writeText(d).then(()=>{b(!0),setTimeout(()=>b(!1),1600)},()=>{})},r=(0,ee.useMemo)(()=>new Map(o.nodes.map(d=>[d.id,d])),[o.nodes]);(0,ee.useEffect)(()=>{i(d=>{if(d&&(d.kind==="node"?o.nodes.some(C=>C.id===d.id):o.edges.some(C=>C.id===d.id)))return d;let f=o.nodes.find(N=>N.kind==="custom-sql");return f?{kind:"node",id:f.id}:null})},[o.nodes,o.edges]);let m=d=>{let f=d.connection;return f?[f.class,f.type,f.server,f.dbname,f.filename].filter(Boolean).join(" \xB7 "):""},p=a?.kind==="node"?r.get(a.id)??null:null,u=a?.kind==="edge"?o.edges.find(d=>d.id===a.id)??null:null,v=o.edges.length,D=o.nodes.filter(d=>d.kind==="custom-sql"),g=d=>n.pos[d]??{x:0,y:0};return(0,k.jsxs)("div",{className:"datamodel-view",children:[(0,k.jsxs)("div",{className:"dm-toolbar",children:[(0,k.jsx)("span",{className:"dm-stat",children:t("dmTables",{count:o.nodes.length})}),(0,k.jsx)("span",{className:"dm-stat",children:t("dmJoins",{count:v})}),D.length>0&&(0,k.jsx)("span",{className:"dm-stat",children:t("dmCustomSql",{count:D.length})}),(0,k.jsx)("span",{className:"dm-hint",children:t("dmSelectHint")})]}),(0,k.jsxs)("div",{className:"dm-body",children:[(0,k.jsx)("div",{className:"dm-canvas",children:(0,k.jsxs)("svg",{className:"dm-svg",width:n.width,height:n.height,viewBox:`0 0 ${n.width} ${n.height}`,children:[o.edges.map(d=>{let f=g(d.from),N=g(d.to),C=a?.kind==="edge"&&a.id===d.id,R=r.get(d.from),L=r.get(d.to),S=kt(f,N);return(0,k.jsxs)("g",{className:`dm-edge${C?" active":""}`,children:[(0,k.jsx)("path",{d:S,className:"dm-link-hit",onClick:()=>i({kind:"edge",id:d.id})}),(0,k.jsx)("path",{d:S,className:`dm-link join-${d.joinType}`}),(0,k.jsx)("title",{children:`${R?.label??"?"} \u2014 ${yt(t,d.joinType)} \u2014 ${L?.label??"?"}
${t("dmOn")}: ${d.leftExpr??"\u2014"} = ${d.rightExpr??"\u2014"}`+(d.cardinality?`
${t("dmCardinality")}: ${d.cardinality}`:"")})]},d.id)}),o.nodes.map(d=>{let f=n.pos[d.id]??{x:0,y:0},N=a?.kind==="node"&&a.id===d.id;return(0,k.jsxs)("g",{className:`dm-node dm-${d.kind}${N?" active":""}`,transform:`translate(${f.x}, ${f.y})`,onClick:()=>i({kind:"node",id:d.id}),children:[(0,k.jsx)("title",{children:`${d.label}${d.sublabel?`
`+d.sublabel:""}
${t("dmDatasource")}: ${d.datasource}`}),(0,k.jsx)("rect",{width:168,height:56,rx:8}),(0,k.jsx)("text",{x:12,y:23,className:"dm-node-title",children:d.label.length>16?d.label.slice(0,15)+"\u2026":d.label}),(0,k.jsx)("text",{x:12,y:41,className:"dm-node-sub",children:d.kind==="custom-sql"?t("dmSqlBadge"):(d.sublabel??"").slice(0,20)})]},d.id)})]})}),(0,k.jsxs)("aside",{className:"dm-detail",children:[!a&&(0,k.jsx)("div",{className:"dm-detail-empty",children:o.nodes.length?t("dmSelectHint"):t("dmEmpty")}),p&&(0,k.jsxs)("div",{className:"dm-detail-card",children:[(0,k.jsxs)("div",{className:"dm-detail-title",children:[p.label,(0,k.jsx)("span",{className:`dm-kind-badge ${p.kind}`,children:p.kind==="custom-sql"?t("dmSqlBadge"):t("dmTableBadge")})]}),(0,k.jsxs)("dl",{children:[(0,k.jsx)("dt",{children:t("dmDatasource")}),(0,k.jsx)("dd",{children:p.datasource}),p.sublabel&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)("dt",{children:t("dmPhysical")}),(0,k.jsx)("dd",{className:"mono",children:p.sublabel})]}),m(p)&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)("dt",{children:t("dmConnection")}),(0,k.jsx)("dd",{className:"mono",children:m(p)})]})]}),p.sql&&(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)("div",{className:"dm-sql-title",children:[t("dmSqlText"),(0,k.jsx)("button",{className:"sql-copy",onClick:()=>h(p.sql),children:t(l?"sqlCopied":"sqlCopy")})]}),(0,k.jsx)("pre",{className:"dm-sql",children:p.sql})]})]}),u&&(0,k.jsxs)("div",{className:"dm-detail-card",children:[(0,k.jsx)("div",{className:"dm-detail-title",children:yt(t,u.joinType)}),(0,k.jsxs)("dl",{children:[(0,k.jsx)("dt",{children:t("dmFrom")}),(0,k.jsx)("dd",{children:r.get(u.from)?.label??"?"}),(0,k.jsx)("dt",{children:t("dmTo")}),(0,k.jsx)("dd",{children:r.get(u.to)?.label??"?"}),(0,k.jsx)("dt",{children:t("dmOn")}),(0,k.jsxs)("dd",{className:"mono",children:[u.leftExpr??"\u2014"," = ",u.rightExpr??"\u2014"]}),(0,k.jsx)("dt",{children:t("dmCardinality")}),(0,k.jsx)("dd",{children:u.cardinality??t("dmNotStored")})]})]}),D.length>0&&(0,k.jsxs)("div",{className:"dm-sql-list",children:[(0,k.jsxs)("div",{className:"dm-sql-list-title",children:[t("dmSqlList"),(0,k.jsx)("span",{className:"wb-count",children:D.length})]}),D.map(d=>(0,k.jsx)("button",{className:`dm-sql-item${a?.kind==="node"&&a.id===d.id?" active":""}`,onClick:()=>i({kind:"node",id:d.id}),title:d.datasource,children:d.label},d.id))]}),(0,k.jsxs)("div",{className:"dm-legend",children:[(0,k.jsxs)("div",{className:"dm-legend-item",children:[(0,k.jsx)("span",{className:"dm-swatch dm-table"}),t("dmTableBadge")]}),(0,k.jsxs)("div",{className:"dm-legend-item",children:[(0,k.jsx)("span",{className:"dm-swatch dm-custom-sql"}),t("dmSqlBadge")]}),(0,k.jsx)("div",{className:"dm-legend-item dm-legend-hint",children:t("dmSelectHint")})]})]})]})]})}var M=require("react/jsx-runtime");function Nt({fullscreen:e=!1,onToggleFullscreen:t}){let o=Z(),n=(0,U.useRef)(Ue()).current,[a,i]=(0,U.useState)(n?.model??null),[l,b]=(0,U.useState)(n?.dashIdx??0),[h,r]=(0,U.useState)(n?.view??"layout"),[m,p]=(0,U.useState)(""),[u,v]=(0,U.useState)(n?.fileName??""),[D,g]=(0,U.useState)(!1),[d,f]=(0,U.useState)(null),N=(0,U.useRef)(null);(0,U.useEffect)(()=>{N.current=a?JSON.stringify(a):"null"},[a]),(0,U.useEffect)(()=>{He({model:a,dashIdx:l,view:h,fileName:u,modelJson:N.current})},[a,l,h,u]);let C=(s,w)=>{p("");try{let A=qe(s);i(A),b(0),v(w||"")}catch(A){i(null),p(A.message||o("parseFailed"))}},R=(0,U.useRef)(!1);(0,U.useEffect)(()=>{if(a||R.current)return;R.current=!0;let s=!1;return g(!0),fetch(we).then(w=>{if(!w.ok)throw new Error("HTTP "+w.status);return w.text()}).then(w=>{s||C(w,o("sampleFileName"))}).catch(w=>{s||p(o("sampleAutoLoadFailed")+w.message+o("orChooseManually"))}).finally(()=>{g(!1)}),()=>{s=!0}},[a]);let L=(0,U.useMemo)(()=>a?Be(a):null,[a]),S=a?.dashboards||[],W=S[l]||null;return(0,M.jsxs)("div",{className:"app",children:[(0,M.jsxs)("header",{className:"app-header",children:[(0,M.jsxs)("div",{className:"brand",children:[(0,M.jsx)("h1",{children:o("appTitle")}),(0,M.jsx)("p",{className:"sub",children:o("appSubtitle")})]}),(0,M.jsxs)("div",{className:"header-actions",children:[(0,M.jsxs)("div",{className:"view-tabs",children:[(0,M.jsx)("button",{className:h==="layout"?"vt active":"vt",onClick:()=>r("layout"),children:o("tabLayout")}),(0,M.jsx)("button",{className:h==="lineage"?"vt active":"vt",onClick:()=>r("lineage"),children:o("tabLineage")}),(0,M.jsx)("button",{className:h==="data"?"vt active":"vt",onClick:()=>r("data"),children:o("tabDataModel")})]}),(0,M.jsx)(Ke,{onText:C,onError:p,busy:D}),t&&(0,M.jsx)("button",{className:"fs-toggle",onClick:t,title:o(e?"exitFullscreenEsc":"fullscreenTooltip"),children:o(e?"exitFullscreen":"fullscreen")})]})]}),m&&(0,M.jsxs)("div",{className:"error-banner",children:["\u26A0 ",m]}),!a&&(0,M.jsx)("div",{className:"welcome",children:(0,M.jsxs)("div",{className:"welcome-card",children:[(0,M.jsx)("h2",{children:o(D?"sampleLoading":"welcomeTitle")}),(0,M.jsx)("p",{children:o("helpAuto")}),(0,M.jsxs)("ul",{children:[(0,M.jsxs)("li",{children:[o("help1a"),(0,M.jsx)("b",{children:"1:1"}),o("help1b")]}),(0,M.jsxs)("li",{children:[o("help2a"),(0,M.jsx)("b",{children:"SVG / PNG / .excalidraw"}),o("help2b")]}),(0,M.jsxs)("li",{children:[o("help3a"),(0,M.jsx)("b",{children:o("welcomeMeta")}),o("help3b")]})]}),(0,M.jsxs)("p",{className:"muted",children:[o("helpAuto")," ",o("helpSecurity")]})]})}),a&&L&&(0,M.jsxs)("div",{className:"summary-bar",children:[u&&(0,M.jsx)("span",{className:"sf",children:u}),(0,M.jsxs)("span",{children:[o("statDashboards")," ",(0,M.jsx)("b",{children:L.dashboards})]}),(0,M.jsxs)("span",{children:[o("statWorksheets")," ",(0,M.jsx)("b",{children:L.worksheets})]}),(0,M.jsxs)("span",{children:[o("statDatasources")," ",(0,M.jsx)("b",{children:L.datasources})]}),(0,M.jsxs)("span",{children:[o("statFields")," ",(0,M.jsx)("b",{children:L.fields})]}),(0,M.jsxs)("span",{children:[o("statCalcs")," ",(0,M.jsx)("b",{children:L.calculations})]}),S.length>1&&(0,M.jsx)("select",{className:"dash-select",value:l,onChange:s=>b(+s.target.value),children:S.map((s,w)=>(0,M.jsx)("option",{value:w,children:s.name},w))})]}),a&&h==="layout"&&(0,M.jsxs)("div",{className:"main",children:[(0,M.jsx)("section",{className:"left",children:(0,M.jsx)(et,{dashboard:W,highlightSheet:d})}),(0,M.jsx)("aside",{className:"right",children:(0,M.jsx)(tt,{model:a,dashIdx:l,onSelectDashboard:s=>{b(s),f(null)},highlightSheet:d,onHighlightSheet:f})})]}),a&&h==="lineage"&&(0,M.jsx)(ht,{model:a}),a&&h==="data"&&(0,M.jsx)(vt,{model:a})]})}var V=require("react/jsx-runtime");function Et(e,t,o){if(typeof document>"u"||document.querySelector(`style[data-plugin-css="${t}"]`))return;let n=document.createElement("style");n.dataset.plugin=e,n.dataset.pluginCss=t,n.textContent=o,document.head.appendChild(n)}Et("dsh-tableau-twb-viewer","dsh-tableau-twb-viewer/style.css",_e);Et("dsh-tableau-twb-viewer","dsh-tableau-twb-viewer/plugin.css",Oe);var Fe="twb-viewer";function co({size:e=18,active:t}){return(0,V.jsxs)("svg",{width:e,height:e,viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",style:{display:"block",opacity:t?1:.85},children:[(0,V.jsx)("rect",{x:"1.4",y:"2.2",width:"13.2",height:"11.6",rx:"2",stroke:"currentColor",strokeWidth:"1.2"}),(0,V.jsx)("path",{d:"M1.4 6.2h13.2",stroke:"currentColor",strokeWidth:"1.2"}),(0,V.jsx)("circle",{cx:"5.2",cy:"10.4",r:"1.35",stroke:"currentColor",strokeWidth:"1.1"}),(0,V.jsx)("circle",{cx:"10.8",cy:"10.4",r:"1.35",stroke:"currentColor",strokeWidth:"1.1"}),(0,V.jsx)("path",{d:"M6.55 10.4h2.9",stroke:"currentColor",strokeWidth:"1.1"})]})}function po(){let[e,t]=(0,Se.useState)(!1);return(0,Se.useEffect)(()=>{if(!e)return;let n=a=>{a.key==="Escape"&&t(!1)};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e]),(0,V.jsx)("div",{className:`twb-root twb-root--panel${e?" twb-fullscreen":""}`,children:(0,V.jsx)(Nt,{fullscreen:e,onToggleFullscreen:()=>t(n=>!n)})})}function uo({t:e}){return(0,V.jsx)(Ye,{value:e??Le("zh"),children:(0,V.jsx)(po,{})})}var mo=["slots","locale"];function fo(e){e.effect(()=>e.locale.register(ue,{zh:pe,en:Te}),"dsh-tableau-twb-viewer: locale");let t=e.locale.bind(ue);e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:Fe,order:20,locale:ue,label:()=>t("panel")},co)),e.slots.inject("main",()=>e.slots.register({name:"main",key:Fe,locale:ue},uo))}

		return module.exports;
	}
});
