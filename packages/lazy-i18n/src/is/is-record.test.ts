import { describe, expect, it } from 'vitest';
import isRecord from './is-record.js';

const TEST_NUMBER = 1234;

describe('isRecord', (): void => {
  it('should return false for non-objects', (): void => {
    expect(isRecord(null)).toBe(false);
    expect(isRecord(true)).toBe(false);
    expect(isRecord(TEST_NUMBER)).toBe(false);
    expect(isRecord('str')).toBe(false);
  });

  it('should return false for arrays', (): void => {
    expect(isRecord([])).toBe(false);
  });

  it('should return false for Promises', (): void => {
    expect(isRecord(Promise.resolve({}))).toBe(false);
  });

  it('should return true for records', (): void => {
    expect(
      isRecord({
        'test-key': 'test value',
      }),
    ).toBe(true);
  });
});
