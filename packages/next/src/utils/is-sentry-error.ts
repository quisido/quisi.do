import isRecord from './is-record.js';

interface SentryError {
  readonly detail: string;
}

export default function isSentryError(value: unknown): value is SentryError {
  return (
    isRecord(value) && 'detail' in value && typeof value.detail === 'string'
  );
}
