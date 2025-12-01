import { describe, expect, it } from 'vitest';
import { sortNumbers } from './index.js';

const FIFTH = 5;
const FIRST = 1;
const FOURTH = 4;
const SECOND = 2;
const THIRD = 3;

describe('sortNumbers', (): void => {
  it('should sort numbers', (): void => {
    const UNSORTED: readonly number[] = [FIFTH, FIRST, FOURTH, SECOND, THIRD];
    const SORTED: readonly number[] = [FIRST, SECOND, THIRD, FOURTH, FIFTH];
    expect([...UNSORTED].sort(sortNumbers)).toEqual(SORTED);
  });
});
