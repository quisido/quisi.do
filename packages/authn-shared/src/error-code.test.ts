/// <reference types="jest" />
import { isNumber, sortUnknown } from 'fmrs';
import { ErrorCode } from './index.js';
import createAscendingArray from './test/create-ascending-array.js';

const ERROR_CODES: readonly number[] =
  Object.values(ErrorCode).filter(isNumber);

const SPECIAL_ERROR_CODES: readonly number[] = [
  ErrorCode.NotFound,
  ErrorCode.TooManyRequests,
];

const ASCENDING_ARRAY: readonly number[] = createAscendingArray(
  ERROR_CODES.length - SPECIAL_ERROR_CODES.length,
);

describe('ErrorCode', (): void => {
  it('should contain ascending values', (): void => {
    expect([...ERROR_CODES].sort(sortUnknown)).toEqual([
      ...ASCENDING_ARRAY,
      ...SPECIAL_ERROR_CODES,
    ]);
  });
});
