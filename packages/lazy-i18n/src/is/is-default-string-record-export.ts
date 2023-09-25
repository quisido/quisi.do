import isDefaultExport from '../is/is-default-export.js';
import isStringRecord from '../is/is-string-record.js';
import type { DefaultExport } from '../types/default-export.js';

export default function isDefaultStringRecordExport(
  value: unknown,
): value is DefaultExport<Record<string, string>> {
  return isDefaultExport(value) && isStringRecord(value.default);
}
