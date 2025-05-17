const TUPLE_LENGTH = 2;

export default function isTuple<T>(value: readonly T[]): value is [T, T] {
  return value.length === TUPLE_LENGTH;
}
