import { describe, expect, it } from 'vitest';
import { filterByNumber, findNumber, isNumber } from './index.js';

const TEST_NUMBER = 1234;

describe('isNumber', (): void => {
  it('should identify numbers', (): void => {
    expect([true, TEST_NUMBER, 'str'].filter(filterByNumber)).toEqual([
      TEST_NUMBER,
    ]);

    expect([true, TEST_NUMBER, 'str'].find(findNumber)).toBe(TEST_NUMBER);

    expect(isNumber(TEST_NUMBER)).toBe(true);
    expect(isNumber('str')).toBe(false);
  });
});
