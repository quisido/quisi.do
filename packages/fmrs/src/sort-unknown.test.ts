import sortUnknown from './sort-unknown.js';

describe('sortUnknown', (): void => {
  it('should sort numbers', (): void => {
    const FIFTH = 5;
    const FIRST = 1;
    const FOURTH = 4;
    const SECOND = 2;
    const THIRD = 3;
    const UNSORTED: readonly number[] = [FIFTH, FIRST, FOURTH, SECOND, THIRD];
    const SORTED: readonly number[] = [FIRST, SECOND, THIRD, FOURTH, FIFTH];
    expect([...UNSORTED].sort(sortUnknown)).toEqual(SORTED);
  });

  it('should sort strings', (): void => {
    const UNSORTED: readonly string[] = ['b', 'd', 'e', 'c', 'a'];
    const SORTED: readonly string[] = ['a', 'b', 'c', 'd', 'e'];
    expect([...UNSORTED].sort(sortUnknown)).toEqual(SORTED);
  });

  it('should sort mixed values', (): void => {
    expect(['a', false, true].sort(sortUnknown)).toEqual(['a', false, true]);
    expect([true, 'a', false].sort(sortUnknown)).toEqual(['a', false, true]);
  });
});
