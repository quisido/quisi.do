import { isObject } from 'fmrs';

interface SentryError {
  readonly detail: string;
}

export default function isSentryError(value: unknown): value is SentryError {
  return (
    isObject(value) && 'detail' in value && typeof value.detail === 'string'
  );
}
