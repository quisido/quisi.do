import toString from './to-string.js';

export default function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  return new Error(toString(value));
}
