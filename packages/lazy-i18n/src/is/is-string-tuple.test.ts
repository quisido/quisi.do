import isStringTuple from './is-string-tuple.js';

describe('isStringTuple', (): void => {
  it('should return false for non-string tuples', (): void => {
    expect(isStringTuple([1, 2])).toBe(false);
    expect(isStringTuple(['a', 2])).toBe(false);
    expect(isStringTuple([1, 'b'])).toBe(false);
  });

  it('should return true for string tuples', (): void => {
    expect(isStringTuple(['a', 'b'])).toBe(true);
  });
});
