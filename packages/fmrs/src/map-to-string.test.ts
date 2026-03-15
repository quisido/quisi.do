import { describe, expect, it } from 'vitest';
import { mapToString, toString } from './index.js';
import type Stringifiable from './stringifiable.js';

const TEST_NUMBER = 1;

const TEST_STRINGIFIABLE: Stringifiable = {
  toString(): string {
    return 'hello';
  },
};

describe('mapToString', (): void => {
  it('should support primitives', (): void => {
    expect(mapToString(true)).toBe('true');
    expect(mapToString(TEST_NUMBER)).toBe('1');
    expect(mapToString('string')).toBe('string');
    expect(mapToString(null)).toBe('null');
    expect(mapToString(undefined)).toBe('undefined');
    expect(toString(true)).toBe('true');
    expect(toString(TEST_NUMBER)).toBe('1');
    expect(toString('string')).toBe('string');
    expect(toString(null)).toBe('null');
    expect(toString(undefined)).toBe('undefined');
  });

  it('should support errors', (): void => {
    expect(mapToString(new Error('test message'))).toBe('test message');
    expect(toString(new Error('test message'))).toBe('test message');
  });

  it('should support objects', (): void => {
    expect(mapToString({})).toBe('{}');
    expect(mapToString([])).toBe('[]');
    expect(toString({})).toBe('{}');
    expect(toString([])).toBe('[]');
  });

  it('should support stringifiables', (): void => {
    expect(mapToString(TEST_STRINGIFIABLE)).toBe('hello');
    expect(toString(TEST_STRINGIFIABLE)).toBe('hello');
  });
});
