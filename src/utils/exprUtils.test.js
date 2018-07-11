import { parseVariables } from './exprUtils'

it('tests the parseVariables function', () => {
    let k = 'x-y+z';
    let res = parseVariables(k);
    expect(res).not.toBeUndefined();
    expect(res.vars).not.toBeUndefined();
    expect(res.func).not.toBeUndefined();
    expect(res.vars).toEqual(['x', 'y', 'z']);
    expect(res.func(1, 10, 90)).toEqual(81);
    expect(res.expr.evaluate({ x: 1, y: 10, z: 90 })).toEqual(81);
    console.log(res.vars);
});