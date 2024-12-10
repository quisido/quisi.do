import { mapEntriesToRecord, sortEntriesByKey } from 'fmrs';

export default function mapHeadersToRecord(
  headers: Headers,
): Record<string, string> {
  const entries = [...headers.entries()].sort(sortEntriesByKey);
  return mapEntriesToRecord(entries);
}
