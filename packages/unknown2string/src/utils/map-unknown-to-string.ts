export default function mapUnknownToString(value: unknown): string {
  if (typeof value === 'undefined') {
    return 'undefined';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Error) {
    return value.message;
  }

  return JSON.stringify(value);
}
