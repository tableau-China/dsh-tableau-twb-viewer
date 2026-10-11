// 端到端测试：在真实 DSH Web（无头 Chrome）里验证插件全部功能。
//
// 覆盖：引导 → 打开设置 → 插件分区 → **打开即自动加载内置示例** → 布局图/引用关系图
//       → 聚焦控件 → 全屏 → Esc 后重开恢复 → 控制台无错误。
//
// 前置：
//   1. ./test/e2e-boot.sh 3199 启动隔离实例（会打印带 token 的 URL）
//   2. TWB_URL="http://127.0.0.1:3199/?token=..." npm run e2e
//
// 兼容 DSH 0.1.0-rc 与 0.2.x：引导流程按「能点就点、弹窗用真实鼠标点掉」处理。

import puppeteer from "puppeteer-core";
import { writeFileSync } from "node:fs";

const URL = process.env.TWB_URL || "http://127.0.0.1:3199";
const CHROME = process.env.TWB_CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const WORKSPACE_PATH = process.env.TWB_WORKSPACE || "/tmp/dsh-twb-e2e/ws";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--user-data-dir=/tmp/twb-chrome-profile"]
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push("pageerror: " + err.message));

let failed = false;
const ok = (cond, label) => {
  if (cond) console.log("✓ " + label);
  else {
    console.error("✗ " + label);
    failed = true;
  }
};

/** 用真实鼠标点击文本匹配的按钮（React 弹窗会拦截合成 click）。 */
const clickButtonText = async (texts) => {
  const handle = await page.evaluateHandle((wanted) => {
    const buttons = [...document.querySelectorAll('[role="dialog"] button, button')];
    return buttons.find((b) => wanted.some((t) => (b.textContent || "").includes(t))) || null;
  }, texts);
  const el = handle.asElement();
  if (!el) return false;
  const box = await el.boundingBox();
  if (!box) return false;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(1200);
  return true;
};

try {
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(5000);

  // ---- 首次引导：工作区选择（新老流程都试）+ 关掉阻塞弹窗 ----
  for (let round = 0; round < 6; round++) {
    const before = await page.evaluate(() => document.body.innerText.slice(0, 120));
    const pathBox = await page.$('textarea[placeholder*="workspace"], textarea[placeholder*="工作区"]');
    if (pathBox) {
      await pathBox.type(WORKSPACE_PATH);
      await page.keyboard.press("Enter");
      await sleep(2000);
      await clickButtonText(["Open", "打开"]);
      continue;
    }
    if (await clickButtonText(["Continue", "继续"])) continue;
    if (await clickButtonText(["Configure later", "稍后配置"])) continue;
    const after = await page.evaluate(() => document.body.innerText.slice(0, 120));
    if (after === before) break;
  }
  await sleep(2000);

  // ---- 主入口：左侧栏面板行（用户不必去设置里找）----
  const panelEntry = await page.waitForSelector('[aria-label="TWb 检视器"]', { timeout: 20000 }).catch(() => null);
  ok(!!panelEntry, "左侧栏出现「TWb 检视器」面板入口");
  if (panelEntry) {
    await panelEntry.click();
    await sleep(2500);
  }
  ok(
    await page.evaluate(() => !!document.querySelector(".twb-root--panel")),
    "点击后主区渲染整页检视器（.twb-root--panel）"
  );

  // ---- 打开即自动加载内置示例（本次新增行为）----
  const autoLoaded = await page
    .waitForSelector(".twb-root .canvas-viewport svg", { timeout: 25000 })
    .then(() => true)
    .catch(() => false);
  ok(autoLoaded, "打开即自动加载内置示例（未点击「载入示例」）");

  const panel = await page.evaluate(() => ({
    title: document.body.innerText.includes("Tableau .twb 仪表板布局检视器"),
    summary: document.querySelector(".twb-root--panel .summary-bar")?.innerText.replace(/\n/g, " ").slice(0, 90) || "",
    meta: !!document.querySelector(".twb-root .meta-panel"),
    zones: document.querySelectorAll(".twb-root .canvas-viewport svg rect").length,
    fileName: document.querySelector(".twb-root--panel .summary-bar .sf")?.textContent || ""
  }));
  ok(panel.title, "检视器面板已渲染");
  ok(panel.zones > 5, `布局图已渲染（${panel.zones} 个 zone）`);
  ok(panel.meta, "Metadata 面板已渲染");
  ok(panel.fileName.includes("sample"), `已加载示例文件（${panel.fileName}）`);
  console.log(`  概要: ${panel.summary}`);

  // ---- .twbx 必须被拒绝（有意的数据安全设计）----
  const twbxPath = "/tmp/twb-should-reject.twbx";
  writeFileSync(twbxPath, "PK\u0003\u0004dummy-twbx");
  const fileInput = await page.$('.twb-root--panel input[type="file"]');
  await fileInput.uploadFile(twbxPath);
  await sleep(1500);
  const rejected = await page.evaluate(() => ({
    error: document.querySelector(".twb-root .error-banner")?.textContent || "",
    file: document.querySelector(".twb-root--panel .summary-bar .sf")?.textContent || ""
  }));
  ok(rejected.error.includes("twbx"), `.twbx 被拒绝并提示（不改变当前文件：${rejected.file}）`);

  // ---- 引用关系图 + 聚焦控件 ----
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".twb-root--panel .view-tabs button")].find((x) => x.textContent.includes("引用关系"));
    if (b) b.click();
  });
  await sleep(2500);
  const lineage = await page.evaluate(() => ({
    svg: !!document.querySelector(".twb-root .lineage-svg"),
    picker: !!document.querySelector(".twb-root .lineage-picker"),
    nodes: document.querySelectorAll(".twb-root--panel .ln-node").length,
    edges: document.querySelectorAll(".twb-root .ln-edge").length,
    focusSeg: !!document.querySelector(".twb-root .focus-seg")
  }));
  ok(lineage.svg && lineage.picker, "引用关系图已渲染（SVG + 字段选择器）");
  ok(lineage.nodes > 0 && lineage.edges > 0, `图内容: ${lineage.nodes} 节点 / ${lineage.edges} 边`);
  ok(lineage.focusSeg, "聚焦控件存在（大图可用性）");

  // 点击节点 → 血缘详情
  await page.evaluate(() => {
    const node = document.querySelector(".twb-root--panel .ln-node");
    if (node) node.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await sleep(800);
  ok(await page.evaluate(() => !!document.querySelector(".twb-root .detail-body")), "点击节点后显示上下游血缘详情");

  // 切回「全部」聚焦，保证后续断言看到完整图
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".twb-root--panel .focus-seg button")].find((x) => x.textContent.trim() === "全部");
    if (b) b.click();
  });
  await sleep(1200);

  // ---- 全屏 ----
  const fsClicked = await page.evaluate(() => {
    const b = [...document.querySelectorAll(".twb-root button")].find((x) => x.textContent.includes("全屏"));
    if (b) {
      b.click();
      return true;
    }
    return false;
  });
  ok(fsClicked, "「⛶ 全屏」按钮可点击");
  await sleep(1500);
  const fsState = await page.evaluate(() => {
    const root = document.querySelector(".twb-root.twb-fullscreen");
    if (!root) return { present: false };
    const r = root.getBoundingClientRect();
    return {
      present: true,
      fixed: getComputedStyle(root).position === "fixed",
      covers: Math.abs(r.width - window.innerWidth) < 4 && Math.abs(r.height - window.innerHeight) < 4,
      nodes: document.querySelectorAll(".twb-root--panel .ln-node").length
    };
  });
  ok(fsState.present && fsState.fixed && fsState.covers, "全屏覆盖层铺满视口（position:fixed）");
  ok(fsState.nodes > 0, `全屏后关系图仍渲染（${fsState.nodes} 节点，状态未丢失）`);

  // ---- Esc 只退出全屏：主区面板仍在（状态不丢）----
  await page.keyboard.press("Escape");
  await sleep(1500);
  const afterEsc = await page.evaluate(() => ({
    fsGone: !document.querySelector(".twb-root.twb-fullscreen"),
    panelStillThere: !!document.querySelector(".twb-root--panel"),
    nodes: document.querySelectorAll(".twb-root--panel .ln-node").length,
    activeTab: [...document.querySelectorAll(".twb-root--panel .view-tabs button")].find((b) => b.className.includes("active"))?.textContent || ""
  }));
  ok(afterEsc.fsGone, "Esc 退出全屏");
  ok(afterEsc.panelStillThere && afterEsc.nodes > 0, `退出全屏后主区面板仍在（${afterEsc.nodes} 节点）`);
  ok(afterEsc.activeTab.includes("引用关系"), `视图已保留（${afterEsc.activeTab}）`);

  // ---- 次入口：设置页分区仍可用 ----
  const trigger2 = await page.waitForSelector('button[aria-haspopup="dialog"]', { timeout: 15000 }).catch(() => null);
  ok(!!trigger2, "设置触发器存在（次入口）");
  if (trigger2) {
    await trigger2.click();
    await sleep(2000);
  }
  const settingsEntry = await page.evaluate(() => {
    // 注意：左侧栏面板行与设置导航同名，必须在弹窗内查找
    const dialog = document.querySelector('[role="dialog"]') || document.body;
    const hit = [...dialog.querySelectorAll("button, [role=button], a")].find(
      (el) => el.textContent.trim() === "TWb 检视器"
    );
    if (!hit) return false;
    hit.click();
    return true;
  });
  await sleep(2500);
  const restored = await page.evaluate(() => ({
    section: !!document.querySelector(".twb-root--section"),
    nodes: document.querySelectorAll(".twb-root--panel .ln-node").length
  }));
  ok(settingsEntry && restored.section, "设置页分区入口保留可用（.twb-root--section）");
  ok(restored.nodes > 0, `设置内同样恢复上次解析结果（${restored.nodes} 节点）`);

  // 关闭设置弹窗：避免后续断言同时命中「设置分区」与「主区面板」两个已挂载实例
  await page.keyboard.press("Escape");
  await sleep(1500);
  ok(
    await page.evaluate(() => !document.querySelector(".twb-root--section")),
    "关闭设置后仅保留主区实例"
  );

  // ---- 可选：真实大图（验证聚焦模式 / 自动聚焦）----
  if (process.env.TWB_LARGE_FIELDS) {
    const fields = Number(process.env.TWB_LARGE_FIELDS);
    const { makeTwb } = await import("./lib/synthetic-twb.mjs");
    const { writeFileSync } = await import("node:fs");
    const largePath = "/tmp/twb-large-e2e.twb";
    writeFileSync(largePath, makeTwb({ datasources: 2, fields }));

    const fileInput = await page.$('.twb-root input[type="file"]');
    await fileInput.uploadFile(largePath);
    await sleep(8000);
    const uploaded = await page.evaluate(() => ({
      file: document.querySelector(".twb-root--panel .summary-bar .sf")?.textContent || "",
      summary: document.querySelector(".twb-root--panel .summary-bar")?.innerText.replace(/\n/g, " ").slice(0, 70) || ""
    }));
    ok(uploaded.file.includes("twb-large-e2e"), `已上传大图 ${fields * 2} 字段（${uploaded.summary}）`);

    await page.evaluate(() => {
      const b = [...document.querySelectorAll(".twb-root--panel .view-tabs button")].find((x) => x.textContent.includes("引用关系"));
      if (b) b.click();
    });
    await sleep(6000);
    const all = await page.evaluate(() => document.querySelectorAll(".twb-root--panel .ln-node").length);
    ok(all > 1200, `大图全量渲染（${all} 节点）`);

    // 聚焦模式切回「自动」（前面的断言把它设成了「全部」，面板不卸载会保留该状态）
    await page.evaluate(() => {
      const b = [...document.querySelectorAll(".twb-root--panel .focus-seg button")].find((x) => x.textContent.trim() === "自动");
      if (b) b.click();
    });
    await sleep(1200);

    // 选中一个节点 → 超过阈值时自动聚焦（±2 跳）
    await page.evaluate(() => {
      const n = document.querySelector(".twb-root--panel .ln-node");
      if (n) n.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(2500);
    const focused = await page.evaluate(() => ({
      nodes: document.querySelectorAll(".twb-root--panel .ln-node").length,
      count: document.querySelector(".twb-root--panel .focus-count")?.textContent.trim() || ""
    }));
    ok(focused.nodes > 0 && focused.nodes < all, `自动聚焦生效（${focused.nodes} / ${all} 节点 · ${focused.count}）`);

    // 切「全部」→ 恢复全量
    await page.evaluate(() => {
      const b = [...document.querySelectorAll(".twb-root--panel .focus-seg button")].find((x) => x.textContent.trim() === "全部");
      if (b) b.click();
    });
    await sleep(4000);
    const back = await page.evaluate(() => document.querySelectorAll(".twb-root--panel .ln-node").length);
    ok(back === all, `切「全部」恢复全量渲染（${back} 节点）`);
  }

  // ---- 控制台 ----
  const realErrors = consoleErrors.filter((e) => !e.includes("favicon") && !e.includes("net::ERR_"));
  ok(realErrors.length === 0, `控制台无报错${realErrors.length ? "：" + realErrors.join(" | ").slice(0, 300) : ""}`);
} finally {
  await browser.close();
}

if (failed) process.exit(1);
console.log("\n端到端测试全部通过 ✔");
