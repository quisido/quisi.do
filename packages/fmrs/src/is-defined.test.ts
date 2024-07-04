import { describe, expect, it } from 'vitest';
import { filterByDefined, findDefined, isDefined } from './index.js';

describe('isDefined', (): void => {
  it('should identify defined values', (): void => {
    expect([true, 'str', undefined].filter(filterByDefined)).toEqual([
      true,
      'str',
    ]);

    expect([true, undefined].find(findDefined)).toBe(true);

    expect(isDefined('str')).toBe(true);
    expect(isDefined(undefined)).toBe(false);
  });
});
