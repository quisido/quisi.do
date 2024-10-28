import { isNumber, sort } from 'fmrs';
import { describe, expect, it } from 'vitest';
import { Product } from './index.js';
import createAscendingArray from './test/create-ascending-array.js';

const VALUES: readonly number[] = Object.values(Product).filter(isNumber);
const ASCENDING_ARRAY: readonly number[] = createAscendingArray(VALUES.length);

describe('Product', (): void => {
  it('should contain ascending values', (): void => {
    expect([...VALUES].sort(sort)).toEqual([...ASCENDING_ARRAY]);
  });
});
