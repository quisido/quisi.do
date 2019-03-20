import isRecord from '../is/is-record.js';
import type { DefaultExport } from '../types/default-export.js';

const FIRST = 0;
const SINGLE = 1;

export default function isDefaultExport(
  value: unknown,
): value is DefaultExport<unknown> {
  if (!isRecord(value)) {
    return false;
  }
  const keys: string[] = Object.keys(value);
  return keys.length === SINGLE && keys[FIRST] === 'default';
}
