/* eslint-disable @typescript-eslint/no-magic-numbers */
import sortUnknown from './sort-unknown.js';

describe('sortUnknown', (): void => {
  it('should sort numbers', (): void => {
    expect([2, 4, 5, 3, 1].sort(sortUnknown)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should sort strings', (): void => {
    expect(['b', 'd', 'e', 'c', 'a'].sort(sortUnknown)).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
    ]);
  });

  it('should sort mixed values', (): void => {
    expect([1, 'a'].sort(sortUnknown)).toEqual([1, 'a']);
    expect(['a', 1].sort(sortUnknown)).toEqual([1, 'a']);
  });
});
