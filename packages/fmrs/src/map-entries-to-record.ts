import reduceEntriesToRecord from './reduce-entries-to-record.js';

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
