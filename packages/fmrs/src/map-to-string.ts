import isStringifiable from './is-stringifiable.js';

const DEFAULT = '[object Object]';

export default function mapToString(value: unknown): string {
  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Error) {
    return value.message;
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  if (isStringifiable(value)) {
    try {
      const str: unknown = value.toString();
      if (typeof str === 'string' && str !== DEFAULT) {
        return str;
      }
    } catch (_err: unknown) {
      // Do nothing.
    }
  }

  return JSON.stringify(value);
}
