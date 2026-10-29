import { describe, expect, it } from 'vitest';
import { toString } from './index.js';
import type Stringifiable from './stringifiable.js';

const TEST_NUMBER = 1;

const TEST_STRINGIFIABLE: Stringifiable = {
  toString(): string {
    return 'hello';
  },
};

describe('toString', (): void => {
  it('should support primitives', (): void => {
    expect(toString(true)).toBe('true');
    expect(toString(TEST_NUMBER)).toBe('1');
    expect(toString('string')).toBe('string');
    expect(toString(null)).toBe('null');
    expect(toString(undefined)).toBe('undefined');
  });

  it('should support errors', (): void => {
    expect(toString(new Error('test message'))).toBe('test message');
  });

  it('should support objects', (): void => {
    expect(toString({})).toBe('{}');
    expect(toString([])).toBe('[]');
  });

  it('should support stringifiables', (): void => {
    expect(toString(TEST_STRINGIFIABLE)).toBe('hello');
  });
});
