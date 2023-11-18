const reduceIterableToRecord = <K extends number | string | symbol, V>(
  record: Record<K, V>,
  [key, value]: [K, V],
): Record<K, V> => {
  return {
    ...record,
    [key]: value,
  };
};

export default function mapIterableToRecord<
  K extends number | string | symbol,
  V,
>(iterable: Iterable<[K, V]>): Record<K, V> {
  return Array.from(iterable).reduce<Record<K, V>>(reduceIterableToRecord, {});
}
