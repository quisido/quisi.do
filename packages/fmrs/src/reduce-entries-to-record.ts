export default function reduceEntriesToRecord<
  K extends number | string | symbol,
  V,
>(
  record: Readonly<Record<K, V>>,
  [key, value]: readonly [K, V],
  _currentIndex: number,
  _arr: readonly (readonly [K, V])[],
): Record<K, V> {
  return {
    ...record,
    [key]: value,
  };
}
