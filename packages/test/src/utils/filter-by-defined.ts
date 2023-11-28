export default function filterByDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}
