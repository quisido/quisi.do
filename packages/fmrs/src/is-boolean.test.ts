import { describe, expect, it } from 'vitest';
import { isBoolean } from './index.js';

describe('isBoolean', (): void => {
  it('should identify booleans', (): void => {
    expect(isBoolean('test str')).toBe(false);
    expect(isBoolean(true)).toBe(true);
  });
});
