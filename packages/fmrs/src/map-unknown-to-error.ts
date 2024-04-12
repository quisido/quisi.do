import mapUnknownToString from 'unknown2string';

export default function mapUnknownToError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  const message: string = mapUnknownToString(value);
  return new Error(message);
}
