import validateString from './validate-string';

describe('validateString', (): void => {
  it('should throw an error for non-strings', (): void => {
    const TEST_NUMBER = 1;

    expect((): void => {
      validateString(true);
    }).toThrowError('Expected value to be a string, but received boolean.');

    expect((): void => {
      validateString(TEST_NUMBER);
    }).toThrowError('Expected value to be a string, but received number.');

    expect((): void => {
      validateString(null);
    }).toThrowError('Expected value to be a string, but received object.');
  });

  it('should return the string', (): void => {
    expect(validateString('hello')).toBe('hello');
  });
});
