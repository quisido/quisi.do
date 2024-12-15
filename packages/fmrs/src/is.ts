export default function is(value: unknown): (value: unknown) => boolean {
  return function isValue(value2: unknown): boolean {
    return value === value2;
  };
}
