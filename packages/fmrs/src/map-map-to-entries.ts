export default function mapMapToEntries<K extends number | string | symbol, V>(
  map: ReadonlyMap<K, V>,
): readonly (readonly [K, V])[] {
  return Array.from(map.entries());
}
