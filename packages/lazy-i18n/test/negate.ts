export default function negate<A extends unknown[]>(
  fn: (...args: A) => boolean,
): (...args: A) => boolean {
  return (...args: A): boolean => !fn(...args);
}
