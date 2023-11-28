export default function not<A extends unknown[]>(
  f: (...args: A) => boolean,
): (...args: A) => boolean {
  return function notF(...args: A): boolean {
    return !f(...args);
  };
}
