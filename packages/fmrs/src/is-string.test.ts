import { describe, expect, it } from 'vitest';
import { isString } from './index.js';

const TEST_NUMBER = 1234;

describe('isString', (): void => {
  it('should identify strings', (): void => {
    expect(isString(TEST_NUMBER)).toBe(false);
    expect(isString('str')).toBe(true);
  });
});
