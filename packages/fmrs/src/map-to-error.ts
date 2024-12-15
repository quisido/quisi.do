import mapToString from './map-to-string.js';

export default function mapToError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  const message: string = mapToString(value);
  return new Error(message);
}
