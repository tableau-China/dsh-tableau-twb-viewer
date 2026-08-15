// Tableau 计算字段公式的词法高亮：分词器 + 关键字/函数表。
// 忠实移植自原始实现的 vp / Pc 与 pp / mp / hp 常量。

/** Tableau 公式关键字。 */
export const KEYWORDS = new Set([
  "IF", "THEN", "ELSE", "ELSEIF", "END", "CASE", "WHEN", "AND", "OR", "NOT",
  "IN", "NULL", "TRUE", "FALSE", "BETWEEN", "LIKE", "IS", "AS"
]);

/** Tableau 常用函数。 */
export const FUNCTIONS = new Set([
  "SUM", "AVG", "MIN", "MAX", "COUNT", "COUNTD", "ATTR", "MEDIAN", "STDEV",
  "STDEVP", "VAR", "VARP", "ZN", "MODE", "ABS", "ROUND", "FLOOR", "CEILING",
  "CEIL", "SIGN", "SQRT", "POWER", "EXP", "LN", "LOG", "IFNULL", "ISNULL",
  "NULLIF", "IIF", "RUNNING_SUM", "RUNNING_AVG", "RUNNING_MIN", "RUNNING_MAX",
  "WINDOW_SUM", "WINDOW_AVG", "WINDOW_MIN", "WINDOW_MAX", "LOOKUP",
  "PREVIOUS_VALUE", "RANK", "RANK_UNIQUE", "RANK_DENSE", "RANK_MODIFIED",
  "INDEX", "SIZE", "FIRST", "LAST", "TOTAL", "DATE", "DATEPARSE", "DATENAME",
  "DATEPART", "DATEADD", "DATEDIFF", "DATETRUNC", "YEAR", "QUARTER", "MONTH",
  "DAY", "WEEK", "HOUR", "MINUTE", "SECOND", "TODAY", "NOW", "MAKEDATE",
  "MAKEDATETIME", "MAKETIME", "ISOYEAR", "LEFT", "RIGHT", "MID", "LEN",
  "CONTAINS", "FIND", "FINDNTH", "REPLACE", "REGEXP_EXTRACT", "REGEXP_MATCH",
  "REGEXP_REPLACE", "SPLIT", "UPPER", "LOWER", "TRIM", "LTRIM", "RTRIM",
  "SPACE", "ASCII", "CHAR", "STRING", "FLOAT", "INT", "BOOL", "DATETIME"
]);

/** 词法规则（按优先级顺序）。 */
const TOKEN_RULES = [
  ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
  ["string", /'(?:[^'\\]|\\.)*'/],
  ["field", /\[[^\]]*\]/],
  ["number", /\d+(?:\.\d+)?/],
  ["ident", /[A-Za-z_][A-Za-z0-9_]*/],
  ["ws", /\s+/],
  ["other", /[^\s]/]
];

/**
 * 把公式切成 token 列表。
 * @param {string} formula
 * @returns {{type: string, value: string}[]}
 */
export function tokenize(formula) {
  const tokens = [];
  let rest = formula;
  while (rest.length > 0) {
    let matched = false;
    for (const [type, re] of TOKEN_RULES) {
      const m = re.exec(rest);
      if (m && m.index === 0) {
        tokens.push({ type, value: m[0] });
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: "other", value: rest[0] });
      rest = rest.slice(1);
    }
  }
  return tokens;
}

/** token 对应的 CSS 类名（fh-*）。 */
export function tokenClass(token) {
  switch (token.type) {
    case "comment":
      return "fh-comment";
    case "string":
      return "fh-string";
    case "field":
      return "fh-field";
    case "number":
      return "fh-number";
    case "ident": {
      const up = token.value.toUpperCase();
      if (KEYWORDS.has(up)) return "fh-kw";
      if (FUNCTIONS.has(up)) return "fh-fn";
      return "fh-ident";
    }
    default:
      return "fh-other";
  }
}
