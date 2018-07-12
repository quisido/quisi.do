import sortUnknown from './sort-unknown.js';

export default function sortArraysByIndex(
  index: number,
): (a: readonly unknown[], b: readonly unknown[]) => number {
  return function sortByIndex(
    arrA: readonly unknown[],
    arrB: readonly unknown[],
  ): number {
    const valueA: unknown = arrA[index];
    const valueB: unknown = arrB[index];
    return sortUnknown(valueA, valueB);
  };
}
