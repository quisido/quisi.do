export default function mapKeyToStringSort<
  K extends string,
  T extends Record<K, string>,
>(key: K): (a: T, b: T) => number {
  return function sortRows(a: Readonly<T>, b: Readonly<T>): number {
    return a[key].localeCompare(b[key]);
  };
}
