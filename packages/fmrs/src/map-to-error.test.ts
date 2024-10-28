import { describe, expect, it } from 'vitest';
import { mapToError } from './index.js';

describe('mapToError', (): void => {
  it('should support errors', (): void => {
    const TEST_ERROR: Error = new Error();
    expect(mapToError(TEST_ERROR)).toBe(TEST_ERROR);
  });

  it('should support non-errors', (): void => {
    const TEST_VALUE = 1234;
    expect(mapToError(TEST_VALUE)).toEqual(new Error('1234'));
  });
});
