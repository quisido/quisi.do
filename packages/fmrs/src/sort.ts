import mapToString from './map-to-string.js';
import sortNumbers from './sort-numbers.js';

export default function sort(first: unknown, second: unknown): number {
  if (typeof first === 'number' && typeof second === 'number') {
    return sortNumbers(first, second);
  }

  const firstStr: string = mapToString(first);
  const secondStr: string = mapToString(second);
  return firstStr.localeCompare(secondStr);
}
