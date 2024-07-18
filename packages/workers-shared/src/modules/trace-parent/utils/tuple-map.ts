type Map<
  T,
  A extends readonly T[],
  U,
  R extends readonly U[] = [],
> = R['length'] extends A['length'] ? R : Map<T, A, U, [...R, U]>;

export default function tupleMap<T, A extends readonly T[], U>(
  arr: A,
  callbackfn: (value: T) => U,
): Map<T, A, U> {
  return arr.map(callbackfn) as Map<T, A, U>;
}
