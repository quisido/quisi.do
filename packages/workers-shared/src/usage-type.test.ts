import { isNumber, sortUnknown } from 'fmrs';
import { describe, expect, it } from 'vitest';
import { UsageType } from './index.js';
import createAscendingArray from './test/create-ascending-array.js';

const VALUES: readonly number[] = Object.values(UsageType).filter(isNumber);
const ASCENDING_ARRAY: readonly number[] = createAscendingArray(VALUES.length);

describe('UsageType', (): void => {
  it('should contain ascending values', (): void => {
    expect([...VALUES].sort(sortUnknown)).toEqual([...ASCENDING_ARRAY]);
  });
});
