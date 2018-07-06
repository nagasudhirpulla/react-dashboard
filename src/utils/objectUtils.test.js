import { equipDefaultProp, keepSpecifiedPropsOnly } from './objectUtils'

it('tests the equipDefaultProp function', () => {
    let x = { a: 1, b: 2 };
    // x_equipped a prop should be 1, not 3
    let x_equipped = equipDefaultProp(x, 'a', 3)
    expect(x_equipped.a).toEqual(1);
    // x_equipped c prop should be 3, not undefined
    x_equipped = equipDefaultProp(x, 'c', 3)
    expect(x_equipped.c).toEqual(3);
    // x should not be mutated, hence c prop of x should be undefined
    expect(x.c).toBeUndefined();
});

it('tests the keepSpecifiedPropsOnly function', () => {
    let x = { a: 1, b: 2 };
    let x_modified = keepSpecifiedPropsOnly(x, ['a']);
    expect(x_modified.b).toBeUndefined();
    // x should not be mutated, hence b prop of x should not be undefined
    expect(x.b).not.toBeUndefined()
});