import { describe, expect, it } from 'vitest';
import { mapToString } from './index.js';

describe('mapToString', (): void => {
  it('should support primitives', (): void => {
    const TEST_NUMBER = 1;
    expect(mapToString(true)).toBe('true');
    expect(mapToString(TEST_NUMBER)).toBe('1');
    expect(mapToString('string')).toBe('string');
    expect(mapToString(null)).toBe('null');
    expect(mapToString(undefined)).toBe('undefined');
  });

  it('should support errors', (): void => {
    expect(mapToString(new Error('test message'))).toBe('test message');
  });

  it('should support objects', (): void => {
    expect(mapToString({})).toBe('{}');
    expect(mapToString([])).toBe('[]');
  });
});
