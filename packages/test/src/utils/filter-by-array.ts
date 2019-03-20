// Type-safe implementation of `Array.isArray`.
export default function filterByArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}
