/// <reference types="jest" />
import isPrimitive from './is-primitive.js';

const FALSEY_NUMBER = 0;
const NEGATIVE_NUMBER = -1;
const TRUTHY_NUMBER = 1234;

describe('isPrimitive', (): void => {
  it('should return true for primitives values', (): void => {
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(FALSEY_NUMBER)).toBe(true);
    expect(isPrimitive(NEGATIVE_NUMBER)).toBe(true);
    expect(isPrimitive(TRUTHY_NUMBER)).toBe(true);
    expect(isPrimitive('')).toBe(true);
    expect(isPrimitive('str')).toBe(true);
  });

  it('should return false for objects', (): void => {
    expect(isPrimitive(null)).toBe(false);
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
  });
});
