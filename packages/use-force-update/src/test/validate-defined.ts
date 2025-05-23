export default function validateDefined<T>(value: T | undefined): T {
  if (typeof value === 'undefined') {
    throw new Error('Expected value to be defined.');
  }

  return value;
}
