import { describe, expect, it } from 'vitest';
import { isUndefined } from './index.js';

describe('isUndefined', (): void => {
  it('should identify defined values', (): void => {
    expect(isUndefined('str')).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
  });
});
