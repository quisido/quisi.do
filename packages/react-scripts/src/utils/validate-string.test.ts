import validateString from './validate-string';

describe('validateString', (): void => {
  it('should throw an error for non-strings', (): void => {
    expect((): void => {
      validateString(true);
    }).toThrowError('Expected a string, but received boolean true');

    expect((): void => {
      const TEST_NUMBER = 1;
      validateString(TEST_NUMBER);
    }).toThrowError('Expected a string, but received number 1');

    expect((): void => {
      validateString(null);
    }).toThrowError('Expected a string, but received object null');
  });

  it('should return the string', (): void => {
    expect(validateString('hello')).toBe('hello');
  });
});
