import reduceArrayToSum from '../utils/reduce-array-to-sum.js';

const NONE = 0;

export default function reduceArrayOfArraysToSum(
  total: number,
  data: readonly number[],
): number {
  return total + data.reduce(reduceArrayToSum, NONE);
}
