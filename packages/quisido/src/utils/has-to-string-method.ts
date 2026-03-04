interface HasToStringMethod {
  readonly toString: () => unknown;
}

export default function hasToStringMethod(
  value: unknown,
): value is HasToStringMethod {
  return (
    typeof value !== 'object' ||
    (value !== null &&
      'toString' in value &&
      typeof value.toString === 'function')
  );
}
