import { Parser } from 'expr-eval';

export function parseVariables(str) {
    let expr = Parser.parse(str);
    let vars = expr.variables();
    return { vars: vars, func: expr.toJSFunction(vars) };
}
