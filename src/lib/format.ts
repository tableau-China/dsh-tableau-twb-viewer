// Tableau 数值格式化：把工作簿里以 float64 原样写入的值（如 0.064000000000000001）
// 还原成人类可读的形式，并尽量遵循工作簿自己的 default-format。
//
// 背景：Tableau 把参数当前值、区间端等写成 IEEE754 的最短往返表示，
// 例如 0.064 写成 0.064000000000000001、0.6 写成 0.59999999999999998。
// 直接照抄进 UI 就是「超长小数」——不是数据错误，而是显示问题。

/** 去掉 float64 往返噪声：0.064000000000000001 → 0.064；18.399999999999999 → 18.4。 */
export function stripFloatNoise(raw: string | number | null | undefined): number | null {
  if (raw === null || raw === undefined) return null;
  const text = typeof raw === "number" ? String(raw) : String(raw).trim();
  if (text === "") return null; // 空串不能当成 0（Number("") === 0）
  const n = Number(text);
  if (!Number.isFinite(n)) return null;
  // toPrecision(15)：float64 的第 16~17 位才是往返噪声，
  // 取 12 会把 1234567890123 这类 13 位整数改成 1234567890120（口径核对工具不能给错数）。
  const t = Number(n.toPrecision(15));
  return Number.isFinite(t) ? t : n;
}

/** 千分位 + 最多 6 位小数（去掉末尾 0）。 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(n);
}

/** default-format 里的百分比模式：p0% / p0.00% / 0.0% 等。 */
function percentDigits(fmt: string): number | null {
  // p0% / p0.00% / 0.00% / p —— Tableau 的百分比格式
  const m = /^[pP](\d*(?:\.\d+)?)%?$/.exec(fmt.trim()) || /^(\d+(?:\.\d+)?)%$/.exec(fmt.trim());
  if (!m) return null;
  const d = m[1];
  if (d === undefined || d === "") return 0;
  return d.includes(".") ? (d.split(".")[1] || "").length : Number(d);
}

/** 货币符号（按 Tableau 的 locale 代号给常见几种；未知时退回 ¥/$ 判断）。 */
function currencySymbol(fmt: string): string | null {
  if (!/^[cC]/.test(fmt.trim())) return null;
  if (/^[cC]2052/.test(fmt.trim())) return "¥"; // zh-CN
  if (/^[cC]1033/.test(fmt.trim())) return "$"; // en-US
  return "¥";
}

/**
 * 格式化参数当前值。
 * - 百分比格式（p0.00%）→ 6.40%
 * - 货币格式（C2052）→ ¥50,000
 * - 其余 → 去噪后的普通数字
 * - 非数值（字符串参数）→ 原样返回
 */
export function formatParameterValue(value: string | null | undefined, defaultFormat: string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "—";
  const raw = String(value);
  const num = stripFloatNoise(raw);
  if (num === null) return raw; // 字符串参数（如 ["名称"]）

  const fmt = (defaultFormat ?? "").trim();
  const pct = percentDigits(fmt);
  if (pct !== null) {
    return `${(num * 100).toFixed(pct)}%`;
  }
  const symbol = currencySymbol(fmt);
  if (symbol) {
    return `${symbol}${formatNumber(num)}`;
  }
  return formatNumber(num);
}

/** 区间文案（min ~ max，含步长）。
 *  stepLabel 由调用方传入（i18n），避免库函数里硬编码中文。 */
export function formatRange(
  range: { min: string | null; max: string | null; granularity: string | null } | null | undefined,
  stepLabel = "step"
): string | null {
  if (!range) return null;
  const min = stripFloatNoise(range.min);
  const max = stripFloatNoise(range.max);
  const step = stripFloatNoise(range.granularity);
  // 只有步长时也要显示（此前 min/max 都为空会整体丢弃）
  if (min === null && max === null && step === null) return null;
  const parts: string[] = [];
  if (min !== null || max !== null) {
    parts.push(`${min !== null ? formatNumber(min) : "—"} ~ ${max !== null ? formatNumber(max) : "—"}`);
  }
  if (step !== null) parts.push(`${stepLabel} ${formatNumber(step)}`);
  return parts.join(" · ");
}
