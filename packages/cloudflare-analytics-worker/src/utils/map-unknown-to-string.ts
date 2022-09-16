export default function mapUnknownToString(value: unknown): string {
  if (value instanceof Error) {
    return value.message;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return value.toString();
  }

  return JSON.stringify(value);
}
