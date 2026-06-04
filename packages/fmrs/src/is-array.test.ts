import { describe, expect, it } from 'vitest';
import { isArray } from './index.js';

describe('isArray', (): void => {
  it('should identify arrays', (): void => {
    expect(isArray('test str')).toBe(false);
    expect(isArray([1, 2, 3])).toBe(true);
  });
});
