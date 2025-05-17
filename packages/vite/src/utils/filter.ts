export default function filter<T>(
  fn: (value: T) => boolean,
): (values: readonly T[]) => T[] {
  return function filterValues(values: readonly T[]): T[] {
    return values.filter(fn);
  };
}
