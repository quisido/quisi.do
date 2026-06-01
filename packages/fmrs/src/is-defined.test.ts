import { describe, expect, it } from 'vitest';
import { isDefined } from './index.js';

describe('isDefined', (): void => {
  it('should identify defined values', (): void => {
    expect(isDefined('str')).toBe(true);
    expect(isDefined(undefined)).toBe(false);
  });
});
