import sortArraysByIndex from './sort-arrays-by-index.js';

export { default as hasKeys } from './has-keys.js';
export { default as identity } from './identity.js';
export { default as is } from './is.js';
export { default as isArray } from './is-array.js';
export { default as isBoolean } from './is-boolean.js';
export { default as isDefined } from './is-defined.js';
export { default as isNot } from './is-not.js';
export { default as isNumber } from './is-number.js';
export { default as isObject } from './is-object.js';
export { default as isPromise } from './is-promise.js';
export { default as isRecord } from './is-record.js';
export { default as isString } from './is-string.js';
export { default as isUndefined } from './is-undefined.js';
export { default as mapBooleanToNumber } from './map-boolean-to-number.js';
export { default as mapEntriesToRecord } from './map-entries-to-record.js';
export { default as mapEntryToKey } from './map-entry-to-key.js';
export { default as mapEntryToValue } from './map-entry-to-value.js';
export { default as mapMapToEntries } from './map-map-to-entries.js';
export { default as mapMapToRecord } from './map-map-to-record.js';
export { default as mapObjectToEntries } from './map-object-to-entries.js';
export { default as mapObjectToKeys } from './map-object-to-keys.js';
export { default as mapStringToByteLength } from './map-string-to-byte-length.js';
export { default as not } from './not.js';
export { default as reduceEntriesToRecord } from './reduce-entries-to-record.js';
export { default as sort } from './sort.js';
export { default as sortNumbers } from './sort-numbers.js';
export { default as sortStrings } from './sort-strings.js';
export { type default as Stringifiable } from './stringifiable.js';
export { sortArraysByIndex };
export { default as toError } from './to-error.js';
export { default as toIndex } from './to-index.js';
export { default as toString } from './to-string.js';

/**
 * Sorts entry-like arrays by their first item.
 *
 * @example
 * entries.sort(sortEntriesByKey);
 */
export const sortEntriesByKey: (
  a: readonly unknown[],
  b: readonly unknown[],
) => number = sortArraysByIndex(0);

/**
 * Sorts entry-like arrays by their second item.
 *
 * @example
 * entries.sort(sortEntriesByValue);
 */
export const sortEntriesByValue: (
  a: readonly unknown[],
  b: readonly unknown[],
) => number = sortArraysByIndex(1);
