import mapUnknownToString from 'unknown2string';
import sortNumbers from './sort-numbers.js';

export default function sortUnknown(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return sortNumbers(a, b);
  }

  const aStr: string = mapUnknownToString(a);
  const bStr: string = mapUnknownToString(b);
  return aStr.localeCompare(bStr);
}
