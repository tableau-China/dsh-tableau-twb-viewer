// 生成 README 用的界面截图（assets/*.png）。
//
// 前置：./test/e2e-boot.sh 3199 已启动隔离实例，并用带 token 的 URL 调用：
//   TWB_URL="http://127.0.0.1:3199/?token=..." node test/screenshots.mjs
//
// 说明：截图前会断言关键 DOM 已渲染、截图后校验文件体积（避免输出空白图）。

import puppeteer from "puppeteer-core";
import { mkdirSync, statSync } from "node:fs";

const TARGET = process.env.TWB_URL || "http://127.0.0.1:3199";
const CHROME = process.env.TWB_CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = new URL("../assets/", import.meta.url).pathname;
const MIN_BYTES = 30 * 1024; // 空白图会远小于此值

mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--user-data-dir=/tmp/twb-shot-profile"]
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

/** 真实鼠标点击（React 弹窗拦截合成 click）。 */
const realClick = async (selectorFn, ...args) => {
  const handle = await page.evaluateHandle(selectorFn, ...args);
  const el = handle.asElement();
  if (!el) return false;
  const box = await el.boundingBox();
  if (!box) return false;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await sleep(1200);
  return true;
};

let failed = false;
/** 中文截图加 .zh 后缀（英文为默认名，供 README.md 引用）。 */
const LOCALE_SUFFIX = process.env.TWB_SHOT_LOCALE === 'zh' ? '.zh' : '';

const shot = async (name, assertReady) => {
  name = name + LOCALE_SUFFIX;
  const ready = await page.evaluate(assertReady);
  if (!ready) {
    console.error(`✗ ${name}: 界面未就绪，跳过`);
    failed = true;
    return;
  }
  const path = `${OUT}${name}.png`;
  await page.screenshot({ path });
  const size = statSync(path).size;
  const okSize = size > MIN_BYTES;
  console.log(`${okSize ? "✓" : "✗"} assets/${name}.png (${(size / 1024).toFixed(0)} KB)`);
  if (!okSize) failed = true;
};

try {
  await page.goto(TARGET, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(5000);

  // 引导：能点就点（中英双语按钮都认）
  const SKIP = ["Configure later", "Continue", "稍后配置", "保存并继续", "继续", "跳过"];
  for (let i = 0; i < 8; i++) {
    let clicked = false;
    for (const label of SKIP) {
      if (
        await realClick(
          (t) => [...document.querySelectorAll('[role="dialog"] button')].find((b) => (b.textContent || "").trim() === t) || null,
          label
        )
      ) {
        clicked = true;
        break;
      }
    }
    if (!clicked) break;
  }

  // 语言：默认英文（README.md 为英文首页）；TWB_SHOT_LOCALE=zh 出中文截图
  const LOCALE = process.env.TWB_SHOT_LOCALE === "zh" ? "zh" : "en";
  const wantLabel = LOCALE === "zh" ? /^(中文|简体中文|Chinese)$/i : /^English$/i;
  const langTrig = await page.$('button[aria-haspopup="dialog"]');
  if (langTrig) {
    await langTrig.click();
    await sleep(2500);
    const opened = await page.evaluate(() => {
      const btn = [...document.querySelectorAll('[role="dialog"] button[aria-haspopup="menu"]')].find((b) =>
        /^(English|中文|简体中文|System|跟随系统)$/i.test((b.textContent || "").trim())
      );
      if (!btn) return false;
      btn.click();
      return true;
    });
    if (opened) {
      await sleep(1200);
      await page.evaluate((src) => {
        const re = new RegExp(src, "i");
        const item = [...document.querySelectorAll('[role="menuitem"]')].find((el) => re.test((el.textContent || "").trim()));
        if (item) item.click();
      }, wantLabel.source);
      await sleep(2000);
    }
    await page.keyboard.press("Escape");
    await sleep(1500);
  }

  // 主入口：左侧栏面板行 → 主区整页（0.3.0 起的主路径）
  const entry = await page.$('[aria-label="TWb 检视器"], [aria-label="TWb Viewer"]');
  if (entry) {
    await entry.click();
    await sleep(3000);
  }

  // 等内置示例自动加载完成
  const loaded = await page.waitForSelector(".twb-root .canvas-viewport svg", { timeout: 25000 }).then(() => true).catch(() => false);
  if (!loaded) {
    const diag = await page.evaluate(() => ({
      hasRoot: !!document.querySelector(".twb-root"),
      hasPanel: !!document.querySelector(".twb-root--panel"),
      entryExists: !!document.querySelector('[aria-label="TWb 检视器"], [aria-label="TWb Viewer"]'),
      dialogs: [...document.querySelectorAll('[role="dialog"]')].length,
      bodyStart: document.body.innerText.slice(0, 160).replace(/\n/g, " | ")
    }));
    console.log("✗ 截图：检视器未加载", JSON.stringify(diag));
    throw new Error("viewer not loaded");
  }
  await sleep(2500);

  // 0) 入口与整页形态：左侧栏面板行 + 主区检视器（全屏之前拍摄）
  await shot("panel", () => !!document.querySelector(".twb-root--panel .canvas-viewport svg"));

  // 全屏（让其余截图聚焦插件本身）
  await page.evaluate(() => {
    const b = document.querySelector(".twb-root .fs-toggle");
    if (b) b.click();
  });
  await sleep(2000);

  // 1) 仪表板布局图
  await shot("layout", () => !!document.querySelector(".twb-root .canvas-viewport svg"));

  // 2) 字段引用关系（选中一个节点，展示上下游）
  await page.evaluate(() => {
    const b = document.querySelectorAll(".twb-root .view-tabs button")[1];
    if (b) b.click();
  });
  await sleep(2500);
  await page.evaluate(() => {
    const nodes = [...document.querySelectorAll(".twb-root .ln-node")];
    const target = nodes.find((n) => (n.getAttribute("class") || "").includes("ln-self")) || nodes[Math.floor(nodes.length / 2)];
    if (target) target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await sleep(1500);
  await shot("lineage", () => document.querySelectorAll(".twb-root .ln-node").length > 0);

  // 3) 工作簿右栏（仪表板列表 + 工作表列表）
  await page.evaluate(() => {
    const b = document.querySelectorAll(".twb-root .view-tabs button")[0];
    if (b) b.click();
  });
  await sleep(2000);
  // 点击第一个工作表 → 左侧布局图高亮，截图同时展示联动效果
  await page.evaluate(() => {
    const b = document.querySelector(".twb-root .wb-sheet");
    if (b) b.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await sleep(1500);
  await shot("workbook", () => !!document.querySelector(".twb-root .wb-sheet.highlight"));

  // 3.5) 参数（引用关系里的独立分类 + 按工作簿格式格式化的值）
  {
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root .view-tabs button")[1];
      if (b) b.click();
    });
    await sleep(2200);
    await page.evaluate(() => {
      const tabs = [...document.querySelectorAll(".twb-root .rt")];
      const b = tabs.find((x) => /参数|Parameter/.test(x.textContent || ""));
      if (b) b.click();
    });
    await sleep(1500);
    await page.evaluate(() => {
      const b = [...document.querySelectorAll(".twb-root .picker-item")].find((e) => /流失率/.test(e.textContent || ""));
      if (b) b.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(1500);
    await shot("parameters", () => !!document.querySelector(".twb-root .detail-param"));
  }

  // 4) 数据模型（表级 join + 基数）：上传合成的 join 夹具
  {
    const { makeTwb } = await import("./lib/synthetic-twb.mjs");
    const { writeFileSync } = await import("node:fs");
    const dmPath = "/tmp/twb-datamodel-shot.twb";
    writeFileSync(
      dmPath,
      makeTwb({ datasources: 2, fields: 14, worksheets: 4, zones: 3, joins: 3, customSql: 1, formatPadding: true })
    );
    const input = await page.$(".twb-root--panel input[type=file], .twb-root input[type=file]");
    if (input) await input.uploadFile(dmPath);
    await sleep(4000);

    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root .view-tabs button")[2];
      if (b) b.click();
    });
    await sleep(2500);
    // 选中一条连接，展示右侧详情
    await page.evaluate(() => {
      const hit = document.querySelector(".twb-root .dm-link-hit");
      if (hit) hit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(1200);
    await shot("datamodel", () => document.querySelectorAll(".twb-root .dm-node").length > 0);

    // 5) 自定义 SQL（数据模型右侧：清单 + 过程）
    await page.evaluate(() => {
      const b = document.querySelectorAll(".twb-root .view-tabs button")[2];
      if (b) b.click();
    });
    await sleep(2000);
    await page.evaluate(() => {
      const b = document.querySelector(".twb-root .dm-sql-item");
      if (b) b.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await sleep(1200);
    await shot("customsql", () => !!document.querySelector(".twb-root .dm-sql"))
  }
} finally {
  await browser.close();
}

if (failed) process.exit(1);
console.log("\n截图已生成到 assets/ ✔");
