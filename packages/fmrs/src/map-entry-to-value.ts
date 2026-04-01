/**
 * Returns the value from an entry tuple.
 *
 * @example
 * entries.map(mapEntryToValue);
 */
export default function mapEntryToValue<T>([, value]: readonly [
  unknown,
  T,
]): T {
  return value;
}
