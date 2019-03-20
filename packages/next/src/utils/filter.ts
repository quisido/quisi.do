export default function filter<T>(
  f: (value: T) => boolean,
): (values: readonly T[]) => T[] {
  return function filterValues(values: readonly T[]): T[] {
    return values.filter(f);
  };
}
