import type Stringifiable from './stringifiable.js';

export default function isStringifiable<T = unknown>(
  value: unknown,
): value is Stringifiable<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toString' in value &&
    typeof value.toString === 'function'
  );
}
