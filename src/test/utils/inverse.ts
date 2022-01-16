export default function inverse<T>(
  f: (value: T) => boolean,
): (value: T) => boolean {
  return function invertedFunction(value: T): boolean {
    return !f(value);
  };
}
