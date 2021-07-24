import reduceArrayToSum from '../reduce/reduce-array-to-sum';

const NONE = 0;

export default function reduceArrayOfArraysToSum(
  total: number,
  data: readonly number[],
): number {
  return total + data.reduce(reduceArrayToSum, NONE);
}
