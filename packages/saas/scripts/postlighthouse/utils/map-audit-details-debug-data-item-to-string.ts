import { isArray, isRecord, isString } from 'fmrs';

export default function mapAuditDetailsDebugDataItemToString(
  item: unknown,
): string {
  if (!isRecord(item)) {
    throw new Error('Expected debug data item to be a record.', {
      cause: item,
    });
  }

  const { failures } = item;
  if (!isArray(failures)) {
    throw new Error('Expected debug data item to contain failures.', {
      cause: item,
    });
  }

  if (!failures.every(isString)) {
    throw new Error('Expected failures to be strings.', {
      cause: failures,
    });
  }

  return failures.join('\n');
}
