import {parseVariables} from './exprUtils'

it('tests the parseVariables function', () => {
    let k = 'x-y+z';
    let res = parseVariables(k);
    expect(res).not.toBeUndefined();
    expect(res.vars).not.toBeUndefined();
    expect(res.func).not.toBeUndefined();
    expect(res.vars).toEqual(['x','y','z']);
    console.log(res);
});