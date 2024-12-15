export default function getValues<
  K extends number | string | symbol,
  T extends Record<K, unknown>,
>(value: T, keys: readonly K[]): T[K][] {
  const mapKeyToValue = (key: K): T[K] => value[key];
  return keys.map(mapKeyToValue);
}
