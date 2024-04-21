import reduceEntriesToRecord from './reduce-entries-to-record.js';

export default function mapEntriesToRecord<
  K extends number | string | symbol,
  V,
>(entries: readonly (readonly [K, V])[]): Record<K, V> {
  return entries.reduce(
    (...args) => reduceEntriesToRecord<K, V>(...args),
    {} as Record<K, V>,
  );
}
