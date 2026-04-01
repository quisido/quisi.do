/**
 * Converts a `Map` into an array of entries.
 *
 * @example
 * mapMapToEntries(new Map([['a', 1]]));
 */
export default function mapMapToEntries<K extends number | string | symbol, V>(
  map: ReadonlyMap<K, V>,
): readonly (readonly [K, V])[] {
  return Array.from(map.entries());
}
