import { describe, expect, it } from 'vitest';
import { isNumber } from './index.js';

const TEST_NUMBER = 1234;

describe('isNumber', (): void => {
  it('should identify numbers', (): void => {
    expect(isNumber(TEST_NUMBER)).toBe(true);
    expect(isNumber('str')).toBe(false);
  });
});
