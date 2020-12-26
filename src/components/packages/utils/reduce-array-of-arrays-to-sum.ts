import reduceArrayToSum from '../../../utils/reduce-array-to-sum';

export default function reduceArrayOfArraysToSum(
  total: number,
  data: number[],
): number {
  return total + data.reduce(reduceArrayToSum, 0);
}
