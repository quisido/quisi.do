import { isNumber, sort } from 'fmrs';
import { describe, expect, it } from 'vitest';
import createAscendingArray from '../test/create-ascending-array.js';
import { GetErrorCode } from './index.js';

const GET_ERROR_CODES: readonly number[] =
  Object.values(GetErrorCode).filter(isNumber);

const ASCENDING_ARRAY: readonly number[] = createAscendingArray(
  GET_ERROR_CODES.length,
);

describe('ErrorCode', (): void => {
  it('should contain ascending values', (): void => {
    expect([...GET_ERROR_CODES].sort(sort)).toEqual(ASCENDING_ARRAY);
  });
});
