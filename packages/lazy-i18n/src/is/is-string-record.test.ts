import { describe, expect, it } from 'vitest';
import isStringRecord from './is-string-record.js';

const TEST_NUMBER = 1234;

describe('isStringRecord', (): void => {
  it('should return false for non-records', (): void => {
    expect(isStringRecord(null)).toBe(false);
    expect(isStringRecord(true)).toBe(false);
    expect(isStringRecord(TEST_NUMBER)).toBe(false);
    expect(isStringRecord('str')).toBe(false);
    expect(isStringRecord([])).toBe(false);
  });

  it('should return false for non-string records', (): void => {
    expect(
      isStringRecord({
        test: 1,
      }),
    ).toBe(false);
    expect(
      isStringRecord({
        'test-number': 4,
        'test-string': 'b',
      }),
    ).toBe(false);
  });

  it('should return true for string records', (): void => {
    expect(
      isStringRecord({
        test: 'b',
      }),
    ).toBe(true);
  });
});
