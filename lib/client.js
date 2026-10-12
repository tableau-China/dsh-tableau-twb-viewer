window.__ModuleLoader__.load({
	id: "dsh-tableau-twb-viewer",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";var Ee=Object.defineProperty;var St=Object.getOwnPropertyDescriptor;var Ct=Object.getOwnPropertyNames;var Tt=Object.prototype.hasOwnProperty;var Lt=(e,t)=>{for(var o in t)Ee(e,o,{get:t[o],enumerable:!0})},Rt=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ct(t))!Tt.call(e,r)&&r!==o&&Ee(e,r,{get:()=>t[r],enumerable:!(n=St(t,r))||n.enumerable});return e};var At=e=>Rt(Ee({},"__esModule",{value:!0}),e);var fo={};Lt(fo,{PANEL_ID:()=>Te,apply:()=>mo,inject:()=>uo});module.exports=At(fo);var Ne=require("react");var We=`.twb-root{--twb-bg: #f1f5f9;--twb-panel: #ffffff;--twb-border: #e2e8f0;--twb-text: #1e293b;--twb-muted: #64748b;--twb-primary: #2563eb;--twb-primary-d: #1d4ed8;--twb-accent: #dbeafe;--twb-shadow: 0 1px 3px rgba(15, 23, 42, .08)}.twb-root *{box-sizing:border-box}.twb-root{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;color:var(--twb-text);background:var(--twb-bg);font-size:14px}.twb-root .app{display:flex;flex-direction:column;height:100vh;overflow:hidden}.twb-root .app-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 20px;background:var(--twb-panel);border-bottom:1px solid var(--twb-border);flex-wrap:wrap}.twb-root .brand h1{font-size:18px;margin:0}.twb-root .brand .sub{margin:2px 0 0;color:var(--twb-muted);font-size:12px}.twb-root .header-actions{flex:1;display:flex;justify-content:flex-end}.twb-root .uploader{display:flex;align-items:center;gap:10px;padding:8px 12px;border:1px dashed var(--twb-border);border-radius:10px;background:#f8fafc}.twb-root .uploader.drag{border-color:var(--twb-primary);background:var(--twb-accent)}.twb-root .uploader .hint{color:var(--twb-muted);font-size:12px}.twb-root button{font:inherit;padding:7px 12px;border:1px solid var(--twb-border);background:#fff;border-radius:8px;cursor:pointer;color:var(--twb-text)}.twb-root button:hover{background:#f8fafc}.twb-root button.primary{background:var(--twb-primary);color:#fff;border-color:var(--twb-primary)}.twb-root button.primary:hover{background:var(--twb-primary-d)}.twb-root button:disabled{opacity:.5;cursor:not-allowed}.twb-root .error-banner{background:#fef2f2;color:#b91c1c;padding:8px 20px;font-size:13px;border-bottom:1px solid #fecaca}.twb-root .welcome{flex:1;display:flex;align-items:center;justify-content:center;padding:24px}.twb-root .welcome-card{background:var(--twb-panel);max-width:560px;padding:28px 32px;border-radius:14px;box-shadow:var(--twb-shadow)}.twb-root .welcome-card h2{margin-top:0}.twb-root .welcome-card ul{line-height:1.9}.twb-root .muted{color:var(--twb-muted)}.twb-root .summary-bar{display:flex;align-items:center;gap:18px;padding:8px 20px;background:var(--twb-panel);border-bottom:1px solid var(--twb-border);font-size:13px;flex-wrap:wrap}.twb-root .summary-bar .sf{font-weight:600;color:var(--twb-primary)}.twb-root .summary-bar b{color:var(--twb-text)}.twb-root .dash-select{margin-left:auto;font:inherit;padding:5px 8px;border:1px solid var(--twb-border);border-radius:8px}.twb-root .main{flex:1;display:grid;grid-template-columns:1fr 380px;min-height:0}.twb-root .left{min-width:0;min-height:0;border-right:1px solid var(--twb-border)}.twb-root .right{min-height:0;overflow:hidden;background:var(--twb-panel)}.twb-root .canvas-wrap{display:flex;flex-direction:column;height:100%}.twb-root .canvas-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;background:#f8fafc;border-bottom:1px solid var(--twb-border);flex-wrap:wrap}.twb-root .tb-left{display:flex;align-items:baseline;gap:10px}.twb-root .dash-title{font-weight:600}.twb-root .dash-dim{color:var(--twb-muted);font-size:12px}.twb-root .tb-right{display:flex;align-items:center;gap:6px;flex-wrap:wrap}.twb-root .zoom-label{font-size:12px;color:var(--twb-muted);min-width:42px;text-align:center}.twb-root .tb-sep{width:1px;height:20px;background:var(--twb-border);margin:0 4px}.twb-root .canvas-viewport{flex:1;position:relative;overflow:hidden;background:#eef2f7;background-image:radial-gradient(#dbe2ea 1px,transparent 1px);background-size:22px 22px;cursor:grab}.twb-root .canvas-viewport:active{cursor:grabbing}.twb-root .canvas-viewport svg{display:block;box-shadow:0 2px 12px #0f172a1f}.twb-root .canvas-empty{display:flex;align-items:center;justify-content:center;height:100%;color:var(--twb-muted)}.twb-root .legend{display:flex;gap:16px;padding:6px 14px;background:#f8fafc;border-top:1px solid var(--twb-border);font-size:12px;color:var(--twb-muted);flex-wrap:wrap}.twb-root .legend .sw{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-1px;border:1px solid}.twb-root .sw-ws{background:#dbeafe;border-color:#3b82f6}.twb-root .sw-ct{background:#f8fafc;border-color:#cbd5e1}.twb-root .sw-tx{background:#fff;border-color:#e2e8f0}.twb-root .meta-panel{display:flex;flex-direction:column;height:100%}.twb-root .meta-tabs{display:flex;border-bottom:1px solid var(--twb-border);background:#f8fafc}.twb-root .meta-tabs button{flex:1;border:none;border-radius:0;background:transparent;padding:10px 6px;border-bottom:2px solid transparent}.twb-root .meta-tabs button.active{border-bottom-color:var(--twb-primary);color:var(--twb-primary);font-weight:600}.twb-root .meta-body{flex:1;overflow:auto;padding:14px}.twb-root .ds-card{border:1px solid var(--twb-border);border-radius:10px;padding:12px 14px;margin-bottom:10px;cursor:pointer;background:#fff}.twb-root .ds-card.sel{border-color:var(--twb-primary);box-shadow:0 0 0 2px var(--twb-accent)}.twb-root .ds-name{font-weight:600;font-size:15px}.twb-root .ds-sub{color:var(--twb-muted);font-size:12px;margin:4px 0 8px}.twb-root .ds-stats{display:flex;gap:14px;font-size:12px;color:var(--twb-text)}.twb-root .ft-controls{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap}.twb-root .seg{display:inline-flex;border:1px solid var(--twb-border);border-radius:8px;overflow:hidden}.twb-root .seg button{border:none;border-radius:0;padding:6px 10px;font-size:12px}.twb-root .seg button.active{background:var(--twb-primary);color:#fff}.twb-root .ft-search{flex:1;min-width:120px;padding:6px 10px;border:1px solid var(--twb-border);border-radius:8px;font:inherit}.twb-root .ft-count{font-size:12px;color:var(--twb-muted)}.twb-root .ft-scroll{max-height:60vh;overflow:auto;border:1px solid var(--twb-border);border-radius:8px}.twb-root .ft-scroll table{width:100%;border-collapse:collapse;font-size:12.5px}.twb-root .ft-scroll th,.twb-root .ft-scroll td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--twb-border);white-space:nowrap}.twb-root .ft-scroll th{position:sticky;top:0;background:#f8fafc;z-index:1}.twb-root .ft-scroll td.fname{white-space:normal;word-break:break-all;max-width:200px}.twb-root .calc-row td.fname{color:var(--twb-primary-d);font-weight:500}.twb-root .role{padding:1px 7px;border-radius:999px;font-size:11px}.twb-root .role-dimension{background:#ecfdf5;color:#047857}.twb-root .role-measure{background:#fef3c7;color:#b45309}.twb-root .empty{text-align:center;color:var(--twb-muted);padding:20px}.twb-root .ds-select{margin-bottom:10px;font-size:13px}.twb-root .ds-select select{font:inherit;padding:5px 8px;border:1px solid var(--twb-border);border-radius:8px;margin-left:6px}.twb-root .calc-tab .ft-search{margin-bottom:12px;width:100%}.twb-root .calc-list{display:flex;flex-direction:column;gap:10px}.twb-root .calc-item{border:1px solid var(--twb-border);border-radius:10px;padding:10px 12px;background:#fff}.twb-root .calc-name{font-weight:600;color:var(--twb-primary-d);margin-bottom:6px;word-break:break-all}.twb-root .calc-formula{margin:0;background:#f6f8fa;color:#1f2933;border:1px solid var(--twb-border);padding:10px 12px;border-radius:8px;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-family:SFMono-Regular,Consolas,Liberation Mono,monospace}.twb-root .fname-main{font-weight:500;color:var(--twb-text)}.twb-root .calc-row td.fname .fname-main{color:var(--twb-primary-d)}.twb-root .calc-name-main{font-weight:600;color:var(--twb-primary-d)}.twb-root .calc-formula code.formula-hl{font-family:inherit;font-size:inherit;background:none;color:inherit;white-space:pre-wrap;word-break:break-word}.twb-root .fh-kw{color:#c2255c;font-weight:600}.twb-root .fh-fn{color:#0b7285}.twb-root .fh-string{color:#2b8a3e}.twb-root .fh-field{color:#b45309}.twb-root .fh-number{color:#c2410c}.twb-root .fh-comment{color:#868e96;font-style:italic}.twb-root .fh-ident{color:#1f2933}.twb-root .fh-other{color:#495057}.twb-root .sheet-list{margin:0;padding-left:18px;line-height:2}.twb-root .view-tabs{display:inline-flex;background:#f1f3f5;border-radius:9px;padding:3px;gap:2px}.twb-root .view-tabs .vt{border:none;background:transparent;padding:6px 14px;border-radius:7px;font-size:13px;font-weight:600;color:var(--twb-muted);cursor:pointer}.twb-root .view-tabs .vt.active{background:#fff;color:var(--twb-primary-d);box-shadow:0 1px 2px #00000014}.twb-root .header-actions{display:flex;align-items:center;gap:12px}.twb-root .lineage{display:grid;grid-template-columns:240px 1fr 280px;flex:1;min-height:0;height:calc(100vh - 188px)}.twb-root .lineage-picker,.twb-root .lineage-detail{background:#fff;border:1px solid var(--twb-border);overflow-y:auto;padding:12px}.twb-root .lineage-picker{border-right:none;border-radius:12px 0 0 12px}.twb-root .lineage-detail{border-left:none;border-radius:0 12px 12px 0}.twb-root .picker-head{font-weight:700;color:var(--twb-primary-d);margin-bottom:10px}.twb-root .role-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}.twb-root .role-tabs .rt{flex:1 1 auto;border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 4px;font-size:12px;cursor:pointer;color:var(--twb-text)}.twb-root .role-tabs .rt.active{background:var(--twb-primary);color:#fff;border-color:var(--twb-primary)}.twb-root .picker-list{display:flex;flex-direction:column;gap:5px;margin-top:8px}.twb-root .picker-item{text-align:left;border:1px solid transparent;background:#f8f9fa;border-radius:7px;padding:6px 8px;font-size:12.5px;cursor:pointer;color:var(--twb-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.twb-root .picker-item:hover{background:#eef2ff}.twb-root .picker-item.active{border-color:var(--twb-primary);background:#e7f5ff;font-weight:600}.twb-root .picker-item.cat-calc{border-left:3px solid #7048e8}.twb-root .picker-item.cat-dimension{border-left:3px solid #f08c00}.twb-root .picker-item.cat-measure{border-left:3px solid #2f9e44}.twb-root .picker-item.cat-datasource{border-left:3px solid #1971c2}.twb-root .lineage-canvas{display:flex;flex-direction:column;min-width:0;background:#fbfcfe;border:1px solid var(--twb-border)}.twb-root .lineage-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px;border-bottom:1px solid var(--twb-border);background:#fff;flex-wrap:wrap}.twb-root .legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--twb-muted)}.twb-root .legend .lg{display:inline-flex;align-items:center;gap:5px}.twb-root .legend .lg i{width:12px;height:12px;border-radius:3px;border:1.5px solid;display:inline-block}.twb-root .legend .lg-note{color:#868e96;font-style:italic}.twb-root .toolbar-actions button{border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 10px;font-size:12px;cursor:pointer;color:var(--twb-text)}.twb-root .toolbar-actions button:hover{background:#f1f3f5}.twb-root .lineage-svg{flex:1;width:100%;min-height:0;background:radial-gradient(circle,#e7ebf0 1px,transparent 1px) 0 0 / 22px 22px;cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none}.twb-root .lineage-svg:active{cursor:grabbing}.twb-root .ln-edge{fill:none;stroke:#ced4da;stroke-width:1.2}.twb-root .ln-edge-hl{stroke:#1971c2;stroke-width:2}.twb-root .ln-edge-dim{stroke:#e9ecef;stroke-width:1}.twb-root .ln-node .ln-rect{stroke-width:1.5;transition:opacity .15s}.twb-root .ln-label{font-size:12px;fill:#1f2933;font-family:-apple-system,Segoe UI,PingFang SC,sans-serif;pointer-events:none}.twb-root .ln-tag{font-size:9.5px;fill:#868e96;pointer-events:none}.twb-root .ln-node.ln-self .ln-rect{stroke-width:3;filter:drop-shadow(0 0 4px rgba(25,113,194,.5))}.twb-root .ln-node.ln-up .ln-rect{stroke:#1971c2;stroke-width:2.4}.twb-root .ln-node.ln-down .ln-rect{stroke:#2f9e44;stroke-width:2.4}.twb-root .ln-node.ln-dim{opacity:.22}.twb-root .ln-node.ln-dim .ln-label,.twb-root .ln-node.ln-dim .ln-tag{opacity:.5}.twb-root .ln-node.ln-search .ln-rect{stroke:#f08c00;stroke-width:2.8;filter:drop-shadow(0 0 5px rgba(240,140,0,.55))}.twb-root .ln-lane-line{stroke:#e9ecef;stroke-width:1;stroke-dasharray:4 5}.twb-root .ln-lane-label{fill:#adb5bd;font-size:11px;font-weight:600;font-family:-apple-system,Segoe UI,PingFang SC,sans-serif;pointer-events:none}.twb-root .detail-empty{color:var(--twb-muted);font-size:13px;line-height:1.7}.twb-root .detail-head{font-size:16px;font-weight:700;color:var(--twb-primary-d);word-break:break-all;margin-bottom:8px}.twb-root .detail-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}.twb-root .pill{font-size:11px;padding:2px 8px;border-radius:999px;background:#f1f3f5;color:#495057;border:1px solid var(--twb-border)}.twb-root .pill.cat-calc{background:#f3e8ff;color:#6741d9;border-color:#d0bfff}.twb-root .pill.cat-dimension{background:#fff4e6;color:#e8590c;border-color:#ffd8a8}.twb-root .pill.cat-measure{background:#ebfbee;color:#2b8a3e;border-color:#b2f2bb}.twb-root .pill.cat-datasource{background:#e7f5ff;color:#1971c2;border-color:#a5d8ff}.twb-root .detail-internal{font-size:11px;color:#868e96;word-break:break-all;margin-bottom:10px;font-family:SFMono-Regular,Consolas,monospace}.twb-root .detail-formula{margin-bottom:12px}.twb-root .df-title,.twb-root .dl-title{font-size:12px;font-weight:700;color:var(--twb-muted);margin-bottom:6px}.twb-root .dl-title.ln-up{color:#1971c2}.twb-root .dl-title.ln-down{color:#2f9e44}.twb-root .detail-counts{display:flex;gap:10px;margin-bottom:12px}.twb-root .detail-counts .dc{flex:1;border:1px solid var(--twb-border);border-radius:10px;padding:8px;text-align:center}.twb-root .detail-counts .dc.up{background:#e7f5ff}.twb-root .detail-counts .dc.down{background:#ebfbee}.twb-root .dc-num{display:block;font-size:20px;font-weight:700}.twb-root .dc.up .dc-num{color:#1971c2}.twb-root .dc.down .dc-num{color:#2f9e44}.twb-root .dc-lbl{font-size:11px;color:var(--twb-muted)}.twb-root .detail-list{margin-bottom:12px}.twb-root .dl-item{display:block;width:100%;text-align:left;border:1px solid var(--twb-border);background:#fff;border-radius:7px;padding:5px 8px;font-size:12px;cursor:pointer;color:var(--twb-text);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.twb-root .dl-item:hover{background:#f1f3f5}
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
`;var G=require("react");function W(e,t){return e&&[...e.children].find(o=>(o.localName||o.tagName)===t)||null}function V(e,t){return e?[...e.children].filter(o=>(o.localName||o.tagName)===t):[]}function E(e,t){return e?e.getAttribute(t):null}function te(e){return e?String(e).replace(/^\[/,"").replace(/\]$/,""):""}function zt(e){let t=W(e,"formatted-text");if(!t)return"";let o=[...t.getElementsByTagName("run")];return o.length?o.map(n=>n.textContent).join(""):t.textContent||""}function Oe(e,t,o){return[...e.children||[]].filter(n=>(n.localName||n.tagName)==="zone").map(n=>Wt(n,t,o))}function Wt(e,t,o){let n=parseFloat(e.getAttribute("x")||"0"),r=parseFloat(e.getAttribute("y")||"0"),i=parseFloat(e.getAttribute("w")||"0"),l=parseFloat(e.getAttribute("h")||"0"),b=n/1e5*t.w,h=r/1e5*t.h,a=i/1e5*t.w,f=l/1e5*t.h,m=e.getAttribute("is-fixed")==="true",s=parseFloat(e.getAttribute("fixed-size")||"0");if(m&&s){let N=W(e,"layout-cache"),T=N?N.getAttribute("type-w"):null,p=N?N.getAttribute("type-h"):null;T==="fixed"&&(a=s),p==="fixed"&&(f=s),N||(f=s)}let k=e.getAttribute("type-v2")||"",M=e.getAttribute("name")||"",g=k==="text"?zt(e):"",d="container";k==="text"?d="text":M&&o.includes(M)&&(d="worksheet");let u=_t(k,d),v=Ot(e),L=W(e,"zones"),A=L?[...L.children].filter(N=>(N.localName||N.tagName)==="zone"):[...e.children].filter(N=>(N.localName||N.tagName)==="zone");return{x:Math.round(b*10)/10,y:Math.round(h*10)/10,w:Math.round(a*10)/10,h:Math.round(f*10)/10,type:k,name:M,text:g,kind:d,shape:u,format:v,children:A.length?Oe({children:A},t,o):[]}}var It=new Set(["filter","color","title","paramctrl","legend","highlight","page","dashboard-title","size","shape","text-object"]);function _t(e,t){return t==="worksheet"?"worksheet":e==="text"?"text":e==="empty"?"empty":e==="image"||e==="bitmap"?"image":e==="layout-flow"?"flow":e==="layout-vertical"?"vertical":e==="layout-horizontal"?"horizontal":e==="layout-basic"?"basic":It.has(e)?"card":"other"}function Ot(e){let t={},o=W(e,"zone-style"),r=(o?[e,o]:[e]).flatMap(l=>[...l.children].filter(b=>(b.localName||b.tagName)==="format"));for(let l of r){let b=l.getAttribute("attr"),h=l.getAttribute("value");b&&h!==null&&(t[b]=h)}let i=l=>{let b=t[l];if(b===void 0)return null;let h=parseFloat(b);return Number.isFinite(h)?h:null};return{padding:i("padding"),margin:i("margin"),background:t["background-color"]??null,borderColor:t["border-color"]??null,borderWidth:i("border-width"),borderStyle:t["border-style"]??null}}function _e(e){return(e==="column"||e.endsWith("column"))&&e!=="column-instance"}function $e(e){let t=new DOMParser().parseFromString(e,"application/xml"),o=t.querySelector("parsererror");if(o)throw new Error("XML \u89E3\u6790\u5931\u8D25\uFF1A"+o.textContent);let n=t.documentElement;if(!n||(n.localName||n.tagName)!=="workbook")throw new Error("\u8FD9\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684 Tableau \u5DE5\u4F5C\u7C3F (.twb) \u6587\u4EF6");let r=W(n,"worksheets"),i=r?V(r,"worksheet").map(a=>E(a,"name")).filter(a=>typeof a=="string"):[],l=[];for(let a of V(W(n,"dashboards"),"dashboard")){let f=E(a,"name")||"(\u672A\u547D\u540D\u4EEA\u8868\u677F)",m=W(a,"size"),s=0,k=0;m&&(s=parseInt(E(m,"minwidth")||E(m,"maxwidth")||"0",10),k=parseInt(E(m,"minheight")||E(m,"maxheight")||"0",10));let M=W(a,"zones"),g=M?Oe(M,{w:s||1e5,h:k||1e5},i):[];l.push({name:f,width:s,height:k,zones:g})}let b={};for(let a of V(W(n,"datasources"),"datasource"))for(let f of[...a.children].filter(m=>_e(m.localName||m.tagName))){let m=E(f,"name"),s=E(f,"caption");m&&s&&(b[te(m)]=s)}let h=[];for(let a of V(W(n,"datasources"),"datasource")){let f=E(a,"caption")||E(a,"name")||"(\u672A\u547D\u540D\u6570\u636E\u6E90)",m=E(a,"name"),s=W(a,"connection"),k=s?{class:E(s,"class"),type:E(s,"type"),server:E(s,"server"),dbname:E(s,"dbname"),filename:E(s,"filename")}:null,M=[...a.children].filter(u=>_e(u.localName||u.tagName)).map(u=>{let v=E(u,"name");if(!v)return null;let L=W(u,"calculation"),A=E(u,"param-domain-type"),N=A!==null,T=N?null:L?E(L,"formula"):null,p=T;T&&(p=T.replace(/\[([^\]]+)\]/g,(U,_)=>{let q=te(_);return b[q]?"["+b[q]+"]":U}));let C=E(u,"caption"),P=W(u,"range");return{name:v,caption:C||null,label:C||v,datatype:E(u,"datatype"),role:E(u,"role"),type:E(u,"type"),formula:p,formulaRaw:T,isParameter:N,parameter:N?{value:E(u,"value"),defaultFormat:E(u,"default-format"),domainType:A,range:P?{min:E(P,"min"),max:E(P,"max"),granularity:E(P,"granularity")}:null}:null}}).filter(u=>u!==null),g=V(a,"group").map(u=>E(u,"name")).filter(u=>typeof u=="string"),d=Ut(a);h.push({caption:f,name:m,connection:k,columns:M,groups:g,dataModel:d})}return{dashboards:l,worksheets:i,datasources:h}}function $t(e){let t=[],o=(r,i)=>{for(let l of[...r.children])(l.localName||l.tagName)==="relation"?(i||t.push(l),o(l,!0)):i||o(l,!1)},n=W(e,"connection");return n&&o(n,!1),t}function qt(e){let t=E(e,"type"),o=E(e,"name")||"(unnamed)";return t==="text"?{name:o,table:null,kind:"custom-sql",sql:(e.textContent||"").trim()||null,objectId:null}:{name:o,table:E(e,"table"),kind:"table",sql:null,objectId:null}}function Gt(e){let t=W(e,"clause");if(!t)return{leftExpr:null,rightExpr:null,cardinality:null};let o=E(t,"cardinality"),n=W(t,"expression"),r=n?V(n,"expression"):[];return{leftExpr:r[0]?E(r[0],"op"):null,rightExpr:r[1]?E(r[1],"op"):E(n,"op"),cardinality:o}}function qe(e){for(let t of[...e.children]){if((t.localName||t.tagName)==="relation")return t;let o=qe(t);if(o)return o}return null}function jt(e){let t=W(e,"object-graph");if(!t)return null;let o=new Map,n=[],r=new Map;for(let l of V(W(t,"objects"),"object")){let b=E(l,"id"),h=qe(l),a=h?E(h,"name"):null,f=E(l,"caption")||a||"(object)",s=(h?E(h,"type"):null)==="text"?{name:f,table:null,kind:"custom-sql",sql:h&&(h.textContent||"").trim()||null,objectId:b}:{name:f,table:h?E(h,"table"):null,kind:"table",sql:null,objectId:b};o.set("obj:"+(b||f),s),b&&r.set(b,s),s.kind==="custom-sql"&&s.sql&&n.push({name:s.name,sql:s.sql})}if(o.size===0)return null;let i=[];for(let l of V(W(t,"relationships"),"relationship")){let b=W(l,"expression"),h=b?V(b,"expression"):[],a=W(l,"first-end-point"),f=W(l,"second-end-point"),m=r.get(E(a,"object-id")||""),s=r.get(E(f,"object-id")||"");!m||!s||i.push({left:m,right:s,joinType:"relationship",leftExpr:h[0]?E(h[0],"op"):null,rightExpr:h[1]?E(h[1],"op"):null,cardinality:E(l,"cardinality")||null})}return{tables:[...o.values()],joins:i,customSql:n}}function Ut(e){let t=jt(e);if(t)return t;let o=[],n=new Map,r=[],i=a=>`${a.kind}:${a.name}:${a.table??""}`,l=a=>{let f=i(a);return n.has(f)||n.set(f,a),a.kind==="custom-sql"&&a.sql&&!r.some(m=>m.name===a.name&&m.sql===a.sql)&&r.push({name:a.name,sql:a.sql}),n.get(f)},b=a=>{if(!a)return null;let f=/^\[([^\]]+)\]/.exec(a.trim());if(!f)return null;let m=f[1];for(let s of n.values())if(s.name===m||s.table&&s.table.replace(/[\[\]]/g,"")===m.replace(/[\[\]]/g,""))return s;return null},h=a=>{let f=E(a,"type")||"table";if(f==="collection"||f==="union"){let u=null;for(let v of V(a,"relation")){let L=h(v);u||(u=L)}return u??l({name:E(a,"name")||"(collection)",table:null,kind:"table",sql:null,objectId:null})}if(f!=="join")return l(qt(a));let m=V(a,"relation"),s=m[0]?h(m[0]):null,k=m[1]?h(m[1]):null;for(let u of m.slice(2))h(u);let{leftExpr:M,rightExpr:g,cardinality:d}=Gt(a);if(s&&k){let u=b(M)??s,v=b(g)??k;o.push({left:u,right:v,joinType:E(a,"join")||"inner",leftExpr:M,rightExpr:g,cardinality:d})}return s??k??l({name:"(join)",table:null,kind:"table",sql:null,objectId:null})};for(let a of $t(e))h(a);return{tables:[...n.values()],joins:o,customSql:r}}var Ge="dsh-tableau-twb-viewer.state.v1",se=null,fe="/twb-viewer/sample.twb";function Ht(e){if(e===null||typeof e!="object")return!1;let t=e;return!Array.isArray(t.dashboards)||!Array.isArray(t.worksheets)||!Array.isArray(t.datasources)?!1:t.datasources.every(o=>typeof o=="object"&&o!==null&&Array.isArray(o.columns))}function je(){if(se)return se;try{let e=sessionStorage.getItem(Ge);if(!e)return null;let t=JSON.parse(e);if(!t||typeof t!="object"||!("model"in t)||!Ht(t.model??null)||t.view!=="layout"&&t.view!=="lineage"&&t.view!=="data"||!Number.isInteger(t.dashIdx)||t.dashIdx<0)return null;se=t}catch{}return se}function Ue(e){se=e;try{sessionStorage.setItem(Ge,JSON.stringify(e))}catch{}}function He(e){return{dashboards:e.dashboards.length,worksheets:e.worksheets.length,datasources:e.datasources.length,fields:e.datasources.reduce((t,o)=>t+o.columns.length,0),calculations:e.datasources.reduce((t,o)=>t+o.columns.filter(n=>n.formula).length,0)}}function Be(e,t=10){if(!e)return[""];let o=[];for(let i=0;i<e.length;i+=t)o.push(e.slice(i,i+t));if(o.length<=3)return o;let n=o.slice(0,2).join(""),r=o.slice(2).join("").slice(0,t-1)+"\u2026";return[n.slice(0,t),n.slice(t,t*2),r]}var be=require("react"),le="twb-viewer",ie={panel:"TWb \u68C0\u89C6\u5668",appTitle:"Tableau .twb \u4EEA\u8868\u677F\u5E03\u5C40\u68C0\u89C6\u5668",appSubtitle:"1:1 SVG \u5E03\u5C40\u56FE \xB7 \u4E00\u952E\u5BFC\u51FA Excalidraw \xB7 \u6570\u636E\u6E90/\u5B57\u6BB5/\u8BA1\u7B97\u5B57\u6BB5 metadata \xB7 \u5B57\u6BB5\u5F15\u7528\u5173\u7CFB",tabLayout:"\u5E03\u5C40\u56FE",tabLineage:"\u5F15\u7528\u5173\u7CFB",fullscreen:"\u26F6 \u5168\u5C4F",fullscreenTooltip:"\u5168\u5C4F\u6A21\u5F0F\uFF0C\u94FA\u6EE1\u7A97\u53E3\u67E5\u770B\u5173\u7CFB\u56FE",exitFullscreen:"\u2715 \u9000\u51FA\u5168\u5C4F",exitFullscreenEsc:"\u9000\u51FA\u5168\u5C4F (Esc)",welcomeTitle:"\u4E0A\u4F20\u4E00\u4E2A Tableau \u5DE5\u4F5C\u7C3F\uFF08.twb\uFF09\u6587\u4EF6\uFF0C\u5373\u53EF\uFF1A",help1a:"\u6309 ",help1b:" \u7528 SVG \u7ED8\u5236\u4EEA\u8868\u677F\u5E03\u5C40\uFF0C\u652F\u6301\u7F29\u653E / \u5E73\u79FB\uFF1B",help2a:"\u4E00\u952E\u5BFC\u51FA ",help2b:"\uFF0C\u65B9\u4FBF\u5728 Excalidraw \u91CC\u624B\u7ED8\u6279\u6CE8\uFF1B",help3a:"\u67E5\u770B ",help3b:" \u7B49 metadata\uFF0C\u4FBF\u4E8E\u5BF9\u5BA2\u6237\u8BB2\u89E3\u53E3\u5F84\u3002",helpAuto:"\u6253\u5F00\u65F6\u4F1A\u81EA\u52A8\u8F7D\u5165\u5185\u7F6E\u793A\u4F8B\uFF1B\u4E0A\u4F20\u81EA\u5DF1\u7684 .twb \u4F1A\u66FF\u6362\u793A\u4F8B\u3002",helpSecurity:"\u51FA\u4E8E\u6570\u636E\u5B89\u5168\u8003\u8651\uFF0C\u4E0D\u89E3\u6790 .twbx\uFF08\u6253\u5305\u5DE5\u4F5C\u7C3F\u53EF\u80FD\u5185\u5D4C\u6570\u636E\u63D0\u53D6\uFF09\u3002",statDashboards:"\u4EEA\u8868\u677F",statWorksheets:"\u5DE5\u4F5C\u8868",statDatasources:"\u6570\u636E\u6E90",statFields:"\u5B57\u6BB5",statCalcs:"\u8BA1\u7B97\u5B57\u6BB5",chooseFile:"\u8BF7\u9009\u62E9 .twb \u6587\u4EF6",chooseFileBtn:"\u9009\u62E9 .twb \u6587\u4EF6",loadSample:"\u8F7D\u5165\u793A\u4F8B",loading:"\u52A0\u8F7D\u4E2D\u2026",sampleLoading:"\u6B63\u5728\u52A0\u8F7D\u5185\u7F6E\u793A\u4F8B\u2026",sampleFileName:"sample.twb\uFF08\u5185\u7F6E\u793A\u4F8B\uFF09",fileReadFailed:"\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25",parseFailed:"\u89E3\u6790\u5931\u8D25",sampleAutoLoadFailed:"\u81EA\u52A8\u52A0\u8F7D\u5185\u7F6E\u793A\u4F8B\u5931\u8D25\uFF1A",orChooseManually:"\uFF0C\u53EF\u624B\u52A8\u9009\u62E9 .twb \u6587\u4EF6",sampleLoadFailed:"\u8F7D\u5165\u793A\u4F8B\u5931\u8D25\uFF1A",twbxRejected:"\u51FA\u4E8E\u6570\u636E\u5B89\u5168\u8003\u8651\uFF0C\u672C\u63D2\u4EF6\u4E0D\u89E3\u6790 .twbx\uFF08\u6253\u5305\u5DE5\u4F5C\u7C3F\u53EF\u80FD\u5185\u5D4C\u6570\u636E\u63D0\u53D6\uFF09\u3002\u8BF7\u5728 Tableau \u4E2D\u300C\u53E6\u5B58\u4E3A\u300D.twb \u540E\u518D\u5BFC\u5165\u3002",zoomIn:"\u653E\u5927 +",zoomOut:"\u7F29\u5C0F \u2212",fit:"\u9002\u914D",exportSvg:"\u5BFC\u51FA SVG",exportPng:"\u5BFC\u51FA PNG",exportExcalidraw:"\u5BFC\u51FA Excalidraw",colName:"\u5B57\u6BB5\u540D",colRole:"\u89D2\u8272",colDatatype:"\u6570\u636E\u7C7B\u578B",colType:"\u7C7B\u578B",colCalc:"\u8BA1\u7B97\u5B57\u6BB5",yes:"\u662F",noMatch:"\u65E0\u5339\u914D\u5B57\u6BB5",roleDimension:"\u7EF4\u5EA6",roleMeasure:"\u5EA6\u91CF",tabOverview:"\u6570\u636E\u6E90\u603B\u89C8",tabFields:"\u5B57\u6BB5",tabWorksheets:"\u5DE5\u4F5C\u8868",tabCalcs:"\u8BA1\u7B97\u5B57\u6BB5",fieldCount:"\u5B57\u6BB5 {count}",calcCount:"\u8BA1\u7B97\u5B57\u6BB5 {count}",groupCount:"\u7EC4 {count}",datasourceLabel:"\u6570\u636E\u6E90\uFF1A",noConnection:"\uFF08\u65E0\u8FDE\u63A5\u4FE1\u606F\uFF09",searchFields:"\u641C\u7D22\u5B57\u6BB5\u540D\u2026",searchCalcs:"\u641C\u7D22\u8BA1\u7B97\u5B57\u6BB5\u540D\u6216\u516C\u5F0F\u2026",tabDataModel:"\u6570\u636E\u6A21\u578B",tabCustomSql:"\u81EA\u5B9A\u4E49 SQL",dmTables:"{count} \u5F20\u8868",dmJoins:"{count} \u4E2A\u8FDE\u63A5",dmCustomSql:"{count} \u6BB5\u81EA\u5B9A\u4E49 SQL",dmSelectHint:"\u70B9\u51FB\u8868\u6216\u8FDE\u63A5\u7EBF\u67E5\u770B\u8BE6\u60C5",dmSqlList:"\u81EA\u5B9A\u4E49 SQL",dmConnection:"\u8FDE\u63A5",dmEmpty:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u53EF\u5C55\u793A\u7684\u6570\u636E\u6A21\u578B\u3002",dmKind:"\u7C7B\u578B",dmDatasource:"\u6570\u636E\u6E90",dmPhysical:"\u7269\u7406\u8868",dmSqlText:"\u81EA\u5B9A\u4E49 SQL",dmSqlBadge:"\u81EA\u5B9A\u4E49 SQL",dmTableBadge:"\u8868",dmFrom:"\u5DE6\u8868",dmTo:"\u53F3\u8868",dmOn:"\u8FDE\u63A5\u6761\u4EF6",dmCardinality:"\u57FA\u6570",dmNotStored:"\u6587\u4EF6\u4E2D\u672A\u8BB0\u5F55\uFF08Tableau \u8FD0\u884C\u65F6\u63A8\u65AD\uFF09",joinInner:"\u5185\u8FDE\u63A5",joinLeft:"\u5DE6\u8FDE\u63A5",joinRight:"\u53F3\u8FDE\u63A5",joinFull:"\u5168\u8FDE\u63A5",joinRelationship:"\u5173\u7CFB",overviewTables:"{count} \u8868",overviewJoins:"{count} \u8FDE\u63A5",overviewSql:"{count} SQL",sqlEmpty:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u81EA\u5B9A\u4E49 SQL\u3002",sqlNote:"\u4EA4\u4ED8\u6838\u5BF9\u65F6\u53EF\u76F4\u63A5\u5BF9\u7740\u8FD9\u6BB5 SQL \u786E\u8BA4\u53D6\u6570\u53E3\u5F84\u3002",sqlCopy:"\u590D\u5236",tabParameters:"\u53C2\u6570",paramValue:"\u5F53\u524D\u503C",paramDomain:"\u53D6\u503C\u57DF",paramRange:"\u8303\u56F4",paramFormat:"\u683C\u5F0F",paramRaw:"\u539F\u59CB\u503C",paramRawHint:"\u5DE5\u4F5C\u7C3F\u91CC\u4EE5 float64 \u539F\u6837\u5199\u5165\u7684\u503C\uFF08\u5982 0.064 \u5199\u4F5C 0.064000000000000001\uFF09",paramBadge:"\u53C2\u6570",paramEmpty:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u53C2\u6570\u3002",paramNote:"\u53C2\u6570\u4E0D\u662F\u8BA1\u7B97\u5B57\u6BB5\uFF1A\u8FD9\u91CC\u7684\u663E\u793A\u503C\u6309\u5DE5\u4F5C\u7C3F\u81EA\u5E26\u7684\u6570\u5B57\u683C\u5F0F\uFF08\u5982 p0.00%\uFF09\u683C\u5F0F\u5316\uFF0C\u539F\u59CB\u503C\u4FDD\u7559\u5728\u53F3\u4FA7\u4FBF\u4E8E\u6838\u5BF9\u3002",overviewParams:"{count} \u53C2\u6570",sqlCopied:"\u5DF2\u590D\u5236",wbDashboards:"\u4EEA\u8868\u677F",wbWorksheets:"\u5DE5\u4F5C\u8868",wbSheetsInDash:"{count} \u4E2A\u5DE5\u4F5C\u8868",wbUsedIn:"\u7528\u4E8E {count} \u4E2A\u4EEA\u8868\u677F",wbUnused:"\u672A\u653E\u5165\u4EFB\u4F55\u4EEA\u8868\u677F",wbNoDashboards:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u4EEA\u8868\u677F\u3002",wbNoWorksheets:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u5DE5\u4F5C\u8868\u3002",legendParameter:"\u53C2\u6570",zoneLegendTitle:"\u56FE\u4F8B",zoneWorksheet:"\u5DE5\u4F5C\u8868",zoneFlow:"\u6D41\u5F0F\u5BB9\u5668",zoneBasic:"\u57FA\u7840\u5BB9\u5668",zoneCard:"\u5361\u7247\uFF08\u7B5B\u9009\u5668 / \u6807\u9898\u7B49\uFF09",zoneText:"\u6587\u672C",zoneEmpty:"\u7A7A\u767D",zonePadding:"\u5185\u8FB9\u8DDD {value}",zoneMargin:"\u5916\u8FB9\u8DDD {value}",zoneColor:"\u5E95\u8272",noDashboard:"\u8BF7\u9009\u62E9\u6216\u4E0A\u4F20\u4E00\u4E2A\u5305\u542B\u4EEA\u8868\u677F\u7684 .twb \u6587\u4EF6",noDatasources:"\u8BE5\u5DE5\u4F5C\u7C3F\u6CA1\u6709\u6570\u636E\u6E90\u3002",noFields:"\u65E0\u5B57\u6BB5\u3002",noMatchingCalcs:"\u65E0\u5339\u914D\u8BA1\u7B97\u5B57\u6BB5\u3002",worksheetCount:"\u5171 {count} \u4E2A\u5DE5\u4F5C\u8868",pickerHead:"\u5B57\u6BB5\u9009\u62E9\u5668",searchLineage:"\u641C\u7D22\u5B57\u6BB5\u5E76\u9AD8\u4EAE\u2026",noMatchPeriod:"\u65E0\u5339\u914D\u5B57\u6BB5\u3002",arrowNote:"\u7BAD\u5934\u65B9\u5411\uFF1A\u4E0A\u6E38\uFF08\u5DE6\uFF09\u2192 \u4E0B\u6E38\uFF08\u53F3\uFF09",focus:"\u805A\u7126",focusAuto:"\u81EA\u52A8",focusAll:"\u5168\u90E8",focusTooltip:"\u5927\u56FE\u805A\u7126\uFF1A\u53EA\u6E32\u67D3\u9009\u4E2D\u8282\u70B9 \xB1N \u8DF3\u7684\u8840\u7F18",nodesCount:"{shown} / {total} \u8282\u70B9",fitWindow:"\u9002\u914D\u7A97\u53E3",clearHighlight:"\u6E05\u9664\u9AD8\u4EAE",subCols:"\uFF08{count} \u5217\uFF09",detailEmpty:"\u9009\u62E9\u4E00\u4E2A\u5B57\u6BB5 / \u6570\u636E\u6E90\uFF0C\u67E5\u770B\u5176\u4E0A\u4E0B\u6E38\u5F15\u7528\u5173\u7CFB\u3002",internalName:"\u5185\u90E8\u540D\uFF1A{name}",calcFormula:"\u8BA1\u7B97\u5B57\u6BB5\u516C\u5F0F",upstreamLabel:"\u4E0A\u6E38\uFF08\u8F93\u5165\uFF09",downstreamLabel:"\u4E0B\u6E38\uFF08\u4F9D\u8D56\uFF09",upstreamTitle:"\u4E0A\u6E38\u8F93\u5165",downstreamTitle:"\u4E0B\u6E38\u4F9D\u8D56",kindField:"\u5B57\u6BB5",legendDatasource:"\u6570\u636E\u6E90",legendDimension:"\u7EF4\u5EA6",legendMeasure:"\u5EA6\u91CF",legendCalc:"\u8BA1\u7B97\u5B57\u6BB5",legendUnknown:"\u672A\u89E3\u6790",laneDatasource:"\u6570\u636E\u6E90",laneRawFields:"\u539F\u59CB\u5B57\u6BB5\uFF08\u7EF4\u5EA6\u2191 / \u5EA6\u91CF\u2193\uFF09",laneCalcLayer:"\u8BA1\u7B97\u5B57\u6BB5 \xB7 \u5C42\u7EA7 {level}"},Me={panel:"TWb Viewer",appTitle:"Tableau .twb Dashboard Inspector",appSubtitle:"1:1 SVG layout \xB7 one-click Excalidraw export \xB7 datasource / field / calculation metadata \xB7 field lineage",tabLayout:"Layout",tabLineage:"Lineage",fullscreen:"\u26F6 Full screen",fullscreenTooltip:"Full screen \u2014 use the whole window for the graph",exitFullscreen:"\u2715 Exit full screen",exitFullscreenEsc:"Exit full screen (Esc)",welcomeTitle:"Upload a Tableau workbook (.twb) file to:",help1a:"Draw the dashboard layout ",help1b:" in SVG at 1:1 real scale, with zoom and pan;",help2a:"Export ",help2b:" in one click and annotate it by hand in Excalidraw;",help3a:"Read ",help3b:" metadata to explain definitions to clients.",helpAuto:"A built-in sample loads automatically; upload your own .twb to replace it.",helpSecurity:"For data safety, .twbx files are not parsed (packaged workbooks may embed data extracts).",statDashboards:"dashboards",statWorksheets:"worksheets",statDatasources:"datasources",statFields:"fields",statCalcs:"calculations",chooseFile:"Choose a .twb file",chooseFileBtn:"Choose .twb file",loadSample:"Load sample",loading:"Loading\u2026",sampleLoading:"Loading the built-in sample\u2026",sampleFileName:"sample.twb (built-in sample)",fileReadFailed:"Failed to read the file",parseFailed:"Failed to parse the workbook",sampleAutoLoadFailed:"Failed to auto-load the built-in sample: ",orChooseManually:". You can pick a .twb file manually.",sampleLoadFailed:"Failed to load the sample: ",twbxRejected:"For data safety this plugin does not parse .twbx (packaged workbooks may embed data extracts). In Tableau use \u201CSave As\u201D \u2192 .twb, then import that file.",zoomIn:"Zoom in +",zoomOut:"Zoom out \u2212",fit:"Fit",exportSvg:"Export SVG",exportPng:"Export PNG",exportExcalidraw:"Export Excalidraw",colName:"Field",colRole:"Role",colDatatype:"Data type",colType:"Type",colCalc:"Calculation",yes:"Yes",noMatch:"No matching fields",roleDimension:"Dimension",roleMeasure:"Measure",tabOverview:"Datasources",tabFields:"Fields",tabWorksheets:"Worksheets",tabCalcs:"Calculations",fieldCount:"{count} fields",calcCount:"{count} calculations",groupCount:"{count} groups",datasourceLabel:"Datasource: ",noConnection:"(no connection info)",searchFields:"Search field names\u2026",searchCalcs:"Search calculations or formulas\u2026",tabDataModel:"Data model",tabCustomSql:"Custom SQL",dmTables:"{count} tables",dmJoins:"{count} joins",dmCustomSql:"{count} custom SQL",dmSelectHint:"Click a table or join for details",dmSqlList:"Custom SQL",dmConnection:"Connection",dmEmpty:"No data model to show in this workbook.",dmKind:"Type",dmDatasource:"Datasource",dmPhysical:"Physical table",dmSqlText:"Custom SQL",dmSqlBadge:"Custom SQL",dmTableBadge:"Table",dmFrom:"Left table",dmTo:"Right table",dmOn:"Join condition",dmCardinality:"Cardinality",dmNotStored:"Not stored in the file (inferred by Tableau at runtime)",joinInner:"Inner join",joinLeft:"Left join",joinRight:"Right join",joinFull:"Full join",joinRelationship:"Relationship",overviewTables:"{count} tables",overviewJoins:"{count} joins",overviewSql:"{count} SQL",sqlEmpty:"This workbook has no custom SQL.",sqlNote:"Use this SQL to confirm the query logic with your client.",sqlCopy:"Copy",tabParameters:"Parameters",paramValue:"Current value",paramDomain:"Domain",paramRange:"Range",paramFormat:"Format",paramRaw:"Raw",paramRawHint:"Value stored verbatim as float64 in the workbook (0.064 is written as 0.064000000000000001)",paramBadge:"param",paramEmpty:"This workbook has no parameters.",paramNote:"Parameters are not calculations: the value shown is formatted with the workbook's own number format (e.g. p0.00%); the raw value stays visible for verification.",overviewParams:"{count} params",sqlCopied:"Copied",wbDashboards:"Dashboards",wbWorksheets:"Worksheets",wbSheetsInDash:"{count} worksheets",wbUsedIn:"in {count} dashboards",wbUnused:"Not placed on any dashboard",wbNoDashboards:"No dashboards in this workbook.",wbNoWorksheets:"No worksheets in this workbook.",legendParameter:"Parameter",zoneLegendTitle:"Legend",zoneWorksheet:"Worksheet",zoneFlow:"Flow container",zoneBasic:"Basic container",zoneCard:"Card (filter, title\u2026)",zoneText:"Text",zoneEmpty:"Empty",zonePadding:"Padding {value}",zoneMargin:"Margin {value}",zoneColor:"Fill",noDashboard:"Choose or upload a .twb file that contains a dashboard",noDatasources:"This workbook has no datasources.",noFields:"No fields.",noMatchingCalcs:"No matching calculations.",worksheetCount:"{count} worksheets",pickerHead:"Field picker",searchLineage:"Search and highlight fields\u2026",noMatchPeriod:"No matching fields.",arrowNote:"Arrows point upstream (left) \u2192 downstream (right)",focus:"Focus",focusAuto:"Auto",focusAll:"All",focusTooltip:"Large graphs: render only the selected node's lineage within N hops",nodesCount:"{shown} / {total} nodes",fitWindow:"Fit window",clearHighlight:"Clear highlight",subCols:" ({count} cols)",detailEmpty:"Select a field or datasource to see its upstream and downstream references.",internalName:"Internal name: {name}",calcFormula:"Calculation formula",upstreamLabel:"Upstream (inputs)",downstreamLabel:"Downstream (dependents)",upstreamTitle:"Upstream inputs",downstreamTitle:"Downstream dependents",kindField:"Field",legendDatasource:"Datasource",legendDimension:"Dimension",legendMeasure:"Measure",legendCalc:"Calculation",legendUnknown:"Unresolved",laneDatasource:"Datasource",laneRawFields:"Raw fields (dimensions \u2191 / measures \u2193)",laneCalcLayer:"Calculations \xB7 layer {level}"},Bt={zh:ie,en:Me};function Vt(e,t){return t?e.replace(/\{(\w+)\}/g,(o,n)=>n in t?String(t[n]):o):e}function De(e="zh"){let t=Bt[e]??ie;return(o,n)=>Vt(t[o]??ie[o]??o,n)}var Ve=(0,be.createContext)(null),Ze=Ve.Provider;function H(){return(0,be.useContext)(Ve)??De("zh")}var ge=require("react");var oe=require("react/jsx-runtime");function Ye({onText:e,onError:t,busy:o}){let n=H(),r=(0,ge.useRef)(null),[i,l]=(0,ge.useState)(!1),b=a=>{if(!a)return;if(/\.twbx$/i.test(a.name)){t&&t(n("twbxRejected"));return}if(!/\.twb$/i.test(a.name)){t&&t(n("chooseFile"));return}let f=new FileReader;f.onload=()=>{e&&e(String(f.result??""),a.name)},f.onerror=()=>{t&&t(n("fileReadFailed"))},f.readAsText(a)},h=async()=>{try{let a=await fetch(fe);if(!a.ok)throw new Error("HTTP "+a.status);let f=await a.text();e&&e(f,n("sampleFileName"))}catch(a){t&&t(n("sampleLoadFailed")+a.message)}};return(0,oe.jsxs)("div",{className:`uploader ${i?"drag":""}`,onDragOver:a=>{a.preventDefault(),l(!0)},onDragLeave:()=>l(!1),onDrop:a=>{a.preventDefault(),l(!1),b(a.dataTransfer.files[0])},children:[(0,oe.jsx)("input",{ref:r,type:"file",accept:".twb",style:{display:"none"},onChange:a=>b(a.target.files?.[0])}),(0,oe.jsx)("button",{className:"primary",onClick:()=>r.current?.click(),disabled:o,children:n("chooseFileBtn")}),(0,oe.jsx)("button",{onClick:h,disabled:o,children:n(o?"loading":"loadSample")})]})}var j=require("react");var we="http://www.w3.org/2000/svg";function xe(e,t,o){let n=t instanceof Blob?t:new Blob([t],{type:o}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(r),1e3)}function Ke(e){let t=[];for(let o of e)t.push(o),o.children&&o.children.length&&t.push(...Ke(o.children));return t}var he=()=>Math.floor(Math.random()*1e5);function Qe(e){let t=Ke(e),o=[],n=1;for(let r of t){let i=r.kind==="worksheet";o.push({id:`rect-${n}`,type:"rectangle",x:Math.round(r.x),y:Math.round(r.y),width:Math.max(1,Math.round(r.w)),height:Math.max(1,Math.round(r.h)),angle:0,strokeColor:i?"#1971c2":"#868e96",backgroundColor:i?"#a5d8ff":"#ffffff",fillStyle:"solid",strokeWidth:1,strokeStyle:"solid",roughness:0,opacity:100,groupIds:[],frameId:null,roundness:null,seed:he(),version:1,versionNonce:he(),isDeleted:!1,boundElements:[],updated:Date.now(),link:null,locked:!1});let l=i?r.name:r.text;l&&o.push({id:`text-${n}`,type:"text",x:Math.round(r.x+6),y:Math.round(r.y+6),width:Math.max(20,Math.round(r.w)-12),height:25,angle:0,strokeColor:"#1e1e1e",backgroundColor:"transparent",fillStyle:"solid",strokeWidth:1,strokeStyle:"solid",roughness:0,opacity:100,groupIds:[],frameId:null,roundness:null,seed:he(),version:1,versionNonce:he(),isDeleted:!1,updated:Date.now(),link:null,locked:!1,text:l,fontSize:16,fontFamily:1,textAlign:"left",verticalAlign:"top",containerId:null,originalText:l,lineHeight:1.25,baseline:18}),n++}return JSON.stringify({type:"excalidraw",version:2,source:"twb-dashboard-inspector",elements:o,appState:{gridSize:null,viewBackgroundColor:"#ffffff"},files:{}},null,2)}var S=require("react/jsx-runtime"),ne={worksheet:{fill:"#dbeafe",stroke:"#3b82f6"},text:{fill:"#ffffff",stroke:"#94a3b8"},flow:{fill:"#f1f5f9",stroke:"#cbd5e1",dash:"5 4"},vertical:{fill:"#f5f3ff",stroke:"#c4b5fd",dash:"5 4"},horizontal:{fill:"#eff6ff",stroke:"#bfdbfe",dash:"5 4"},basic:{fill:"#f8fafc",stroke:"#cbd5e1"},card:{fill:"#fef9c3",stroke:"#facc15"},image:{fill:"#ecfdf5",stroke:"#6ee7b7"},empty:{fill:"none",stroke:"#e2e8f0",dash:"3 3"},other:{fill:"#f8fafc",stroke:"#cbd5e1"}},Zt={worksheet:"zoneWorksheet",flow:"zoneFlow",basic:"zoneBasic",card:"zoneCard",text:"zoneText",empty:"zoneEmpty"};function Xe({z:e,depth:t,t:o}){let n=e.kind==="worksheet",r=e.kind==="text",i=ne[e.shape]??ne.other,l=i.dash??"",b=n?Math.max(9,Math.min(15,e.h*.16)):13,h=[e.name||e.type||o("zoneBasic"),`${Math.round(e.w)} \xD7 ${Math.round(e.h)}`,e.format.padding!==null?o("zonePadding",{value:e.format.padding}):null,e.format.margin!==null?o("zoneMargin",{value:e.format.margin}):null,e.format.background?`${o("zoneColor")} ${e.format.background}`:null].filter(Boolean).join(" \xB7 ");return(0,S.jsxs)("g",{children:[(0,S.jsx)("title",{children:h}),(0,S.jsx)("rect",{x:e.x,y:e.y,width:Math.max(1,e.w),height:Math.max(1,e.h),fill:i.fill,stroke:i.stroke,strokeWidth:1,strokeDasharray:l,rx:2}),n&&e.h>22&&(0,S.jsx)("text",{x:e.x+e.w/2,y:e.y+e.h/2,textAnchor:"middle",dominantBaseline:"middle",fontSize:b,fontWeight:"600",fill:"#1e3a8a",children:e.name}),r&&(0,S.jsx)("text",{x:e.x+6,y:e.y+Math.min(18,e.h-4),fontSize:13,fill:"#334155",children:e.text.length>60?e.text.slice(0,60)+"\u2026":e.text}),!n&&!r&&t>0&&e.type&&e.h>26&&(0,S.jsx)("text",{x:e.x+4,y:e.y+12,fontSize:9,fill:"#94a3b8",children:e.type}),e.children&&e.children.map((a,f)=>(0,S.jsx)(Xe,{z:a,depth:t+1,t:o},f))]})}function Je({dashboard:e}){let t=H(),o=(0,j.useRef)(null),n=(0,j.useRef)(null),[r,i]=(0,j.useState)(.2),[l,b]=(0,j.useState)(0),[h,a]=(0,j.useState)(0),f=(0,j.useRef)(null),m=e?.width||0,s=e?.height||0,k=(0,j.useCallback)(()=>{let p=o.current;if(!p||!m||!s)return;let C=Math.min((p.clientWidth-24)/m,(p.clientHeight-24)/s),P=Math.min(1,C);i(P),b(Math.max(8,(p.clientWidth-m*P)/2)),a(12)},[m,s]);(0,j.useEffect)(()=>{k()},[k,e]),(0,j.useEffect)(()=>{let p=o.current;if(!p)return;let C=new ResizeObserver(()=>k());return C.observe(p),()=>C.disconnect()},[k]);let M=p=>{p.preventDefault();let C=o.current;if(!C)return;let P=C.getBoundingClientRect(),U=p.clientX-P.left,_=p.clientY-P.top,q=p.deltaY<0?1.1:1/1.1,Q=Math.min(4,Math.max(.02,r*q)),ue=Q/r;b(U-(U-l)*ue),a(_-(_-h)*ue),i(Q)},g=p=>{f.current={x:p.clientX,y:p.clientY,tx:l,ty:h}},d=p=>{f.current&&(b(f.current.tx+(p.clientX-f.current.x)),a(f.current.ty+(p.clientY-f.current.y)))},u=()=>{f.current=null},v=()=>{let p=document.createElementNS(we,"svg");p.setAttribute("xmlns",we),p.setAttribute("width",String(m)),p.setAttribute("height",String(s)),p.setAttribute("viewBox",`0 0 ${m} ${s}`);let C=document.createElementNS(we,"rect");return C.setAttribute("x","0"),C.setAttribute("y","0"),C.setAttribute("width",String(m)),C.setAttribute("height",String(s)),C.setAttribute("fill","#ffffff"),p.appendChild(C),n.current&&p.appendChild(n.current.cloneNode(!0)),`<?xml version="1.0" encoding="UTF-8"?>
`+new XMLSerializer().serializeToString(p)},L=e?.name||"dashboard",A=()=>xe(`${L}.svg`,v(),"image/svg+xml"),N=()=>{let p=v(),C=new Image,P=new Blob([p],{type:"image/svg+xml;charset=utf-8"}),U=URL.createObjectURL(P);C.onload=()=>{let _=document.createElement("canvas");_.width=m*2,_.height=s*2;let q=_.getContext("2d");q&&(q.fillStyle="#fff",q.fillRect(0,0,_.width,_.height),q.drawImage(C,0,0,_.width,_.height),URL.revokeObjectURL(U),_.toBlob(Q=>{Q&&xe(`${L}.png`,Q,"image/png")},"image/png"))},C.onerror=()=>URL.revokeObjectURL(U),C.src=U},T=()=>{e&&xe(`${L}.excalidraw`,Qe(e.zones),"application/json")};return e?(0,S.jsxs)("div",{className:"canvas-wrap",children:[(0,S.jsxs)("div",{className:"canvas-toolbar",children:[(0,S.jsxs)("div",{className:"tb-left",children:[(0,S.jsx)("span",{className:"dash-title",children:e.name}),(0,S.jsxs)("span",{className:"dash-dim",children:[m," \xD7 ",s," px"]})]}),(0,S.jsxs)("div",{className:"tb-right",children:[(0,S.jsx)("button",{onClick:()=>i(p=>Math.min(4,p*1.15)),children:t("zoomIn")}),(0,S.jsx)("button",{onClick:()=>i(p=>Math.max(.02,p/1.15)),children:t("zoomOut")}),(0,S.jsx)("button",{onClick:k,children:t("fit")}),(0,S.jsxs)("span",{className:"zoom-label",children:[Math.round(r*100),"%"]}),(0,S.jsx)("span",{className:"tb-sep"}),(0,S.jsx)("button",{onClick:A,children:t("exportSvg")}),(0,S.jsx)("button",{onClick:N,children:t("exportPng")}),(0,S.jsx)("button",{className:"primary",onClick:T,children:t("exportExcalidraw")})]})]}),(0,S.jsxs)("div",{className:"zone-legend",children:[(0,S.jsx)("span",{className:"zl-title",children:t("zoneLegendTitle")}),["worksheet","flow","basic","card","text","empty"].map(p=>(0,S.jsxs)("span",{className:"zl-item",children:[(0,S.jsx)("span",{className:"zl-swatch",style:{background:ne[p].fill==="none"?"transparent":ne[p].fill,borderColor:ne[p].stroke,borderStyle:ne[p].dash?"dashed":"solid"}}),t(Zt[p])]},p))]}),(0,S.jsx)("div",{ref:o,className:"canvas-viewport",onWheel:M,onMouseDown:g,onMouseMove:d,onMouseUp:u,onMouseLeave:u,children:(0,S.jsxs)("svg",{width:m,height:s,style:{transform:`translate(${l}px, ${h}px) scale(${r})`,transformOrigin:"0 0"},children:[(0,S.jsx)("rect",{x:0,y:0,width:m,height:s,fill:"#ffffff"}),(0,S.jsx)("g",{ref:n,children:e.zones.map((p,C)=>(0,S.jsx)(Xe,{z:p,depth:0,t},C))})]})}),(0,S.jsxs)("div",{className:"legend",children:[(0,S.jsxs)("span",{children:[(0,S.jsx)("i",{className:"sw sw-ws"})," \u5DE5\u4F5C\u8868"]}),(0,S.jsxs)("span",{children:[(0,S.jsx)("i",{className:"sw sw-ct"})," \u5BB9\u5668/\u5E03\u5C40"]}),(0,S.jsxs)("span",{children:[(0,S.jsx)("i",{className:"sw sw-tx"})," \u6587\u672C"]})]})]}):(0,S.jsx)("div",{className:"canvas-empty",children:t("noDashboard")})}var et=require("react");var I=require("react/jsx-runtime");function Se(e){return e.flatMap(t=>[t,...Se(t.children)])}function tt({model:e,dashIdx:t,onSelectDashboard:o}){let n=H(),r=(0,et.useMemo)(()=>{let i=new Map;return e.dashboards.forEach((l,b)=>{for(let h of Se(l.zones))if(h.kind==="worksheet"&&h.name){i.has(h.name)||i.set(h.name,[]);let a=i.get(h.name);a.includes(b)||a.push(b)}}),i},[e]);return(0,I.jsxs)("div",{className:"wb-panel",children:[(0,I.jsxs)("section",{className:"wb-section",children:[(0,I.jsxs)("h3",{className:"wb-section-title",children:[n("wbDashboards"),(0,I.jsx)("span",{className:"wb-count",children:e.dashboards.length})]}),(0,I.jsxs)("ul",{className:"wb-list",children:[e.dashboards.map((i,l)=>{let h=Se(i.zones).filter(a=>a.kind==="worksheet").length;return(0,I.jsx)("li",{children:(0,I.jsxs)("button",{className:`wb-item${l===t?" active":""}`,onClick:()=>o(l),title:i.name,children:[(0,I.jsx)("span",{className:"wb-item-name",children:i.name}),(0,I.jsxs)("span",{className:"wb-item-meta",children:[Math.round(i.width)," \xD7 ",Math.round(i.height)," \xB7 ",n("wbSheetsInDash",{count:h})]})]})},l)}),e.dashboards.length===0&&(0,I.jsx)("li",{className:"wb-empty",children:n("wbNoDashboards")})]})]}),(0,I.jsxs)("section",{className:"wb-section",children:[(0,I.jsxs)("h3",{className:"wb-section-title",children:[n("wbWorksheets"),(0,I.jsx)("span",{className:"wb-count",children:e.worksheets.length})]}),(0,I.jsxs)("ul",{className:"wb-list",children:[e.worksheets.map(i=>{let l=r.get(i)??[],b=l.includes(t);return(0,I.jsx)("li",{children:(0,I.jsxs)("button",{className:`wb-item wb-sheet${b?" in-current":""}`,onClick:()=>{!b&&l.length&&o(l[0])},title:l.length?n("wbUsedIn",{count:l.length}):n("wbUnused"),children:[(0,I.jsx)("span",{className:"wb-item-name",children:i}),l.length>0&&(0,I.jsx)("span",{className:"wb-badge",children:l.length})]})},i)}),e.worksheets.length===0&&(0,I.jsx)("li",{className:"wb-empty",children:n("wbNoWorksheets")})]})]})]})}var F=require("react");var X=176,re=48,de=128,ot=60,nt=14,rt=44,at=24,st=20,ke={datasource:{fill:"#e7f5ff",stroke:"#1971c2",tag:"\u6570\u636E\u6E90"},dimension:{fill:"#ffe8cc",stroke:"#f08c00",tag:"\u7EF4\u5EA6"},measure:{fill:"#d3f9d8",stroke:"#2f9e44",tag:"\u5EA6\u91CF"},calc:{fill:"#f3e8ff",stroke:"#7048e8",tag:"\u8BA1\u7B97\u5B57\u6BB5"},parameter:{fill:"#cffafe",stroke:"#0891b2",tag:"\u53C2\u6570"},unknown:{fill:"#f1f3f5",stroke:"#ced4da",tag:"\u672A\u77E5"}};function ce(e){return e.kind==="datasource"?"datasource":e.kind==="unknown"?"unknown":e.isParameter?"parameter":e.isCalc?"calc":e.role==="dimension"?"dimension":"measure"}function Yt(e){if(!e)return[];let t=[],o=/\[([^\]]+)\]/g,n;for(;n=o.exec(e);)t.push(n[1]);return t}function it(e){let t=[],o=[],n=[],r=new Set,i=new Map,l=new Map,b=new Map,h=new Map;return e.datasources.forEach((a,f)=>{let m="ds:"+f;r.add(m),t.push({id:m,kind:"datasource",label:a.caption||a.name||"\u6570\u636E\u6E90 "+(f+1),name:a.name,dsIdx:f}),n.push(m);for(let s of a.columns){let k=te(s.name),M="f:"+f+":"+k,g=!!s.formulaRaw;r.add(M),t.push({id:M,kind:"field",label:s.label,caption:s.caption,name:s.name,role:s.role,isCalc:g,isParameter:s.isParameter?!0:void 0,parameter:s.isParameter?s.parameter??null:void 0,dsIdx:f,formula:s.formula,formulaRaw:s.formulaRaw}),i.set(f+"|"+k,M),b.has(k)||b.set(k,M),s.caption&&(l.set(f+"|"+s.caption,M),h.has(s.caption)||h.set(s.caption,M)),g||o.push({from:m,to:M})}for(let s of a.columns){if(!s.formulaRaw)continue;let k="f:"+f+":"+te(s.name),M=new Set;for(let g of Yt(s.formulaRaw)){let d=te(g),u=i.get(f+"|"+d)||b.get(d);if(u||(u=l.get(f+"|"+g)||h.get(g)),u&&u!==k&&!M.has(u))M.add(u),o.push({from:k,to:u});else if(!u&&!M.has(g)){M.add(g);let v="u:"+f+":"+d;r.has(v)||(r.add(v),t.push({id:v,kind:"unknown",label:g,name:g,dsIdx:f})),o.push({from:k,to:v})}}}}),{nodes:t,edges:o,dsNodes:n}}function lt(e){let t=new Map,o=new Map;for(let n of e)t.has(n.from)||t.set(n.from,[]),t.get(n.from).push(n.to),o.has(n.to)||o.set(n.to,[]),o.get(n.to).push(n.from);return{out:t,inc:o}}function Kt(e,t){let{out:o}=lt(t),n=new Set,r=[...o.get(e)||[]];for(;r.length;){let i=r.pop();if(!n.has(i)){n.add(i);for(let l of o.get(i)||[])r.push(l)}}return n}function Qt(e,t){let{inc:o}=lt(t),n=new Set,r=[...o.get(e)||[]];for(;r.length;){let i=r.pop();if(!n.has(i)){n.add(i);for(let l of o.get(i)||[])r.push(l)}}return n}function dt(e,t){return{self:new Set([e]),upstream:Kt(e,t),downstream:Qt(e,t)}}function ct(e,t){let o=new Map,n=new Map;e.forEach(g=>{o.set(g.id,new Set),n.set(g.id,g)}),t.forEach(g=>{g.from.startsWith("ds:")||o.has(g.from)&&o.get(g.from).add(g.to)});let r=new Map,i=new Set,l=g=>{if(r.has(g))return r.get(g);if(i.has(g))return 1;i.add(g);let d=o.get(g),u=0;if(d&&d.size){for(let v of d)u=Math.max(u,l(v));u+=1}else{let v=n.get(g);u=v&&v.kind==="datasource"?0:1}return i.delete(g),r.set(g,u),u};e.forEach(g=>l(g.id));let b=new Map;e.forEach(g=>{let d=r.get(g.id)??0;b.has(d)||b.set(d,[]),b.get(d).push(g)}),b.forEach((g,d)=>{d===1&&g.sort((u,v)=>{let L=u.role==="dimension"?0:1,A=v.role==="dimension"?0:1;return L-A})});let h={},a=[],f=at,m=0,s=[];[...b.keys()].sort((g,d)=>g-d).forEach(g=>{let d=b.get(g),u=d.length,v=u>st?Math.ceil(u/st):1,L=Math.ceil(u/v),A=[];for(let T=0;T<v;T++){let p=Math.min(u,(T+1)*L)-T*L;A.push(p*re+(p-1)*nt)}let N=Math.max(0,...A);s.push({layer:g,arr:d,subCols:v,perCol:L,laneH:N}),m=Math.max(m,N)}),s.forEach(({layer:g,arr:d,subCols:u,perCol:v,laneH:L})=>{let A=rt+Math.max(0,(m-L)/2),N=u*X+(u-1)*ot;d.forEach((T,p)=>{let C=Math.floor(p/v),P=p%v;h[T.id]={x:f+C*(X+ot),y:A+P*(re+nt)}}),a.push({layer:g,x:f,right:f+N,width:N,count:d.length,subCols:u,label:g===0?"\u6570\u636E\u6E90":g===1?"\u539F\u59CB\u5B57\u6BB5\uFF08\u7EF4\u5EA6\u2191 / \u5EA6\u91CF\u2193\uFF09":`\u8BA1\u7B97\u5B57\u6BB5 \xB7 \u5C42\u7EA7 ${g-1}`}),f+=N+de}),a.sort((g,d)=>g.layer-d.layer);let k=Math.max(0,f-de)+at,M=rt+m+48;return{pos:h,lanes:a,width:k,height:M}}function ye(e){if(e==null)return null;let t=typeof e=="number"?e:Number(String(e).trim());if(!Number.isFinite(t))return null;let o=Number(t.toPrecision(12));return Number.isFinite(o)?o:t}function pe(e){return new Intl.NumberFormat("en-US",{maximumFractionDigits:6}).format(e)}function Xt(e){let t=/^[pP](\d*(?:\.\d+)?)%?$/.exec(e.trim())||/^(\d+(?:\.\d+)?)%$/.exec(e.trim());if(!t)return null;let o=t[1];return o===void 0||o===""?0:o.includes(".")?(o.split(".")[1]||"").length:Number(o)}function Jt(e){return/^[cC]/.test(e.trim())?/^[cC]2052/.test(e.trim())?"\xA5":/^[cC]1033/.test(e.trim())?"$":"\xA5":null}function pt(e,t){if(e==null||e==="")return"\u2014";let o=String(e),n=ye(o);if(n===null)return o;let r=(t??"").trim(),i=Xt(r);if(i!==null)return`${(n*100).toFixed(i)}%`;let l=Jt(r);return l?`${l}${pe(n)}`:pe(n)}function Ce(e){if(!e||e.min===null&&e.max===null)return null;let t=ye(e.min),o=ye(e.max),n=ye(e.granularity),r=[];return(t!==null||o!==null)&&r.push(`${t!==null?pe(t):"\u2014"} ~ ${o!==null?pe(o):"\u2014"}`),n!==null&&r.push(`\u6B65\u957F ${pe(n)}`),r.join(" \xB7 ")}var ft=require("react");var eo=new Set(["IF","THEN","ELSE","ELSEIF","END","CASE","WHEN","AND","OR","NOT","IN","NULL","TRUE","FALSE","BETWEEN","LIKE","IS","AS"]),to=new Set(["SUM","AVG","MIN","MAX","COUNT","COUNTD","ATTR","MEDIAN","STDEV","STDEVP","VAR","VARP","ZN","MODE","ABS","ROUND","FLOOR","CEILING","CEIL","SIGN","SQRT","POWER","EXP","LN","LOG","IFNULL","ISNULL","NULLIF","IIF","RUNNING_SUM","RUNNING_AVG","RUNNING_MIN","RUNNING_MAX","WINDOW_SUM","WINDOW_AVG","WINDOW_MIN","WINDOW_MAX","LOOKUP","PREVIOUS_VALUE","RANK","RANK_UNIQUE","RANK_DENSE","RANK_MODIFIED","INDEX","SIZE","FIRST","LAST","TOTAL","DATE","DATEPARSE","DATENAME","DATEPART","DATEADD","DATEDIFF","DATETRUNC","YEAR","QUARTER","MONTH","DAY","WEEK","HOUR","MINUTE","SECOND","TODAY","NOW","MAKEDATE","MAKEDATETIME","MAKETIME","ISOYEAR","LEFT","RIGHT","MID","LEN","CONTAINS","FIND","FINDNTH","REPLACE","REGEXP_EXTRACT","REGEXP_MATCH","REGEXP_REPLACE","SPLIT","UPPER","LOWER","TRIM","LTRIM","RTRIM","SPACE","ASCII","CHAR","STRING","FLOAT","INT","BOOL","DATETIME"]),oo=[["comment",/\/\/[^\n]*|\/\*[\s\S]*?\*\//],["string",/'(?:[^'\\]|\\.)*'/],["field",/\[[^\]]*\]/],["number",/\d+(?:\.\d+)?/],["ident",/[A-Za-z_][A-Za-z0-9_]*/],["ws",/\s+/],["other",/[^\s]/]];function ut(e){let t=[],o=e;for(;o.length>0;){let n=!1;for(let[r,i]of oo){let l=i.exec(o);if(l&&l.index===0){t.push({type:r,value:l[0]}),o=o.slice(l[0].length),n=!0;break}}n||(t.push({type:"other",value:o[0]}),o=o.slice(1))}return t}function mt(e){switch(e.type){case"comment":return"fh-comment";case"string":return"fh-string";case"field":return"fh-field";case"number":return"fh-number";case"ident":{let t=e.value.toUpperCase();return eo.has(t)?"fh-kw":to.has(t)?"fh-fn":"fh-ident"}default:return"fh-other"}}var ve=require("react/jsx-runtime");function bt({formula:e}){if(!e)return null;let t=ut(e);return(0,ve.jsx)("code",{className:"formula-hl",children:t.map((o,n)=>o.type==="ws"?(0,ve.jsx)(ft.Fragment,{children:o.value},n):(0,ve.jsx)("span",{className:mt(o),children:o.value},n))})}var w=require("react/jsx-runtime");function no(e){return[["all",e("focusAll")],["calc",e("colCalc")],["dimension",e("roleDimension")],["measure",e("roleMeasure")],["parameter",e("legendParameter")]]}function ro(e,t){return t===0?e("laneDatasource"):t===1?e("laneRawFields"):e("laneCalcLayer",{level:t-1})}var ao=1200;function gt({model:e}){let t=H(),{nodes:o,edges:n}=(0,F.useMemo)(()=>it(e),[e]),r=(0,F.useMemo)(()=>new Map(o.map(c=>[c.id,c])),[o]),[i,l]=(0,F.useState)(null),[b,h]=(0,F.useState)(""),[a,f]=(0,F.useState)("all"),[m,s]=(0,F.useState)("auto"),[k,M]=(0,F.useState)({x:40,y:20,k:1}),g=(0,F.useRef)(null),d=(0,F.useRef)(null),u=(0,F.useRef)(!1),v=(0,F.useRef)(1),L=m==="all"?1/0:m==="auto"?o.length>ao?2:1/0:Number(m),A=(0,F.useMemo)(()=>{if(!i||L===1/0)return{nodes:o,edges:n};let c=new Set([i]),y=new Set([i]);for(let R=0;R<L&&y.size;R++){let $=new Set;for(let O of n)y.has(O.from)&&!c.has(O.to)?(c.add(O.to),$.add(O.to)):y.has(O.to)&&!c.has(O.from)&&(c.add(O.from),$.add(O.from));y=$}return{nodes:o.filter(R=>c.has(R.id)),edges:n.filter(R=>c.has(R.from)&&c.has(R.to))}},[o,n,i,L]),N=(0,F.useMemo)(()=>ct(A.nodes,A.edges),[A]),T=A.nodes.length!==o.length,p=(0,F.useMemo)(()=>i?dt(i,n):null,[i,n]),C=(0,F.useMemo)(()=>p?new Set([...p.self,...p.upstream,...p.downstream]):null,[p]),P=()=>{let c=g.current;if(!c)return;let y=c.getBoundingClientRect();if(!y||y.width===0)return;let R=Math.min((y.width-24)/N.width,(y.height-24)/N.height,1);v.current=R,M({x:Math.max(8,(y.width-N.width*R)/2),y:12,k:R})};(0,F.useEffect)(()=>{let c=requestAnimationFrame(P);return()=>cancelAnimationFrame(c)},[N]),(0,F.useEffect)(()=>{let c=g.current;if(!c)return;let y=new ResizeObserver(()=>P());return y.observe(c),()=>y.disconnect()},[P]);let U=c=>{c.preventDefault();let y=c.deltaY<0?1.1:1/1.1;M(R=>{let $=Math.min(3,Math.max(.8*v.current,R.k*y)),O=g.current?.getBoundingClientRect();if(!O)return R;let Z=c.clientX-O.left,K=c.clientY-O.top;return{k:$,x:Z-(Z-R.x)*($/R.k),y:K-(K-R.y)*($/R.k)}})},_=(0,F.useCallback)(c=>{if(!d.current)return;let y=c.clientX-d.current.x,R=c.clientY-d.current.y;(Math.abs(y)>3||Math.abs(R)>3)&&(d.current.moved=!0);let $=Number.isFinite(d.current.vx+y)?d.current.vx+y:0,O=Number.isFinite(d.current.vy+R)?d.current.vy+R:0;M(Z=>({...Z,x:$,y:O}))},[]),q=(0,F.useCallback)(()=>{d.current&&(u.current=!!d.current.moved,window.removeEventListener("pointermove",_),window.removeEventListener("pointerup",q),window.removeEventListener("blur",q),d.current=null)},[_]),Q=(0,F.useCallback)(c=>{c.button===0&&(d.current={x:c.clientX,y:c.clientY,vx:k.x,vy:k.y,moved:!1},window.addEventListener("pointermove",_),window.addEventListener("pointerup",q),window.addEventListener("blur",q))},[k.x,k.y,_,q]),ue=c=>{if(c.target===g.current){if(u.current){u.current=!1;return}l(null)}},me=(0,F.useMemo)(()=>o.filter(c=>c.kind==="field"),[o]),Le=(0,F.useMemo)(()=>{let c=b.trim().toLowerCase();return me.filter(y=>!(a==="parameter"&&!y.isParameter||a==="calc"&&(!y.isCalc||y.isParameter)||a==="dimension"&&(y.isParameter||y.role!=="dimension")||a==="measure"&&(y.isParameter||y.role!=="measure")||c&&!String(y.label).toLowerCase().includes(c)&&!String(y.name).toLowerCase().includes(c)))},[me,a,b]),ae=(0,F.useMemo)(()=>{let c=b.trim().toLowerCase();return c?new Set(me.filter(y=>String(y.label).toLowerCase().includes(c)||String(y.name).toLowerCase().includes(c)).map(y=>y.id)):null},[me,b]),z=i?r.get(i):null,Re=p?p.upstream.size:0,Ae=p?p.downstream.size:0,Fe=c=>p?C?.has(c.from)&&C.has(c.to)?"ln-edge-hl":"ln-edge-dim":ae?ae.has(c.from)&&ae.has(c.to)?"ln-edge-hl":"ln-edge-dim":"",Et=c=>p?p.self.has(c.id)?"ln-self":p.upstream.has(c.id)?"ln-up":p.downstream.has(c.id)?"ln-down":"ln-dim":ae?ae.has(c.id)?"ln-search":"ln-dim":"";return(0,w.jsxs)("div",{className:"lineage",children:[(0,w.jsxs)("aside",{className:"lineage-picker",children:[(0,w.jsx)("div",{className:"picker-head",children:t("pickerHead")}),(0,w.jsx)("input",{className:"ft-search",placeholder:t("searchLineage"),value:b,onChange:c=>h(c.target.value)}),(0,w.jsx)("div",{className:"role-tabs",children:no(t).map(([c,y])=>(0,w.jsx)("button",{className:a===c?"rt active":"rt",onClick:()=>f(c),children:y},c))}),(0,w.jsxs)("div",{className:"picker-list",children:[Le.map(c=>(0,w.jsx)("button",{className:`picker-item cat-${ce(c)}${i===c.id?" active":""}`,onClick:()=>l(c.id),title:c.name??void 0,children:c.label},c.id)),Le.length===0&&(0,w.jsx)("p",{className:"muted",children:t("noMatchPeriod")})]})]}),(0,w.jsxs)("section",{className:"lineage-canvas",children:[(0,w.jsxs)("div",{className:"lineage-toolbar",children:[(0,w.jsxs)("div",{className:"legend",children:[Object.entries(ke).map(([c,y])=>(0,w.jsxs)("span",{className:"lg",children:[(0,w.jsx)("i",{style:{background:y.fill,borderColor:y.stroke}}),y.tag]},c)),(0,w.jsx)("span",{className:"lg-note",children:t("arrowNote")})]}),(0,w.jsxs)("div",{className:"toolbar-actions",children:[(0,w.jsxs)("span",{className:"focus-seg",title:t("focusTooltip"),children:[t("focus"),[["auto",t("focusAuto")],["1","\xB11"],["2","\xB12"],["3","\xB13"],["all",t("focusAll")]].map(([c,y])=>(0,w.jsx)("button",{className:m===c?"active":"",onClick:()=>s(c),children:y},c))]}),T&&(0,w.jsx)("span",{className:"focus-count",children:t("nodesCount",{shown:A.nodes.length,total:o.length})}),(0,w.jsx)("button",{onClick:P,children:t("fitWindow")}),(0,w.jsx)("button",{onClick:()=>l(null),children:t("clearHighlight")})]})]}),(0,w.jsxs)("svg",{ref:g,className:"lineage-svg",onWheel:U,onPointerDown:Q,onClick:ue,children:[(0,w.jsxs)("defs",{children:[(0,w.jsx)("marker",{id:"ln-arrow",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:(0,w.jsx)("path",{d:"M0,0 L10,5 L0,10 z",fill:"#868e96"})}),(0,w.jsx)("marker",{id:"ln-arrow-hl",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:(0,w.jsx)("path",{d:"M0,0 L10,5 L0,10 z",fill:"#1971c2"})})]}),(0,w.jsxs)("g",{transform:`translate(${k.x},${k.y}) scale(${k.k})`,children:[N.lanes.map(c=>(0,w.jsxs)("g",{children:[c.layer!==0&&(0,w.jsx)("line",{className:"ln-lane-line",x1:c.x-de/2,y1:0,x2:c.x-de/2,y2:Math.max(0,N.height-48)}),(0,w.jsxs)("text",{className:"ln-lane-label",x:c.x+c.width/2,y:20,textAnchor:"middle",children:[ro(t,c.layer),c.subCols>1?t("subCols",{count:c.subCols}):""]})]},"lane-"+c.layer)),A.edges.map((c,y)=>{let R=N.pos[c.from],$=N.pos[c.to];if(!R||!$)return null;let O=R.x<=$.x?R:$,Z=R.x<=$.x?$:R,K=O.x+X,J=O.y+re/2,ee=Z.x,Pe=Z.y+re/2,ze=Math.max(30,Math.abs(ee-K)/2),Mt=`M${K},${J} C${K+ze},${J} ${ee-ze},${Pe} ${ee},${Pe}`,Dt=Fe(c)==="ln-edge-hl";return(0,w.jsx)("path",{d:Mt,className:"ln-edge "+Fe(c),markerEnd:"url(#"+(Dt?"ln-arrow-hl":"ln-arrow")+")"},y)}),A.nodes.map(c=>{let y=N.pos[c.id];if(!y)return null;let R=ce(c),$=ke[R],O=Be(c.label),Z=13,K=24-(O.length-1)*Z/2+10;return(0,w.jsxs)("g",{className:"ln-node "+Et(c),transform:`translate(${y.x},${y.y})`,onClick:J=>{J.stopPropagation(),l(c.id)},style:{cursor:"pointer"},children:[(0,w.jsx)("rect",{width:X,height:re,rx:9,className:"ln-rect",style:{fill:$.fill,stroke:$.stroke}}),(0,w.jsx)("text",{className:"ln-label",x:X/2,textAnchor:"middle",children:O.map((J,ee)=>(0,w.jsx)("tspan",{x:X/2,y:K+ee*Z,children:J},ee))})]},c.id)})]})]})]}),(0,w.jsxs)("aside",{className:"lineage-detail",children:[!z&&(0,w.jsx)("div",{className:"detail-empty",children:t("detailEmpty")}),z&&(0,w.jsxs)("div",{className:"detail-body",children:[(0,w.jsx)("div",{className:"detail-head",children:z.label}),(0,w.jsxs)("div",{className:"detail-meta",children:[(0,w.jsx)("span",{className:`pill cat-${ce(z)}`,children:ke[ce(z)].tag}),z.kind==="field"&&!z.isParameter&&(0,w.jsx)("span",{className:"pill",children:z.role==="dimension"?t("roleDimension"):z.role==="measure"?t("roleMeasure"):t("kindField")})]}),z.isParameter&&(0,w.jsxs)("div",{className:"detail-param",children:[(0,w.jsxs)("div",{className:"dp-value",children:[(0,w.jsx)("span",{className:"dp-label",children:t("paramValue")}),(0,w.jsx)("span",{className:"dp-num",children:pt(z.parameter?.value,z.parameter?.defaultFormat)})]}),(0,w.jsxs)("div",{className:"dp-meta",children:[(0,w.jsxs)("span",{children:[t("paramDomain"),": ",z.parameter?.domainType??"\u2014"]}),Ce(z.parameter?.range)&&(0,w.jsxs)("span",{children:[t("paramRange"),": ",Ce(z.parameter?.range)]}),(0,w.jsxs)("span",{children:[t("paramFormat"),": ",z.parameter?.defaultFormat??"\u2014"]})]}),(0,w.jsxs)("div",{className:"dp-raw",title:t("paramRawHint"),children:[t("paramRaw"),": ",z.parameter?.value??"\u2014"]})]}),z.kind==="field"&&(0,w.jsx)("div",{className:"detail-internal",title:z.name??void 0,children:t("internalName",{name:z.name??""})}),z.formulaRaw&&(0,w.jsxs)("div",{className:"detail-formula",children:[(0,w.jsx)("div",{className:"df-title",children:t("calcFormula")}),(0,w.jsx)("pre",{className:"calc-formula",children:(0,w.jsx)(bt,{formula:z.formula||z.formulaRaw})})]}),(0,w.jsxs)("div",{className:"detail-counts",children:[(0,w.jsxs)("div",{className:"dc up",children:[(0,w.jsx)("span",{className:"dc-num",children:Re}),(0,w.jsx)("span",{className:"dc-lbl",children:t("upstreamLabel")})]}),(0,w.jsxs)("div",{className:"dc down",children:[(0,w.jsx)("span",{className:"dc-num",children:Ae}),(0,w.jsx)("span",{className:"dc-lbl",children:t("downstreamLabel")})]})]}),p&&Re>0&&(0,w.jsxs)("div",{className:"detail-list",children:[(0,w.jsx)("div",{className:"dl-title ln-up",children:t("upstreamTitle")}),[...p.upstream].map(c=>{let y=r.get(c);return(0,w.jsx)("button",{className:"dl-item",onClick:()=>l(c),children:y?y.label:c},c)})]}),p&&Ae>0&&(0,w.jsxs)("div",{className:"detail-list",children:[(0,w.jsx)("div",{className:"dl-title ln-down",children:t("downstreamTitle")}),[...p.downstream].map(c=>{let y=r.get(c);return(0,w.jsx)("button",{className:"dl-item",onClick:()=>l(c),children:y?y.label:c},c)})]})]})]})]})}var Y=require("react");function ht(e){let t=[],o=[],n=new Set;return e.datasources.forEach((r,i)=>{let l=r.dataModel;if(!l||l.tables.length===0)return;let b=r.caption||`#${i+1}`,h=(a,f,m,s)=>`ds${i}:${m}:${a}:${f??""}:${s??""}`;for(let a of l.tables){let f=h(a.name,a.table,a.kind,a.objectId);n.has(f)||(n.add(f),t.push({id:f,label:a.name,sublabel:a.table||null,kind:a.kind,datasource:b,connection:r.connection??null,sql:a.sql}))}l.joins.forEach((a,f)=>{let m=h(a.left.name,a.left.table,a.left.kind,a.left.objectId),s=h(a.right.name,a.right.table,a.right.kind,a.right.objectId);!n.has(m)||!n.has(s)||o.push({id:`ds${i}:join${f}`,from:m,to:s,joinType:a.joinType,leftExpr:a.leftExpr,rightExpr:a.rightExpr,cardinality:a.cardinality,datasource:b})})}),{nodes:t,edges:o}}function wt(e){let{nodes:t,edges:o}=e,n=new Map;for(let s of t)n.set(s.id,[]);for(let s of o)n.get(s.to)?.push(s.from);let r=new Map;for(let s of t)(n.get(s.id)||[]).length===0&&r.set(s.id,0);for(let s of t)r.has(s.id)||r.set(s.id,0);for(let s=0;s<t.length;s++){let k=!1;for(let M of o){let g=r.get(M.from)??0;(r.get(M.to)??0)<g+1&&(r.set(M.to,g+1),k=!0)}if(!k)break}let i=new Map;for(let s of t){let k=r.get(s.id)??0;i.has(k)||i.set(k,[]),i.get(k).push(s)}let l=[...i.keys()].sort((s,k)=>s-k),b={},h=s=>(b[s]?.y??24)+56/2;l.forEach((s,k)=>{let M=i.get(s).slice(),g=24+k*288;if(s===0){let p=24;for(let C of M)b[C.id]={x:g,y:p},p+=78;return}let d=M.map(p=>{let P=(n.get(p.id)||[]).map(h),U=P.length?P.reduce((_,q)=>_+q,0)/P.length:24+56/2;return{node:p,anchor:U}});d.sort((p,C)=>p.anchor-C.anchor);let u=[],v=24;for(let p of d){let C=Math.max(v,p.anchor-28);u.push({id:p.node.id,top:C,anchor:p.anchor}),v=C+56+22}let L=u[0].top,A=u[u.length-1].top+56,N=u.reduce((p,C)=>p+C.anchor,0)/u.length,T=Math.max(N-(L+A)/2,24-L);for(let p of u)b[p.id]={x:g,y:p.top+T}});let a=t.length?Math.max(...t.map(s=>b[s.id].y+56)):56,f=48+l.length*168+Math.max(0,l.length-1)*120,m=a+24;return{pos:b,layers:l.length,width:Math.max(f,320),height:Math.max(m,160)}}function xt(e,t,o=168,n=56){let r=e.x+o,i=e.y+n/2,l=t.x,b=t.y+n/2,h=l-r;if(h>8){let m=Math.min(Math.max(h*.45,28),130);return`M ${r} ${i} C ${r+m} ${i}, ${l-m} ${b}, ${l} ${b}`}let a=Math.max(56,Math.abs(b-i)/2+40),f=(r+l)/2;return`M ${r} ${i} Q ${f} ${Math.min(i,b)-a}, ${l} ${b}`}var x=require("react/jsx-runtime");function kt(e,t){return{inner:e("joinInner"),left:e("joinLeft"),right:e("joinRight"),full:e("joinFull"),relationship:e("joinRelationship")}[t]??t}function yt({model:e}){let t=H(),o=(0,Y.useMemo)(()=>ht(e),[e]),n=(0,Y.useMemo)(()=>wt(o),[o]),[r,i]=(0,Y.useState)(null),[l,b]=(0,Y.useState)(!1),h=d=>{navigator.clipboard?.writeText(d).then(()=>{b(!0),setTimeout(()=>b(!1),1600)},()=>{})},a=(0,Y.useMemo)(()=>new Map(o.nodes.map(d=>[d.id,d])),[o.nodes]);(0,Y.useEffect)(()=>{i(d=>{if(d)return d;let u=o.nodes.find(v=>v.kind==="custom-sql");return u?{kind:"node",id:u.id}:d})},[o.nodes]);let f=d=>{let u=d.connection;return u?[u.class,u.type,u.server,u.dbname,u.filename].filter(Boolean).join(" \xB7 "):""},m=r?.kind==="node"?a.get(r.id)??null:null,s=r?.kind==="edge"?o.edges.find(d=>d.id===r.id)??null:null,k=o.edges.length,M=o.nodes.filter(d=>d.kind==="custom-sql"),g=d=>n.pos[d]??{x:0,y:0};return(0,x.jsxs)("div",{className:"datamodel-view",children:[(0,x.jsxs)("div",{className:"dm-toolbar",children:[(0,x.jsx)("span",{className:"dm-stat",children:t("dmTables",{count:o.nodes.length})}),(0,x.jsx)("span",{className:"dm-stat",children:t("dmJoins",{count:k})}),M.length>0&&(0,x.jsx)("span",{className:"dm-stat",children:t("dmCustomSql",{count:M.length})}),(0,x.jsx)("span",{className:"dm-hint",children:t("dmSelectHint")})]}),(0,x.jsxs)("div",{className:"dm-body",children:[(0,x.jsx)("div",{className:"dm-canvas",children:(0,x.jsxs)("svg",{className:"dm-svg",width:n.width,height:n.height,viewBox:`0 0 ${n.width} ${n.height}`,children:[o.edges.map(d=>{let u=g(d.from),v=g(d.to),L=r?.kind==="edge"&&r.id===d.id,A=a.get(d.from),N=a.get(d.to),T=xt(u,v);return(0,x.jsxs)("g",{className:`dm-edge${L?" active":""}`,children:[(0,x.jsx)("path",{d:T,className:"dm-link-hit",onClick:()=>i({kind:"edge",id:d.id})}),(0,x.jsx)("path",{d:T,className:`dm-link join-${d.joinType}`}),(0,x.jsx)("title",{children:`${A?.label??"?"} \u2014 ${kt(t,d.joinType)} \u2014 ${N?.label??"?"}
${t("dmOn")}: ${d.leftExpr??"\u2014"} = ${d.rightExpr??"\u2014"}`+(d.cardinality?`
${t("dmCardinality")}: ${d.cardinality}`:"")})]},d.id)}),o.nodes.map(d=>{let u=n.pos[d.id]??{x:0,y:0},v=r?.kind==="node"&&r.id===d.id;return(0,x.jsxs)("g",{className:`dm-node dm-${d.kind}${v?" active":""}`,transform:`translate(${u.x}, ${u.y})`,onClick:()=>i({kind:"node",id:d.id}),children:[(0,x.jsx)("title",{children:`${d.label}${d.sublabel?`
`+d.sublabel:""}
${t("dmDatasource")}: ${d.datasource}`}),(0,x.jsx)("rect",{width:168,height:56,rx:8}),(0,x.jsx)("text",{x:12,y:23,className:"dm-node-title",children:d.label.length>16?d.label.slice(0,15)+"\u2026":d.label}),(0,x.jsx)("text",{x:12,y:41,className:"dm-node-sub",children:d.kind==="custom-sql"?t("dmSqlBadge"):(d.sublabel??"").slice(0,20)})]},d.id)})]})}),(0,x.jsxs)("aside",{className:"dm-detail",children:[!r&&(0,x.jsx)("div",{className:"dm-detail-empty",children:o.nodes.length?t("dmSelectHint"):t("dmEmpty")}),m&&(0,x.jsxs)("div",{className:"dm-detail-card",children:[(0,x.jsxs)("div",{className:"dm-detail-title",children:[m.label,(0,x.jsx)("span",{className:`dm-kind-badge ${m.kind}`,children:m.kind==="custom-sql"?t("dmSqlBadge"):t("dmTableBadge")})]}),(0,x.jsxs)("dl",{children:[(0,x.jsx)("dt",{children:t("dmDatasource")}),(0,x.jsx)("dd",{children:m.datasource}),m.sublabel&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("dt",{children:t("dmPhysical")}),(0,x.jsx)("dd",{className:"mono",children:m.sublabel})]}),f(m)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("dt",{children:t("dmConnection")}),(0,x.jsx)("dd",{className:"mono",children:f(m)})]})]}),m.sql&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"dm-sql-title",children:[t("dmSqlText"),(0,x.jsx)("button",{className:"sql-copy",onClick:()=>h(m.sql),children:t(l?"sqlCopied":"sqlCopy")})]}),(0,x.jsx)("pre",{className:"dm-sql",children:m.sql})]})]}),s&&(0,x.jsxs)("div",{className:"dm-detail-card",children:[(0,x.jsx)("div",{className:"dm-detail-title",children:kt(t,s.joinType)}),(0,x.jsxs)("dl",{children:[(0,x.jsx)("dt",{children:t("dmFrom")}),(0,x.jsx)("dd",{children:a.get(s.from)?.label??"?"}),(0,x.jsx)("dt",{children:t("dmTo")}),(0,x.jsx)("dd",{children:a.get(s.to)?.label??"?"}),(0,x.jsx)("dt",{children:t("dmOn")}),(0,x.jsxs)("dd",{className:"mono",children:[s.leftExpr??"\u2014"," = ",s.rightExpr??"\u2014"]}),(0,x.jsx)("dt",{children:t("dmCardinality")}),(0,x.jsx)("dd",{children:s.cardinality??t("dmNotStored")})]})]}),M.length>0&&(0,x.jsxs)("div",{className:"dm-sql-list",children:[(0,x.jsxs)("div",{className:"dm-sql-list-title",children:[t("dmSqlList"),(0,x.jsx)("span",{className:"wb-count",children:M.length})]}),M.map(d=>(0,x.jsx)("button",{className:`dm-sql-item${r?.kind==="node"&&r.id===d.id?" active":""}`,onClick:()=>i({kind:"node",id:d.id}),title:d.datasource,children:d.label},d.id))]}),(0,x.jsxs)("div",{className:"dm-legend",children:[(0,x.jsxs)("div",{className:"dm-legend-item",children:[(0,x.jsx)("span",{className:"dm-swatch dm-table"}),t("dmTableBadge")]}),(0,x.jsxs)("div",{className:"dm-legend-item",children:[(0,x.jsx)("span",{className:"dm-swatch dm-custom-sql"}),t("dmSqlBadge")]}),(0,x.jsx)("div",{className:"dm-legend-item dm-legend-hint",children:t("dmSelectHint")})]})]})]})]})}var D=require("react/jsx-runtime");function vt({fullscreen:e=!1,onToggleFullscreen:t}){let o=H(),n=(0,G.useRef)(je()).current,[r,i]=(0,G.useState)(n?.model??null),[l,b]=(0,G.useState)(n?.dashIdx??0),[h,a]=(0,G.useState)(n?.view??"layout"),[f,m]=(0,G.useState)(""),[s,k]=(0,G.useState)(n?.fileName??""),[M,g]=(0,G.useState)(!1);(0,G.useEffect)(()=>{Ue({model:r,dashIdx:l,view:h,fileName:s})},[r,l,h,s]);let d=(N,T)=>{m("");try{let p=$e(N);i(p),b(0),k(T||"")}catch(p){i(null),m(p.message||o("parseFailed"))}},u=(0,G.useRef)(!1);(0,G.useEffect)(()=>{if(r||u.current)return;u.current=!0;let N=!1;return g(!0),fetch(fe).then(T=>{if(!T.ok)throw new Error("HTTP "+T.status);return T.text()}).then(T=>{N||d(T,o("sampleFileName"))}).catch(T=>{N||m(o("sampleAutoLoadFailed")+T.message+o("orChooseManually"))}).finally(()=>{N||g(!1)}),()=>{N=!0}},[r]);let v=(0,G.useMemo)(()=>r?He(r):null,[r]),L=r?.dashboards||[],A=L[l]||null;return(0,D.jsxs)("div",{className:"app",children:[(0,D.jsxs)("header",{className:"app-header",children:[(0,D.jsxs)("div",{className:"brand",children:[(0,D.jsx)("h1",{children:o("appTitle")}),(0,D.jsx)("p",{className:"sub",children:o("appSubtitle")})]}),(0,D.jsxs)("div",{className:"header-actions",children:[(0,D.jsxs)("div",{className:"view-tabs",children:[(0,D.jsx)("button",{className:h==="layout"?"vt active":"vt",onClick:()=>a("layout"),children:o("tabLayout")}),(0,D.jsx)("button",{className:h==="lineage"?"vt active":"vt",onClick:()=>a("lineage"),children:o("tabLineage")}),(0,D.jsx)("button",{className:h==="data"?"vt active":"vt",onClick:()=>a("data"),children:o("tabDataModel")})]}),(0,D.jsx)(Ye,{onText:d,onError:m,busy:M}),t&&(0,D.jsx)("button",{className:"fs-toggle",onClick:t,title:o(e?"exitFullscreenEsc":"fullscreenTooltip"),children:o(e?"exitFullscreen":"fullscreen")})]})]}),f&&(0,D.jsxs)("div",{className:"error-banner",children:["\u26A0 ",f]}),!r&&(0,D.jsx)("div",{className:"welcome",children:(0,D.jsxs)("div",{className:"welcome-card",children:[(0,D.jsx)("h2",{children:o(M?"sampleLoading":"welcomeTitle")}),(0,D.jsx)("p",{children:o("welcomeTitle")}),(0,D.jsxs)("ul",{children:[(0,D.jsxs)("li",{children:[o("help1a"),(0,D.jsx)("b",{children:"1:1"}),o("help1b")]}),(0,D.jsxs)("li",{children:[o("help2a"),(0,D.jsx)("b",{children:"SVG / PNG / .excalidraw"}),o("help2b")]}),(0,D.jsxs)("li",{children:[o("help3a"),(0,D.jsx)("b",{children:o("welcomeMeta")}),o("help3b")]})]}),(0,D.jsxs)("p",{className:"muted",children:[o("helpAuto")," ",o("helpSecurity")]})]})}),r&&v&&(0,D.jsxs)("div",{className:"summary-bar",children:[s&&(0,D.jsx)("span",{className:"sf",children:s}),(0,D.jsxs)("span",{children:[o("statDashboards")," ",(0,D.jsx)("b",{children:v.dashboards})]}),(0,D.jsxs)("span",{children:[o("statWorksheets")," ",(0,D.jsx)("b",{children:v.worksheets})]}),(0,D.jsxs)("span",{children:[o("statDatasources")," ",(0,D.jsx)("b",{children:v.datasources})]}),(0,D.jsxs)("span",{children:[o("statFields")," ",(0,D.jsx)("b",{children:v.fields})]}),(0,D.jsxs)("span",{children:[o("statCalcs")," ",(0,D.jsx)("b",{children:v.calculations})]}),L.length>1&&(0,D.jsx)("select",{className:"dash-select",value:l,onChange:N=>b(+N.target.value),children:L.map((N,T)=>(0,D.jsx)("option",{value:T,children:N.name},T))})]}),r&&h==="layout"&&(0,D.jsxs)("div",{className:"main",children:[(0,D.jsx)("section",{className:"left",children:(0,D.jsx)(Je,{dashboard:A})}),(0,D.jsx)("aside",{className:"right",children:(0,D.jsx)(tt,{model:r,dashIdx:l,onSelectDashboard:b})})]}),r&&h==="lineage"&&(0,D.jsx)(gt,{model:r}),r&&h==="data"&&(0,D.jsx)(yt,{model:r})]})}var B=require("react/jsx-runtime");function Nt(e,t,o){if(typeof document>"u"||document.querySelector(`style[data-plugin-css="${t}"]`))return;let n=document.createElement("style");n.dataset.plugin=e,n.dataset.pluginCss=t,n.textContent=o,document.head.appendChild(n)}Nt("dsh-tableau-twb-viewer","dsh-tableau-twb-viewer/style.css",We);Nt("dsh-tableau-twb-viewer","dsh-tableau-twb-viewer/plugin.css",Ie);var Te="twb-viewer";function lo({size:e=18,active:t}){return(0,B.jsxs)("svg",{width:e,height:e,viewBox:"0 0 16 16",fill:"none","aria-hidden":"true",style:{display:"block",opacity:t?1:.85},children:[(0,B.jsx)("rect",{x:"1.4",y:"2.2",width:"13.2",height:"11.6",rx:"2",stroke:"currentColor",strokeWidth:"1.2"}),(0,B.jsx)("path",{d:"M1.4 6.2h13.2",stroke:"currentColor",strokeWidth:"1.2"}),(0,B.jsx)("circle",{cx:"5.2",cy:"10.4",r:"1.35",stroke:"currentColor",strokeWidth:"1.1"}),(0,B.jsx)("circle",{cx:"10.8",cy:"10.4",r:"1.35",stroke:"currentColor",strokeWidth:"1.1"}),(0,B.jsx)("path",{d:"M6.55 10.4h2.9",stroke:"currentColor",strokeWidth:"1.1"})]})}function co(){let[e,t]=(0,Ne.useState)(!1);return(0,Ne.useEffect)(()=>{if(!e)return;let n=r=>{r.key==="Escape"&&t(!1)};return window.addEventListener("keydown",n),()=>window.removeEventListener("keydown",n)},[e]),(0,B.jsx)("div",{className:`twb-root twb-root--panel${e?" twb-fullscreen":""}`,children:(0,B.jsx)(vt,{fullscreen:e,onToggleFullscreen:()=>t(n=>!n)})})}function po({t:e}){return(0,B.jsx)(Ze,{value:e??De("zh"),children:(0,B.jsx)(co,{})})}var uo=["slots","locale"];function mo(e){e.effect(()=>e.locale.register(le,{zh:ie,en:Me}),"dsh-tableau-twb-viewer: locale");let t=e.locale.bind(le);e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:Te,order:20,locale:le,label:()=>t("panel")},lo)),e.slots.inject("main",()=>e.slots.register({name:"main",key:Te,locale:le},po))}

		return module.exports;
	}
});
