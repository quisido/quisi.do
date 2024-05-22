import { isNumber, sortUnknown } from 'fmrs';
import { describe, expect, it } from 'vitest';
import { AccountNumber } from '../index.js';
import createAscendingArray from '../test/create-ascending-array.js';
import increment from '../test/increment.js';

const VALUES: readonly number[] = Object.values(AccountNumber).filter(isNumber);
const ASCENDING_ARRAY: readonly number[] =
  createAscendingArray(VALUES.length).map(increment);

describe('AccountNumber', (): void => {
  it('should contain ascending values', (): void => {
    expect([...VALUES].sort(sortUnknown)).toEqual([
      ...ASCENDING_ARRAY,
    ]);
  });
});
