import sort from './sort.js';

/**
 * Creates a comparator that sorts arrays by the value at `index`.
 *
 * @example
 * entries.sort(sortArraysByIndex(0));
 */
export default function sortArraysByIndex(
  index: number,
): (a: readonly unknown[], b: readonly unknown[]) => number {
  return function sortByIndex(
    arrA: readonly unknown[],
    arrB: readonly unknown[],
  ): number {
    const valueA: unknown = arrA[index];
    const valueB: unknown = arrB[index];
    return sort(valueA, valueB);
  };
}
