import { isNumber, sort } from 'fmrs';
import { describe, expect, it } from 'vitest';
import createAscendingArray from '../test/create-ascending-array.js';
import { WhoAmIResponseCode } from './index.js';

const RESPONSE_CODES: readonly number[] =
  Object.values(WhoAmIResponseCode).filter(isNumber);

const SPECIAL_RESPONSE_CODES: readonly number[] = [
  WhoAmIResponseCode.Throttled,
];

const ASCENDING_ARRAY: readonly number[] = createAscendingArray(
  RESPONSE_CODES.length - SPECIAL_RESPONSE_CODES.length,
);

describe('WhoAmIResponseCode', (): void => {
  it('should contain ascending values', (): void => {
    expect([...RESPONSE_CODES].sort(sort)).toEqual([
      ...ASCENDING_ARRAY,
      ...SPECIAL_RESPONSE_CODES,
    ]);
  });
});
