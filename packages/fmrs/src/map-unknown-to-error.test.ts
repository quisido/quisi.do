/// <reference types="jest" />
import { mapUnknownToError } from './index.js';

describe('mapUnknownToError', (): void => {
  it('should support errors', (): void => {
    const TEST_ERROR: Error = new Error();
    expect(mapUnknownToError(TEST_ERROR)).toBe(TEST_ERROR);
  });

  it('should support non-errors', (): void => {
    const TEST_VALUE = 1234;
    expect(mapUnknownToError(TEST_VALUE)).toEqual(new Error('1234'));
  });
});
