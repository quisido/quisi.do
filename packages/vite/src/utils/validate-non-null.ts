export default function validateNonNull<T>(value: T | null): T {
  if (value === null) {
    throw new Error('Expected non-null.');
  }

  return value;
}
