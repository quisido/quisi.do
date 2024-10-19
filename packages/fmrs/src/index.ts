import sortArraysByIndex from './sort-arrays-by-index.js';

export { default as mapUnknownToString } from 'unknown2string';
export {
  default as filterByDefined,
  default as findDefined,
  default as isDefined
} from './is-defined.js';
export {
  default as filterByNumber,
  default as findNumber,
  default as isNumber
} from './is-number.js';
export {
  default as filterByString,
  default as findString,
  default as isString
} from './is-string.js';
export { default as mapEntriesToRecord } from './map-entries-to-record.js';
export { default as mapMapToEntries } from './map-map-to-entries.js';
export { default as mapMapToRecord } from './map-map-to-record.js';
export { default as mapToIndex } from './map-to-index.js';
export { default as mapUnknownToError } from './map-unknown-to-error.js';
export { default as reduceEntriesToRecord } from './reduce-entries-to-record.js';
export { default as sortNumbers } from './sort-numbers.js';
export { default as sortStrings } from './sort-strings.js';
export { default as sortUnknown } from './sort-unknown.js';
export { sortArraysByIndex };

const FIRST = 0;
const SECOND = 1;

export const sortEntriesByKey = sortArraysByIndex(FIRST);
export const sortEntriesByValue = sortArraysByIndex(SECOND);
