import sortArraysByIndex from './sort-arrays-by-index.js';

const FIRST = 0;
const LARGER_NUMBER = 5678;
const SECOND = 1;
const SMALLER_NUMBER = 1234;
const THIRD = 2;

const ONE: readonly [boolean, number, string] = [false, SMALLER_NUMBER, 'abc'];
const TWO: readonly [boolean, number, string] = [true, LARGER_NUMBER, 'xyz'];

describe('sortArraysByIndex', (): void => {
  it('should sort by the specified index', (): void => {
    // Boolean
    expect([ONE, TWO].sort(sortArraysByIndex(FIRST))).toEqual([ONE, TWO]);
    expect([TWO, ONE].sort(sortArraysByIndex(FIRST))).toEqual([ONE, TWO]);

    // Number
    expect([ONE, TWO].sort(sortArraysByIndex(SECOND))).toEqual([ONE, TWO]);
    expect([TWO, ONE].sort(sortArraysByIndex(SECOND))).toEqual([ONE, TWO]);

    // String
    expect([ONE, TWO].sort(sortArraysByIndex(THIRD))).toEqual([ONE, TWO]);
    expect([TWO, ONE].sort(sortArraysByIndex(THIRD))).toEqual([ONE, TWO]);
  });
});
