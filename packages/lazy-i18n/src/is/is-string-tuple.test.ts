import isStringTuple from './is-string-tuple.js';

const TEST_NUMBER = 1234;

describe('isStringTuple', (): void => {
  it('should return false for non-string tuples', (): void => {
    expect(isStringTuple([TEST_NUMBER, TEST_NUMBER])).toBe(false);
    expect(isStringTuple(['a', TEST_NUMBER])).toBe(false);
    expect(isStringTuple([TEST_NUMBER, 'b'])).toBe(false);
  });

  it('should return true for string tuples', (): void => {
    expect(isStringTuple(['a', 'b'])).toBe(true);
  });
});
