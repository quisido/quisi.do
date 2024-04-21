import mapUnknownToString from 'unknown2string';
import sortNumbers from './sort-numbers.js';

export default function sortUnknown(first: unknown, second: unknown): number {
  if (typeof first === 'number' && typeof second === 'number') {
    return sortNumbers(first, second);
  }

  const firstStr: string = mapUnknownToString(first);
  const secondStr: string = mapUnknownToString(second);
  return firstStr.localeCompare(secondStr);
}
