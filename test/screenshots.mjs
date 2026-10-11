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
const shot = async (name, assertReady) => {
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

  // 引导：能点就点
  for (let i = 0; i < 6; i++) {
    if (await realClick((t) => [...document.querySelectorAll('[role="dialog"] button')].find((b) => (b.textContent || "").includes(t)) || null, "Configure later")) continue;
    if (await realClick((t) => [...document.querySelectorAll("button")].find((b) => (b.textContent || "").includes(t)) || null, "Continue")) continue;
    break;
  }

  // 主入口：左侧栏面板行 → 主区整页（0.3.0 起的主路径）
  const entry = await page.$('[aria-label="TWb 检视器"]');
  if (entry) {
    await entry.click();
    await sleep(3000);
  }

  // 等内置示例自动加载完成
  await page.waitForSelector(".twb-root .canvas-viewport svg", { timeout: 25000 });
  await sleep(2500);

  // 0) 入口与整页形态：左侧栏面板行 + 主区检视器（全屏之前拍摄）
  await shot("panel", () => !!document.querySelector(".twb-root--panel .canvas-viewport svg"));

  // 全屏（让其余截图聚焦插件本身）
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".twb-root button")].find((x) => x.textContent.includes("全屏"));
    if (b) b.click();
  });
  await sleep(2000);

  // 1) 仪表板布局图
  await shot("layout", () => !!document.querySelector(".twb-root .canvas-viewport svg"));

  // 2) 字段引用关系（选中一个节点，展示上下游）
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".twb-root .view-tabs button")].find((x) => x.textContent.includes("引用关系"));
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

  // 3) Metadata（回到布局图，切到「计算字段」标签，突出公式高亮）
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".twb-root .view-tabs button")].find((x) => x.textContent.includes("布局图"));
    if (b) b.click();
  });
  await sleep(2000);
  await page.evaluate(() => {
    const b = [...document.querySelectorAll(".twb-root .meta-tabs button")].find((x) => x.textContent.includes("计算字段"));
    if (b) b.click();
  });
  await sleep(2000);
  await shot("metadata", () => !!document.querySelector(".twb-root .calc-list, .twb-root .calc-item"));
} finally {
  await browser.close();
}

if (failed) process.exit(1);
console.log("\n截图已生成到 assets/ ✔");
