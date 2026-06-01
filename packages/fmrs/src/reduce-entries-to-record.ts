/**
 * Reduces an entry tuple into a new record.
 * Intended for use as an `Array.prototype.reduce` callback.
 *
 * @example
 * entries.reduce(reduceEntriesToRecord, {});
 */
export default function reduceEntriesToRecord<
  K extends number | string | symbol,
  V,
>(
  record: Readonly<Record<K, V>>,
  [key, value]: readonly [K, V],
  // _currentIndex: number,
  // _arr: readonly (readonly [K, V])[],
): Record<K, V> {
  return {
    ...record,
    [key]: value,
  };
}
