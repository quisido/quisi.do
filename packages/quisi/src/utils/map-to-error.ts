import mapToString from './map-to-string.js';

export default function mapToError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  return new Error(mapToString(value));
}
