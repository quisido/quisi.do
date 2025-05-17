/**
 *   `map` is a type-safe variant of `Array.prototype.map`. It accomodates
 * arrays of known length.
 */

type Mapped<A extends readonly unknown[], T> = A extends [unknown, ...infer U]
  ? [T, ...Mapped<U, T>]
  : never;

export default function map<T, U, A extends readonly T[]>(
  arr: A,
  fn: (value: T) => U,
): Mapped<A, U> {
  return arr.map(fn) as Mapped<A, U>;
}
