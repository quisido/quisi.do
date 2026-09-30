export default function validateArray(value: unknown): readonly unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  throw new Error('Expected an array.', { cause: value });
}
