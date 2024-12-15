import { isRecord } from 'fmrs';

export default function validateRecord(
  value: unknown,
): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(`Expected value to be a record, but got ${typeof value}.`);
  }

  return value;
}
