export default function findDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}
