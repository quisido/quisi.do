/**
 * Returns the key from an entry tuple.
 *
 * @example
 * entries.map(mapEntryToKey);
 */
export default function mapEntryToKey<T>([key]: readonly [T, unknown]): T {
  return key;
}
