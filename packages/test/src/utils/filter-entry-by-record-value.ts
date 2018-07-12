import filterByRecord from './filter-by-record.js';

const VALUE_INDEX = 1;

export default function filterEntryByRecordValue<T>(
  entry: readonly [T, unknown],
): entry is [T, Record<string, unknown>] {
  return filterByRecord(entry[VALUE_INDEX]);
}
