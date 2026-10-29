import { isNumber, sort } from 'fmrs';
import { describe, expect, it } from 'vitest';
import createAscendingArray from '../test/create-ascending-array.js';
import { AnalyticsResponseCode } from './index.js';

const RESPONSE_CODES: readonly number[] = Object.values(
  AnalyticsResponseCode,
).filter(isNumber);

const ASCENDING_ARRAY: readonly number[] = createAscendingArray(
  RESPONSE_CODES.length,
);

describe('AnalyticsResponseCode', (): void => {
  it('should contain ascending values', (): void => {
    expect([...RESPONSE_CODES].sort(sort)).toEqual(ASCENDING_ARRAY);
  });
});
