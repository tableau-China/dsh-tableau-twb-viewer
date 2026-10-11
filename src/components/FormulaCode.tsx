// 公式高亮：把 Tableau 公式分词后按 token 着色。

import { Fragment } from "react";
import { tokenize, tokenClass } from "../formula.ts";

/** 公式高亮组件 props。 */
export interface FormulaCodeProps {
  formula: string;
}


export function FormulaCode({ formula }: FormulaCodeProps) {
  if (!formula) return null;
  const tokens = tokenize(formula);
  return (
    <code className="formula-hl">
      {tokens.map((tok, i) => {
        if (tok.type === "ws") return <Fragment key={i}>{tok.value}</Fragment>;
        return (
          <span key={i} className={tokenClass(tok)}>
            {tok.value}
          </span>
        );
      })}
    </code>
  );
}
