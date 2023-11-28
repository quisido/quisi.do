import isRecord from '../is/is-record.js';
import isStringTuple from '../is/is-string-tuple.js';

export default function isStringRecord(
  value: unknown,
): value is Record<string, string> {
  if (!isRecord(value)) {
    return false;
  }
  const entries: [number | string, unknown][] = Object.entries(value);
  return entries.every(isStringTuple);
}
