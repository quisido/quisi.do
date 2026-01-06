// eslint-disable-next-line max-statements
export default function mapToString(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Error) {
    return value.message;
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return value.toString();
  }

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'undefined') {
    return 'undefined';
  }

  return JSON.stringify(value);
}
