// A mutable reducer significantly improves performance. This is a safe
// operation, because we control the record end-to-end.
const reduceEntriesToRecord = <K extends number | string | symbol, V>(
  record: Record<K, V>,
  [key, value]: readonly [K, V],
): Record<K, V> => {
  record[key] = value;
  return record;
};

/**
 * Converts an array of `[key, value]` entries into a record.
 *
 * @example
 * mapEntriesToRecord([['a', 1], ['b', 2]]);
 */
export default function mapEntriesToRecord<
  K extends number | string | symbol,
  V,
>(entries: readonly (readonly [K, V])[]): Record<K, V> {
  return entries.reduce(reduceEntriesToRecord<K, V>, {} as Record<K, V>);
}
