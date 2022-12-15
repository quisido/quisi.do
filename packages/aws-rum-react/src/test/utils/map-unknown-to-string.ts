export default function mapUnknownToString(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return value.toString();
  }

  if (value instanceof Error) {
    return value.message;
  }

  return JSON.stringify(value);
}
