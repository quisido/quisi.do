import { describe, expect, it } from 'vitest';
import { filterByBoolean, findBoolean, isBoolean } from './index.js';

const TEST_NUMBER = 1234;

describe('isBoolean', (): void => {
  it('should identify booleans', (): void => {
    expect([true, TEST_NUMBER, 'str'].filter(filterByBoolean)).toEqual([true]);
    expect([true, TEST_NUMBER, 'str'].find(findBoolean)).toBe(true);
    expect(isBoolean(TEST_NUMBER)).toBe(false);
    expect(isBoolean(true)).toBe(true);
  });
});
