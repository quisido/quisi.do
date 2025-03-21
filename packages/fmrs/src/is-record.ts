import isObject from './is-object.js';

export default function isRecord(
  value: unknown,
): value is Record<number | string | symbol, unknown> {
  return isObject(value);
}
