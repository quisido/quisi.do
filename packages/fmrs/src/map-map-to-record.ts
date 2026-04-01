import mapEntriesToRecord from './map-entries-to-record.js';
import mapMapToEntries from './map-map-to-entries.js';

/**
 * Converts a `Map` into a record.
 *
 * @example
 * mapMapToRecord(new Map([['a', 1]]));
 */
export default function mapMapToRecord<K extends number | string | symbol, V>(
  map: Map<K, V>,
): Record<K, V> {
  const entries: readonly (readonly [K, V])[] = mapMapToEntries(map);
  return mapEntriesToRecord(entries);
}
