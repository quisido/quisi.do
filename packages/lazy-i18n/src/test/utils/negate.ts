export default function negate<A extends unknown[]>(
  f: (...args: A) => boolean,
): (...args: A) => boolean {
  return (...args: A): boolean => {
    return !f(...args);
  };
}
