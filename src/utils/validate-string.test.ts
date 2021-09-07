import validateString from './validate-string';

describe('validateString', (): void => {
  it('should throw an error for non-strings', (): void => {
    expect((): void => {
      validateString(true);
    }).toThrowError('Expected value to be a string, but received boolean.');
    expect((): void => {
      validateString(1);
    }).toThrowError('Expected value to be a string, but received number.');
    expect((): void => {
      validateString(null);
    }).toThrowError('Expected value to be a string, but received object.');
  });

  it('should return the string', (): void => {
    expect(validateString('hello')).toBe('hello');
  });
});
