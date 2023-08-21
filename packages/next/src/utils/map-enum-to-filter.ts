export default function mapEnumToFilter<T>(
  obj: Readonly<Record<number | string | symbol, T>>,
): (value: unknown) => value is T {
  const SET: Set<T> = new Set<T>(Object.values(obj));
  return function filterByEnum(value: unknown): value is T {
    return SET.has(value as T);
  };
}
