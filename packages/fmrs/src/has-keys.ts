export default function hasKeys<
  K extends number | string | symbol,
  V,
  N extends number | string | symbol,
>(
  value: Record<K, V>,
  keys: readonly N[],
): value is Record<K, V> & Record<N, unknown> {
  for (const key of keys) {
    if (!(key in value)) {
      return false;
    }
  }

  return true;
}
