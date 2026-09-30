import { type DefaultExport } from '../types/default-export.js';
import isDefaultExport from './is-default-export.js';
import isStringRecord from './is-string-record.js';

export default function isDefaultStringRecordExport(
  value: unknown,
): value is DefaultExport<Record<string, string>> {
  return isDefaultExport(value) && isStringRecord(value.default);
}
