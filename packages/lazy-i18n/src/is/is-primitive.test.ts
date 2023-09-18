import isPrimitive from './is-primitive';

describe('isPrimitive', (): void => {
  it('should return true for primitives values', (): void => {
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(-1)).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(1234)).toBe(true);
    expect(isPrimitive('')).toBe(true);
    expect(isPrimitive('str')).toBe(true);
  });

  it('should return false for objects', (): void => {
    expect(isPrimitive(null)).toBe(false);
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
  });
});
