export default function isUndefined<T>(
  value: T | undefined,
): value is undefined {
  return typeof value === 'undefined';
}
