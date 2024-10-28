import { describe, expect, it } from 'vitest';
import { filterByUndefined, isUndefined } from './index.js';

describe('isUndefined', (): void => {
  it('should identify defined values', (): void => {
    expect([true, 'str', undefined].filter(filterByUndefined)).toEqual([
      undefined,
    ]);

    expect(isUndefined('str')).toBe(true);
    expect(isUndefined(undefined)).toBe(false);
  });
});
