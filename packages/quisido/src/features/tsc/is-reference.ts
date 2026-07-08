import type { Reference } from '../../types/tsconfig.js';

export default function isReference(value: unknown): value is Reference {
  return (
    typeof value === 'object' &&
    value !== null &&
    'path' in value &&
    typeof value.path === 'string'
  );
}
