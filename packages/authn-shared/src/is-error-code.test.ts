import { ErrorCode, isErrorCode } from './index.js';

describe('isErrorCode', (): void => {
  it('should return true for error codes', (): void => {
    expect(isErrorCode(ErrorCode.CSRF)).toBe(true);
  });

  it('should return false for other values', (): void => {
    expect(isErrorCode({})).toBe(false);
  });
});
