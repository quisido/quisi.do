import { isRecord } from 'fmrs';

const VALUE_INDEX = 1;

export default function filterEntryByRecordValue<T>(
  entry: readonly [T, unknown],
): entry is [T, Record<string, unknown>] {
  return isRecord(entry[VALUE_INDEX]);
}
