import { describe, expect, it } from 'vitest';
import { filterByString, findString, isString } from './index.js';

const TEST_NUMBER = 1234;

describe('isString', (): void => {
  it('should identify strings', (): void => {
    expect([true, TEST_NUMBER, 'str'].filter(filterByString)).toEqual(['str']);

    expect([true, TEST_NUMBER, 'str'].find(findString)).toBe('str');

    expect(isString(TEST_NUMBER)).toBe(false);
    expect(isString('str')).toBe(true);
  });
});
