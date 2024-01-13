export default function flatten<T>(
  newArr: readonly T[],
  nestedArr: readonly T[],
): readonly T[] {
  return [...newArr, ...nestedArr];
}
