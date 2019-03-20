import filterByRecord from './filter-by-record.js';

export default function validateRecord(
  value: unknown,
): Record<string, unknown> {
  if (!filterByRecord(value)) {
    throw new Error(`Expected value to be a record, but got ${typeof value}.`);
  }
  return value;
}
