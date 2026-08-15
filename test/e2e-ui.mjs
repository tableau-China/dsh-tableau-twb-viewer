// 真实浏览器端到端验证：启动测试 profile 的 Web 应用，完成（或跳过）首次引导，
// 打开设置页，确认「TWb 检视器」分区渲染成功、载入示例后布局图与引用关系图可用。
//
// 前置：测试 profile 已在 TWB_URL（默认 127.0.0.1:3199）运行，且服务端以
// SSH_CONNECTION=1 启动（强制 browse 目录选择器，便于无头环境自动化）。

import puppeteer from "puppeteer-core";

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
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push("pageerror: " + err.message));

const ok = (cond, label) => {
  if (cond) console.log("✓ " + label);
  else {
    console.error("✗ " + label);
    process.exitCode = 1;
  }
};

try {
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(5000);

  // ---- 关闭模型配置引导弹窗（如存在；须用真实鼠标点击）----
  const dismissModal = async () => {
    const handle = await page.evaluateHandle(() => {
      const b = [...document.querySelectorAll('[role="dialog"] button')].find((x) => /Configure later/.test(x.textContent || ""));
      return b || null;
    });
    const el = handle.asElement();
    if (!el) return false;
    const box = await el.boundingBox();
    if (!box) return false;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await sleep(2000);
    return true;
  };
  await dismissModal();

  // ---- 首次引导（仅当出现 Choose workspace 时执行）----
  const needsOnboarding = await page.evaluate(() =>
    document.body.innerText.includes("Choose workspace")
  );
  if (needsOnboarding) {
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("button")].find((x) => (x.textContent || "").includes("Choose workspace"));
      if (b) b.click();
    });
    const pathBox = await page.waitForSelector('textarea[placeholder="Choose a workspace to start"]', { timeout: 15000 });
    await pathBox.type(WORKSPACE_PATH);
    await page.keyboard.press("Enter");
    await sleep(2500);
    await page.evaluate(() => {
      const b = [...document.querySelectorAll("button")].find((x) => (x.textContent || "").trim() === "Open");
      if (b) b.click();
    });
    await sleep(2500);
    await page.evaluate(async () => {
      const clickT = (t) => {
        const b = [...document.querySelectorAll("button")].find((x) => (x.textContent || "").trim() === t || x.textContent.includes(t));
        if (b) {
          b.click();
          return true;
        }
        return false;
      };
      for (let i = 0; i < 8; i++) {
        if (clickT("Standard mode")) {
          await new Promise((r) => setTimeout(r, 600));
          continue;
        }
        if (clickT("Save and continue")) {
          await new Promise((r) => setTimeout(r, 1500));
          continue;
        }
        if (clickT("Configure later")) {
          await new Promise((r) => setTimeout(r, 1500));
          continue;
        }
        break;
      }
    });
    await sleep(4000);
  }
  const onboarded = await page.evaluate(() => !document.body.innerText.includes("Choose workspace"));
  ok(onboarded, "进入主界面（引导完成或已引导过）");
  await sleep(3000);

  // ---- 打开设置 ----
  const trigger = await page.waitForSelector('button[aria-haspopup="dialog"]', { timeout: 15000 }).catch(() => null);
  ok(!!trigger, "设置触发器存在");
  if (trigger) {
    await trigger.click();
    await sleep(2000);
  }

  // ---- 设置页出现「TWb 检视器」导航项并点击 ----
  const navClicked = await page.evaluate(() => {
    const items = [...document.querySelectorAll("button, [role=button], a")];
    const hit = items.find((el) => el.textContent.trim() === "TWb 检视器");
    if (hit) {
      hit.click();
      return true;
    }
    return false;
  });
  ok(navClicked, "设置页出现「TWb 检视器」导航项并点击");
  await sleep(2000);

  // ---- 检视器面板渲染 ----
  const welcome = await page.evaluate(() =>
    document.body.innerText.includes("Tableau .twb 仪表板布局检视器")
  );
  ok(welcome, "TWb 检视器面板已渲染（标题可见）");

  // ---- 载入示例 ----
  const sampleClicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")];
    const hit = btns.find((b) => b.textContent.includes("载入示例"));
    if (hit) {
      hit.click();
      return true;
    }
    return false;
  });
  ok(sampleClicked, "「载入示例」可点击");
  await sleep(3500);

  const loaded = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      summary: text.includes("仪表板") && text.includes("数据源"),
      layoutCanvas: !!document.querySelector(".twb-root .canvas-viewport svg"),
      metaPanel: !!document.querySelector(".twb-root .meta-panel"),
      lineageTab: [...document.querySelectorAll(".twb-root .view-tabs button")].some((b) => b.textContent.includes("引用关系"))
    };
  });
  ok(loaded.summary, "示例解析完成（概要栏可见）");
  ok(loaded.layoutCanvas, "布局图 SVG 已渲染");
  ok(loaded.metaPanel, "Metadata 面板已渲染");
  ok(loaded.lineageTab, "「引用关系」标签存在");

  // ---- 引用关系视图 ----
  const switched = await page.evaluate(() => {
    const btns = [...document.querySelectorAll(".twb-root .view-tabs button")];
    const hit = btns.find((b) => b.textContent.includes("引用关系"));
    if (hit) {
      hit.click();
      return true;
    }
    return false;
  });
  await sleep(2500);
  const lineage = await page.evaluate(() => ({
    svg: !!document.querySelector(".twb-root .lineage-svg"),
    nodes: document.querySelectorAll(".twb-root .ln-node").length,
    edges: document.querySelectorAll(".twb-root .ln-edge").length,
    picker: !!document.querySelector(".twb-root .lineage-picker")
  }));
  ok(switched, "切换到「引用关系」视图");
  ok(lineage.svg && lineage.picker, "引用关系图渲染（SVG + 字段选择器）");
  ok(lineage.nodes > 0 && lineage.edges > 0, `图内容: ${lineage.nodes} 节点 / ${lineage.edges} 边`);

  // ---- 点击节点 -> 详情面板 ----
  const detail = await page.evaluate(() => {
    const node = document.querySelector(".twb-root .ln-node");
    if (!node) return false;
    node.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    return true;
  });
  await sleep(800);
  const detailShown = await page.evaluate(() => !!document.querySelector(".twb-root .detail-body"));
  ok(detail && detailShown, "点击节点后详情面板出现（上下游血缘）");

  // ---- 全屏模式 ----
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
      nodes: document.querySelectorAll(".twb-root .ln-node").length,
      header: document.body.innerText.includes("✕ 退出全屏")
    };
  });
  ok(fsState.present, "全屏覆盖层出现");
  ok(fsState.fixed, "全屏覆盖层为 position:fixed");
  ok(fsState.covers, "全屏覆盖层铺满视口");
  ok(fsState.nodes === lineage.nodes, `全屏后关系图仍渲染（${fsState.nodes} 节点，状态未丢失）`);
  ok(fsState.header, "「✕ 退出全屏」按钮在头部");

  // Esc 退出全屏（会同时关闭设置弹窗——弹窗自带 Esc 行为）
  await page.keyboard.press("Escape");
  await sleep(1000);
  const exited = await page.evaluate(() => !document.querySelector(".twb-root.twb-fullscreen"));
  ok(exited, "Esc 退出全屏");

  // 重新打开设置：解析结果应被恢复（持久化），无需重新上传
  const trig2 = await page.waitForSelector('button[aria-haspopup="dialog"]', { timeout: 10000 }).catch(() => null);
  ok(!!trig2, "重新打开设置");
  if (trig2) {
    await trig2.click();
    await sleep(1500);
  }
  const nav2 = await page.evaluate(() => {
    const items = [...document.querySelectorAll("button, [role=button], a")];
    const hit = items.find((el) => el.textContent.trim() === "TWb 检视器");
    if (hit) {
      hit.click();
      return true;
    }
    return false;
  });
  ok(nav2, "重新进入「TWb 检视器」");
  await sleep(1500);
  const restored = await page.evaluate(() => ({
    nodes: document.querySelectorAll(".twb-root .ln-node").length,
    activeTab: [...document.querySelectorAll(".twb-root .view-tabs button")].find((b) => b.className.includes("active"))?.textContent,
    summary: document.body.innerText.includes("仪表板")
  }));
  ok(restored.nodes === lineage.nodes, `重开后关系图已恢复（${restored.nodes} 节点）`);
  ok(restored.activeTab === "引用关系", `视图已恢复（${restored.activeTab}）`);

  // ---- 控制台无错误 ----
  const realErrors = consoleErrors.filter(
    (e) => !e.includes("favicon") && !e.includes("net::ERR_")
  );
  ok(realErrors.length === 0, `控制台无报错${realErrors.length ? "：" + realErrors.join(" | ").slice(0, 300) : ""}`);
} finally {
  await browser.close();
}
