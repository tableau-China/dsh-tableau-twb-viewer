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
  const panelEntry = await page
    .waitForSelector('[aria-label="TWb 检视器"], [aria-label="TWb Viewer"]', { timeout: 20000 })
    .catch(() => null);
  ok(!!panelEntry, "左侧栏出现「TWb 检视器 / TWb Viewer」面板入口");
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
    title: (document.querySelector(".twb-root--panel .brand h1")?.textContent || "").length > 5,
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
    const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[1];
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
    const segs = [...document.querySelectorAll(".twb-root--panel .focus-seg button")];
    const b = segs[segs.length - 1];
    if (b) b.click();
  });
  await sleep(1200);

  // ---- 全屏 ----
  const fsClicked = await page.evaluate(() => {
    const b = document.querySelector(".twb-root .fs-toggle");
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
    activeTabIndex: [...document.querySelectorAll(".twb-root--panel .view-tabs button")].findIndex((b) => b.className.includes("active"))
  }));
  ok(afterEsc.fsGone, "Esc 退出全屏");
  ok(afterEsc.panelStillThere && afterEsc.nodes > 0, `退出全屏后主区面板仍在（${afterEsc.nodes} 节点）`);
  ok(afterEsc.activeTabIndex === 1, `视图已保留（第 ${afterEsc.activeTabIndex + 1} 个页签 = 引用关系）`);

  // ---- 设置里不再注册入口（唯一入口 = 左侧栏）----
  const trigger2 = await page.waitForSelector('button[aria-haspopup="dialog"]', { timeout: 15000 }).catch(() => null);
  if (trigger2) {
    await trigger2.click();
    await sleep(2000);
  }
  const settingsNav = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]') || document.body;
    return [...dialog.querySelectorAll("button, [role=button], a")].map((el) => el.textContent.trim());
  });
  ok(
    !settingsNav.includes("TWb 检视器") && !settingsNav.includes("TWb Viewer"),
    "设置中不再出现插件入口（唯一入口为左侧栏）"
  );
  await page.keyboard.press("Escape");
  await sleep(1500);
  ok(
    await page.evaluate(() => !!document.querySelector(".twb-root--panel") && !document.querySelector(".twb-root--section")),
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
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[1];
      if (b) b.click();
    });
    await sleep(6000);
    const all = await page.evaluate(() => document.querySelectorAll(".twb-root--panel .ln-node").length);
    ok(all > 1200, `大图全量渲染（${all} 节点）`);

    // 聚焦模式切回「自动」（前面的断言把它设成了「全部」，面板不卸载会保留该状态）
    await page.evaluate(() => {
      const segs = [...document.querySelectorAll(".twb-root--panel .focus-seg button")];
      const b = segs[0];
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
      const segs = [...document.querySelectorAll(".twb-root--panel .focus-seg button")];
      const b = segs[segs.length - 1];
      if (b) b.click();
    });
    await sleep(4000);
    const back = await page.evaluate(() => document.querySelectorAll(".twb-root--panel .ln-node").length);
    ok(back === all, `切「全部」恢复全量渲染（${back} 节点）`);
  }

  // ---- 中英切换：在设置里真实切换宿主语言，插件 UI 应随之切换 ----
  {
    // 语言行：button[aria-haspopup="menu"]（文本为当前语言）→ 菜单项 role="menuitem"
    const openLanguageMenu = () =>
      page.evaluate(() => {
        const btn = [...document.querySelectorAll('[role="dialog"] button[aria-haspopup="menu"]')].find((b) =>
          /^(English|中文|简体中文|System|跟随系统)$/i.test((b.textContent || "").trim())
        );
        if (!btn) return false;
        btn.click();
        return true;
      });
    const chooseLanguage = (labelRe) =>
      page.evaluate((src) => {
        const re = new RegExp(src, "i");
        const item = [...document.querySelectorAll('[role="menuitem"]')].find((el) =>
          re.test((el.textContent || "").trim())
        );
        if (!item) return null;
        item.click();
        return (item.textContent || "").trim();
      }, labelRe);
    const readUi = () =>
      page.evaluate(() => ({
        panelLabel:
          document.querySelector('[aria-label="TWb 检视器"]')?.getAttribute("aria-label") ||
          document.querySelector('[aria-label="TWb Viewer"]')?.getAttribute("aria-label") ||
          null,
        title: document.querySelector(".twb-root--panel .brand h1")?.textContent?.trim() || "",
        subtitle: document.querySelector(".twb-root--panel .brand .sub")?.textContent?.trim() || "",
        tabs: [...document.querySelectorAll(".twb-root--panel .view-tabs button")].map((b) =>
          (b.textContent || "").trim()
        )
      }));

    // 打开设置（语言行在「通用」页）
    const trig = await page.$('button[aria-haspopup="dialog"]');
    if (trig) {
      await trig.click();
      await sleep(2500);
    }
    ok(await openLanguageMenu(), "设置里找到语言下拉（button[aria-haspopup=menu]）");

    const zhChosen = await chooseLanguage("^(中文|简体中文|Chinese)");
    ok(zhChosen !== null, `语言菜单可选「中文」（${zhChosen}）`);
    await sleep(2200);
    const uiZh = await readUi();
    ok(uiZh.panelLabel === "TWb 检视器", `左侧栏面板标签为中文（${uiZh.panelLabel}）`);
    ok(uiZh.tabs.join("/") === "布局图/引用关系", `页签为中文（${uiZh.tabs.join(" / ")}）`);
    ok(/仪表板布局检视器/.test(uiZh.title), `标题为中文（${uiZh.title}）`);

    ok(await openLanguageMenu(), "语言下拉可再次打开");
    const enChosen = await chooseLanguage("^English$");
    ok(enChosen !== null, `语言菜单可选「English」（${enChosen}）`);
    await sleep(2200);
    const uiEn = await readUi();
    ok(uiEn.panelLabel === "TWb Viewer", `左侧栏面板标签为英文（${uiEn.panelLabel}）`);
    ok(uiEn.tabs.join("/") === "Layout/Lineage", `页签为英文（${uiEn.tabs.join(" / ")}）`);
    ok(/Dashboard Inspector/.test(uiEn.title), `标题为英文（${uiEn.title}）`);
    ok(
      !/[\u4e00-\u9fa5]/.test(uiEn.title + uiEn.subtitle + uiEn.tabs.join("")),
      "英文界面无残留中文（标题/副标题/页签）"
    );

    // 收尾：切回中文并关闭设置
    await openLanguageMenu();
    await chooseLanguage("^(中文|简体中文|Chinese)");
    await sleep(1800);
    ok(
      await page.evaluate(() => !!document.querySelector('[aria-label="TWb 检视器"]')),
      "语言切回中文（面板标签恢复）"
    );
    await page.keyboard.press("Escape");
    await sleep(1500);
  }

  // ---- 控制台 ----
  const realErrors = consoleErrors.filter((e) => !e.includes("favicon") && !e.includes("net::ERR_"));
  ok(realErrors.length === 0, `控制台无报错${realErrors.length ? "：" + realErrors.join(" | ").slice(0, 300) : ""}`);
} finally {
  await browser.close();
}

if (failed) process.exit(1);
console.log("\n端到端测试全部通过 ✔");
