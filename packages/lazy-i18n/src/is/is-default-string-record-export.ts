import isDefaultExport from '../is/is-default-export';
import isStringRecord from '../is/is-string-record';
import DefaultExport from '../types/default-export';

export default function isDefaultStringRecordExport(
  value: unknown,
): value is DefaultExport<Record<string, string>> {
  return isDefaultExport(value) && isStringRecord(value.default);
}
