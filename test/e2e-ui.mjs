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
    // 先点「稍后配置」这类关闭型按钮："继续" 是"保存并继续"的子串，
    // 若先匹配会一直点不开弹窗（真实踩过的坑）
    if (await clickButtonText(["Configure later", "稍后配置", "Skip", "跳过", "Later", "稍后"])) continue;
    if (await clickButtonText(["Continue", "继续"])) continue;
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
    meta: !!document.querySelector(".twb-root .wb-panel"),
    zones: document.querySelectorAll(".twb-root .canvas-viewport svg rect").length,
    fileName: document.querySelector(".twb-root--panel .summary-bar .sf")?.textContent || ""
  }));
  ok(panel.title, "检视器面板已渲染");
  ok(panel.zones > 5, `布局图已渲染（${panel.zones} 个 zone）`);
  ok(panel.meta, "右侧工作簿面板已渲染（仪表板 / 工作表）");
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
    ok(uiZh.tabs.join("/") === "布局图/引用关系/数据模型", `页签为中文（${uiZh.tabs.join(" / ")}）`);
    ok(/仪表板布局检视器/.test(uiZh.title), `标题为中文（${uiZh.title}）`);

    ok(await openLanguageMenu(), "语言下拉可再次打开");
    const enChosen = await chooseLanguage("^English$");
    ok(enChosen !== null, `语言菜单可选「English」（${enChosen}）`);
    await sleep(2200);
    const uiEn = await readUi();
    ok(uiEn.panelLabel === "TWb Viewer", `左侧栏面板标签为英文（${uiEn.panelLabel}）`);
    ok(uiEn.tabs.join("/") === "Layout/Lineage/Data model", `页签为英文（${uiEn.tabs.join(" / ")}）`);
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

  // ---- 右侧栏宽度一致 + 引用关系不再滚轮缩放 ----
  {
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[0];
      if (b) b.click();
    });
    await sleep(1500);
    const layoutW = await page.evaluate(() =>
      Math.round(document.querySelector(".twb-root--panel .right")?.getBoundingClientRect().width || 0)
    );
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[1];
      if (b) b.click();
    });
    await sleep(2000);
    const lineageW = await page.evaluate(() =>
      Math.round(document.querySelector(".twb-root--panel .lineage-detail")?.getBoundingClientRect().width || 0)
    );
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[2];
      if (b) b.click();
    });
    await sleep(2000);
    const dmW = await page.evaluate(() =>
      Math.round(document.querySelector(".twb-root--panel .dm-detail")?.getBoundingClientRect().width || 0)
    );
    ok(
      layoutW > 0 && layoutW === lineageW && lineageW === dmW,
      `三个右侧栏宽度一致（布局 ${layoutW} / 引用 ${lineageW} / 数据模型 ${dmW}）`
    );

    // 数据模型右栏内容不再被挤扁
    const dmCramped = await page.evaluate(() => {
      const title = document.querySelector(".twb-root--panel .dm-detail-title");
      if (!title) return null;
      const r = title.getBoundingClientRect();
      return { h: Math.round(r.height), w: Math.round(r.width) };
    });
    ok(dmCramped === null || dmCramped.w > 200, `数据模型详情标题有正常宽度（${JSON.stringify(dmCramped)}）`);

    // 滚轮不再缩放
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[1];
      if (b) b.click();
    });
    await sleep(2000);
    const before = await page.evaluate(() =>
      document.querySelector(".twb-root--panel .lineage-svg g[transform]")?.getAttribute("transform") || ""
    );
    await page.evaluate(() => {
      const svg = document.querySelector(".twb-root--panel .lineage-svg");
      if (svg) {
        svg.dispatchEvent(new WheelEvent("wheel", { deltaY: -240, bubbles: true, cancelable: true }));
        svg.dispatchEvent(new WheelEvent("wheel", { deltaY: -240, bubbles: true, cancelable: true }));
      }
    });
    await sleep(900);
    const after = await page.evaluate(() =>
      document.querySelector(".twb-root--panel .lineage-svg g[transform]")?.getAttribute("transform") || ""
    );
    ok(before !== "" && before === after, `滚轮不再改变缩放（${after.slice(0, 34)}…）`);
  }

  // ---- 布局图右栏：仪表板列表 + 当前仪表板的工作表（点击高亮） ----
  {
    // 前面的用例把视图停在「引用关系」，先回到「布局图」
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[0];
      if (b) b.click();
    });
    await sleep(1800);
    const wb = await page.evaluate(() => ({
      present: !!document.querySelector(".twb-root--panel .wb-panel"),
      dashboards: document.querySelectorAll(".twb-root--panel .wb-section:nth-of-type(1) .wb-item").length,
      sheets: document.querySelectorAll(".twb-root--panel .wb-sheet").length,
      activeName: document.querySelector(".twb-root--panel .wb-item.active .wb-item-name")?.textContent?.trim() || "",
      oldTabs: document.querySelectorAll(".twb-root--panel .meta-tabs, .twb-root--panel .field-table").length
    }));
    ok(wb.present, "布局图右栏为工作簿面板（仪表板 / 工作表）");
    ok(wb.dashboards >= 6, `仪表板列表 ${wb.dashboards} 项`);
    ok(wb.sheets > 0 && wb.sheets < 10, `工作表只列当前仪表板的 ${wb.sheets} 个（不是全部 21 个）`);
    ok(wb.oldTabs === 0, "右栏不再有数据源总览/字段/计算字段等旧页签");
    console.log(`  右栏: ${wb.dashboards} 个仪表板 · 当前「${wb.activeName}」含 ${wb.sheets} 个工作表`);

    // 点击工作表 → 左侧布局图高亮对应 zone
    const sheetName = await page.evaluate(() => {
      const b = document.querySelector(".twb-root--panel .wb-sheet");
      if (!b) return null;
      const n = b.querySelector(".wb-item-name")?.textContent?.trim() || "";
      b.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      return n;
    });
    await sleep(1500);
    const hl = await page.evaluate(() => ({
      active: !!document.querySelector(".twb-root--panel .wb-sheet.highlight"),
      thick: [...document.querySelectorAll(".twb-root--panel .canvas-viewport svg rect")].filter(
        (r) => r.getAttribute("stroke-width") === "3"
      ).length
    }));
    ok(hl.active, `点击工作表「${sheetName}」在右栏标记为高亮`);
    ok(hl.thick > 0, `左侧布局图有 ${hl.thick} 个 zone 被高亮（描边加粗）`);

    // 再点一次取消高亮
    await page.evaluate(() => {
      const b = document.querySelector(".twb-root--panel .wb-sheet.highlight");
      if (b) b.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(1200);
    ok(
      await page.evaluate(() => document.querySelectorAll(".twb-root--panel .wb-sheet.highlight").length === 0),
      "再次点击取消高亮"
    );

    // 切换仪表板后，工作表列表随之变化
    const switched = await page.evaluate(() => {
      const items = [...document.querySelectorAll(".twb-root--panel .wb-section:nth-of-type(1) .wb-item")];
      const target = items[1];
      if (!target) return null;
      const name = target.querySelector(".wb-item-name")?.textContent?.trim() || "";
      target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      return name;
    });
    await sleep(1800);
    const afterSwitch = await page.evaluate(() => ({
      activeName: document.querySelector(".twb-root--panel .wb-item.active .wb-item-name")?.textContent?.trim() || "",
      sheets: [...document.querySelectorAll(".twb-root--panel .wb-sheet .wb-item-name")].map((e) => e.textContent.trim()),
      canvasTitle: document.querySelector(".twb-root--panel .dash-title")?.textContent?.trim() || ""
    }));
    ok(
      switched !== null && afterSwitch.activeName === switched,
      `点击仪表板可切换（${switched} → 画布「${afterSwitch.canvasTitle}」）`
    );
    ok(
      afterSwitch.sheets.length > 0 && afterSwitch.sheets.length !== wb.sheets,
      `工作表列表随仪表板变化（${afterSwitch.sheets.join(" / ")}）`
    );
  }

  // ---- 批 4：数据模型（表级 join / 基数）与自定义 SQL ----
  {
    const { makeTwb } = await import("./lib/synthetic-twb.mjs");
    const { writeFileSync } = await import("node:fs");
    const dmPath = "/tmp/twb-datamodel-e2e.twb";
    writeFileSync(
      dmPath,
      makeTwb({ datasources: 2, fields: 12, worksheets: 3, zones: 2, joins: 3, customSql: 1, formatPadding: true })
    );

    // 布局图例（zone 细分类型）——需先回到「布局图」页签
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[0];
      if (b) b.click();
    });
    await sleep(1500);
    const legend = await page.evaluate(() => {
      const el = document.querySelector(".twb-root--panel .zone-legend");
      return { present: !!el, items: el ? el.querySelectorAll(".zl-item").length : 0 };
    });
    ok(legend.present && legend.items >= 6, `布局图例已渲染（${legend.items} 类 zone）`);

    // 内置示例走的是新版对象模型：示例-超市 的 3 张表应有 2 条 relationship
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[2];
      if (b) b.click();
    });
    await sleep(2000);
    const sampleDm = await page.evaluate(() => {
      const nodeBox = (label) => {
        const g = [...document.querySelectorAll(".twb-root--panel .dm-node")].find(
          (n) => (n.querySelector(".dm-node-title")?.textContent || "").trim() === label
        );
        if (!g) return null;
        const r = g.getBoundingClientRect();
        return { centerY: Math.round((r.top + r.bottom) / 2) };
      };
      const paths = [...document.querySelectorAll(".twb-root--panel .dm-link")];
      return {
        nodes: document.querySelectorAll(".twb-root--panel .dm-node").length,
        edges: document.querySelectorAll(".twb-root--panel .dm-edge").length,
        curves: paths.filter((p) => (p.getAttribute("d") || "").includes("C")).length,
        textLabels: document.querySelectorAll(".twb-root--panel .dm-edge-label, .twb-root--panel .dm-edge-badge").length,
        order: nodeBox("订单"),
        person: nodeBox("人员"),
        ret: nodeBox("退货")
      };
    });
    ok(sampleDm.nodes === 5, `示例数据模型：5 张表（实际 ${sampleDm.nodes}）`);
    ok(sampleDm.edges === 2, `示例数据模型：2 条对象模型关系（实际 ${sampleDm.edges}）`);
    ok(sampleDm.curves === 2, `关系以平衡弧线绘制（${sampleDm.curves}/2 条为三次贝塞尔）`);
    ok(sampleDm.textLabels === 0, "弧线上不再有「关系」文字标签/徽标");
    {
      // 子表（人员 / 退货）应围绕父表（订单）的垂直中心对齐
      const want = sampleDm.order?.centerY ?? 0;
      const kidsCenter = ((sampleDm.person?.centerY ?? 0) + (sampleDm.ret?.centerY ?? 0)) / 2;
      ok(
        sampleDm.order && sampleDm.person && sampleDm.ret && Math.abs(kidsCenter - want) <= 4,
        `右侧子表围绕父表中心对齐（父 ${want} / 子组中心 ${Math.round(kidsCenter)}）`
      );
    }

    // ---- 参数：在「引用关系」里是独立分类，值按工作簿格式显示 ----
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[1];
      if (b) b.click();
    });
    await sleep(2000);
    const paramFilter = await page.evaluate(() => {
      const tabs = [...document.querySelectorAll(".twb-root--panel .rt")];
      const b = tabs.find((x) => /参数|Parameter/.test(x.textContent || ""));
      if (!b) return { found: false };
      b.click();
      return { found: true };
    });
    ok(paramFilter.found, "「引用关系」筛选里有独立的「参数」分类（不在维度/度量里）");
    await sleep(1500);
    const paramPicker = await page.evaluate(() =>
      [...document.querySelectorAll(".twb-root--panel .picker-item")].map((e) => ({
        label: (e.querySelector("div")?.textContent || e.textContent || "").trim(),
        cat: e.getAttribute("class") || ""
      }))
    );
    ok(paramPicker.length === 6, `参数分类下恰好 6 个参数（实际 ${paramPicker.length}）`);
    ok(
      paramPicker.every((p) => p.cat.includes("cat-parameter")),
      "参数节点使用独立的参数配色（cat-parameter）"
    );
    // 选中「流失率」查看格式化后的值
    await page.evaluate(() => {
      const b = [...document.querySelectorAll(".twb-root--panel .picker-item")].find((e) =>
        /流失率/.test(e.textContent || "")
      );
      if (b) b.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(1500);
    const paramDetail = await page.evaluate(() => {
      const el = document.querySelector(".twb-root--panel .detail-param");
      return {
        present: !!el,
        value: el?.querySelector(".dp-num")?.textContent?.trim() || "",
        text: el?.innerText.replace(/\n/g, " | ") || ""
      };
    });
    ok(paramDetail.present, "参数节点详情展示参数信息块");
    ok(paramDetail.value === "6.40%", `流失率显示为 6.40%（实际：${paramDetail.value}）`);
    ok(!/0\.064000000000000001/.test(paramDetail.value), "显示值不含 float64 往返噪声");
    ok(/原始值/.test(paramDetail.text), "同时保留原始值便于核对");
    console.log(`  参数分类: ${paramPicker.length} 个 · 流失率 = ${paramDetail.value}`);

    // 维度/度量分类不应混入参数
    const dimOnly = await page.evaluate(() => {
      const tabs = [...document.querySelectorAll(".twb-root--panel .rt")];
      const b = tabs.find((x) => /维度|Dimension/.test(x.textContent || ""));
      if (b) b.click();
      return true;
    });
    await sleep(1200);
    const dimCats = await page.evaluate(() =>
      [...document.querySelectorAll(".twb-root--panel .picker-item")].map((e) => e.getAttribute("class") || "")
    );
    ok(
      dimOnly && dimCats.length > 0 && !dimCats.some((c) => c.includes("cat-parameter")),
      `维度分类里没有参数（${dimCats.length} 项）`
    );

    // 上传含 join 与自定义 SQL 的合成工作簿
    const dmInput = await page.$('.twb-root--panel input[type="file"]');
    await dmInput.uploadFile(dmPath);
    await sleep(4000);

    // 切到「数据模型」页签（第三个）
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root--panel .view-tabs button")[2];
      if (b) b.click();
    });
    await sleep(2500);
    const dmView = await page.evaluate(() => ({
      view: !!document.querySelector(".twb-root--panel .datamodel-view"),
      nodes: document.querySelectorAll(".twb-root--panel .dm-node").length,
      edges: document.querySelectorAll(".twb-root--panel .dm-edge").length,
      hitAreas: document.querySelectorAll(".twb-root--panel .dm-link-hit").length,
      hasSqlNode: !!document.querySelector(".twb-root--panel .dm-node.dm-custom-sql"),
      stats: document.querySelector(".twb-root--panel .dm-toolbar")?.innerText.replace(/\n/g, " ").slice(0, 70) || ""
    }));
    ok(dmView.view, "「数据模型」视图已渲染");
    ok(dmView.nodes === 5, `表/自定义 SQL 节点 5 个（实际 ${dmView.nodes}）`);
    ok(dmView.edges === 3, `连接弧线 3 条（实际 ${dmView.edges}）`);
    ok(dmView.hitAreas === 3, `弧线带可点击命中层（${dmView.hitAreas}）`);
    ok(dmView.hasSqlNode, "自定义 SQL 作为独立节点呈现");
    console.log(`  数据模型: ${dmView.stats}`);

    // 数据模型右栏：自定义 SQL 常驻清单 + SQL 过程
    const dmSql = await page.evaluate(() => {
      const list = [...document.querySelectorAll(".twb-root--panel .dm-sql-item")];
      return {
        items: list.length,
        firstSelected: list[0]?.getAttribute("class")?.includes("active") || false,
        body: document.querySelector(".twb-root--panel .dm-sql")?.textContent || "",
        hasCopy: !!document.querySelector(".twb-root--panel .sql-copy"),
        title: document.querySelector(".twb-root--panel .dm-detail-title")?.textContent?.trim() || ""
      };
    });
    ok(dmSql.items === 1, `数据模型右栏列出 ${dmSql.items} 段自定义 SQL`);
    ok(dmSql.firstSelected, "进入数据模型即默认选中自定义 SQL（右侧直接给出过程）");
    ok(/SELECT/.test(dmSql.body), "SQL 过程全文可见");
    ok(dmSql.hasCopy, "SQL 提供复制按钮（交付核对用）");
    console.log(`  自定义 SQL: ${dmSql.items} 段 · 详情标题「${dmSql.title}」`);

    // 选中自定义 SQL 节点：右侧展示数据源与连接信息
    await page.evaluate(() => {
      const item = document.querySelector(".twb-root--panel .dm-sql-item");
      if (item) item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(1200);
    const sqlNodeDetail = await page.evaluate(() => document.querySelector(".twb-root--panel .dm-detail")?.innerText || "");
    ok(/数据源|Datasource/.test(sqlNodeDetail), "自定义 SQL 节点详情含所属数据源");

    // 点弧线 → 详情显示连接类型、ON 条件与基数说明
    await page.evaluate(() => {
      const hit = document.querySelector(".twb-root--panel .dm-link-hit");
      if (hit) hit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(1200);
    const edgeDetail = await page.evaluate(() => document.querySelector(".twb-root--panel .dm-detail")?.innerText || "");
    ok(/内连接|左连接|右连接|Inner|Left|Right/.test(edgeDetail), "详情面板显示连接类型");
    ok(/\[t0\]\.\[id\]/.test(edgeDetail), "连接详情显示 ON 条件表达式");
    ok(/基数|Cardinality/.test(edgeDetail), "连接详情标注基数（文件未记录时给出说明）");

  }

  // ---- 旧形状缓存必须被拒绝（回归：曾导致 z.format 取值抛 TypeError 白屏） ----
  {
    await page.evaluate(() => {
      // 0.5.0 之前的模型形状：zone 没有 shape/format，数据源没有 dataModel
      const legacy = {
        model: {
          dashboards: [
            {
              name: "legacy",
              width: 100,
              height: 100,
              zones: [{ x: 0, y: 0, w: 10, h: 10, type: "", name: "", text: "", kind: "container", children: [] }]
            }
          ],
          worksheets: [],
          datasources: [{ caption: "旧数据源", name: null, connection: null, columns: [], groups: [] }]
        },
        dashIdx: 0,
        view: "layout",
        fileName: "legacy-cache.twb"
      };
      sessionStorage.setItem("dsh-tableau-twb-viewer.state.v2", JSON.stringify(legacy));
    });
    await page.reload({ waitUntil: "networkidle2" });
    await sleep(5000);
    // 重新进入面板（reload 后回到会话视图）
    for (let round = 0; round < 5; round++) {
      const opened = await page.evaluate(() => {
        const entry = document.querySelector('[aria-label="TWb 检视器"], [aria-label="TWb Viewer"]');
        if (entry) entry.click();
        const btn = [...document.querySelectorAll('[role="dialog"] button')].find((b) =>
          /稍后配置|Configure later|保存并继续|Continue/.test(b.textContent || "")
        );
        if (btn) btn.click();
        return !!entry;
      });
      await sleep(2500);
      if (opened && (await page.evaluate(() => !!document.querySelector(".twb-root--panel")))) break;
    }
    const legacyState = await page.evaluate(() => ({
      showsLegacy: document.body.innerText.includes("legacy-cache.twb"),
      renders: !!document.querySelector(".twb-root--panel .canvas-viewport svg, .twb-root--panel .welcome"),
      crashed: /Cannot read propert|TypeError/.test(document.body.innerText)
    }));
    ok(!legacyState.showsLegacy, "旧形状缓存被拒（未把 legacy-cache.twb 当成有效状态）");
    ok(legacyState.renders, "拒绝旧缓存后回落到内置示例并正常渲染（未白屏）");
    ok(!legacyState.crashed, "无渲染异常");
  }

  // ---- 控制台 ----
  const realErrors = consoleErrors.filter((e) => !e.includes("favicon") && !e.includes("net::ERR_"));
  ok(realErrors.length === 0, `控制台无报错${realErrors.length ? "：" + realErrors.join(" | ").slice(0, 300) : ""}`);
} finally {
  await browser.close();
}

if (failed) process.exit(1);
console.log("\n端到端测试全部通过 ✔");
