import isRecord from '../is/is-record';
import DefaultExport from '../types/default-export';

export default function isDefaultExport(
  value: unknown,
): value is DefaultExport<unknown> {
  if (!isRecord(value)) {
    return false;
  }
  const keys: string[] = Object.keys(value);
  return keys.length === 1 && keys[0] === 'default';
}
