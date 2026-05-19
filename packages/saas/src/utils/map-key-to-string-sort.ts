export default function mapKeyToStringSort<
  K extends string,
  T extends Record<K, string>,
>(key: K): (a: T, b: T) => number {
  return function sortRows(first: Readonly<T>, second: Readonly<T>): number {
    return first[key].localeCompare(second[key]);
  };
}
