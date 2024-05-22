import { describe, expect, it } from 'vitest';
import validateString from './validate-string.js';

describe('validateString', (): void => {
  it('should throw an error for non-strings', (): void => {
    expect((): void => {
      validateString(true);
    }).toThrow('Expected a string, but received boolean true');

    expect((): void => {
      const TEST_NUMBER = 1;
      validateString(TEST_NUMBER);
    }).toThrow('Expected a string, but received number 1');

    expect((): void => {
      validateString(null);
    }).toThrow('Expected a string, but received object null');
  });

  it('should return the string', (): void => {
    expect(validateString('hello')).toBe('hello');
  });
});
