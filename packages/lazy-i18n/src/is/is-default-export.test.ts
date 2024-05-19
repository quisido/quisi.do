import { describe, expect, it } from 'vitest';
import isDefaultExport from './is-default-export.js';

const FALSEY_NUMBER = 0;
const TRUTHY_NUMBER = 1234;

describe('isDefaultExport', (): void => {
  it('should return false for non-objects', (): void => {
    expect(isDefaultExport(null)).toBe(false);
    expect(isDefaultExport(true)).toBe(false);
    expect(isDefaultExport(false)).toBe(false);
    expect(isDefaultExport(FALSEY_NUMBER)).toBe(false);
    expect(isDefaultExport(TRUTHY_NUMBER)).toBe(false);
    expect(isDefaultExport('')).toBe(false);
    expect(isDefaultExport('str')).toBe(false);
    expect(isDefaultExport([])).toBe(false);
  });

  it('should return false for non-default exports', (): void => {
    expect(
      isDefaultExport({
        'test-key': 'test value',
      }),
    ).toBe(false);
  });

  it('should return false for exports containing more than default', (): void => {
    expect(
      isDefaultExport({
        default: 'default',
        'test-key': 'test value',
      }),
    ).toBe(false);
  });

  it('should return true for default exports', (): void => {
    expect(
      isDefaultExport({
        default: {
          'test-key': 'test value',
        },
      }),
    ).toBe(true);
  });
});
