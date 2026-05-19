export default function append<T>(value: T): (values: readonly T[]) => T[] {
  return function appendValue(values: readonly T[]): T[] {
    return [...values, value];
  };
}
