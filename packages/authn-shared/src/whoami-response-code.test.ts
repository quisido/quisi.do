/// <reference types="jest" />
import { isNumber, sortUnknown } from 'fmrs';
import { WhoAmIResponseCode } from './index.js';
import createAscendingArray from './test/create-ascending-array.js';

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
    expect([...RESPONSE_CODES].sort(sortUnknown)).toEqual([
      ...ASCENDING_ARRAY,
      ...SPECIAL_RESPONSE_CODES,
    ]);
  });
});
