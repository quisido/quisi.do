export default function is<T>(value: T): (value: unknown) => boolean {
  return function isValue(value2: unknown): boolean {
    return value === value2;
  };
}
