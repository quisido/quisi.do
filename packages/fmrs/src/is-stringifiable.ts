interface Stringifiable {
  readonly toString: () => unknown;
}

export default function isStringifiable(
  value: unknown,
): value is Stringifiable {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toString' in value &&
    typeof value.toString === 'function'
  );
}
