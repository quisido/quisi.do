import { describe, expect, it } from 'vitest';
import { toError } from './index.js';

describe('toError', (): void => {
  it('should support errors', (): void => {
    const TEST_ERROR: Error = new Error();
    expect(toError(TEST_ERROR)).toBe(TEST_ERROR);
  });

  it('should support non-errors', (): void => {
    const TEST_VALUE = 1234;
    expect(toError(TEST_VALUE)).toEqual(new Error('1234'));
  });
});
