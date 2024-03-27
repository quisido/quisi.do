/* eslint-disable @typescript-eslint/no-magic-numbers */
import sortNumbers from './sort-numbers.js';

describe('sortNumbers', (): void => {
  it('should sort numbers', (): void => {
    expect([2, 4, 5, 3, 1].sort(sortNumbers)).toEqual([1, 2, 3, 4, 5]);
  });
});
