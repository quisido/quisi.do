const ARRAY_INDEX_OFFSET = 1;

export default function reduceToSpaceDelimited<T>(
  previousValue: readonly (T | string)[],
  item: T,
  index: number,
  arr: readonly T[],
): readonly (T | string)[] {
  const lastIndex: number = arr.length - ARRAY_INDEX_OFFSET;
  if (index === lastIndex) {
    return [...previousValue, item];
  }
  return [...previousValue, item, ' '];
}
