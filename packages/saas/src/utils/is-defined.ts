export default function isDefined<T>(value: T | undefined): value is T {
  return typeof value !== 'undefined';
}
