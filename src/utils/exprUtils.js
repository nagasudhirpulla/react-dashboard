import { Parser } from 'expr-eval';

export function parseVariables(str) {
    let expr = Parser.parse(str);
    let vars = expr.variables();
    return { expr: expr, vars: vars, func: expr.toJSFunction(vars) };
}

export function replaceOperators(strArray, replacerStr) {
    for (let i = 0; i < strArray.length; i++) {
        strArray[i] = replaceOperator(strArray[i], replacerStr);
    }
    return strArray;
}

export function replaceOperator(str, replacerStr) {
    let mathOperators = '+-*/%?'.split('');
    for (let i = 0; i < mathOperators.length; i++) {
        str = str.replace(mathOperators[i], replacerStr);
    }
    return str;
}