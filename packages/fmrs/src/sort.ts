import toString from './to-string.js';
import sortNumbers from './sort-numbers.js';

/**
 * Sorts values by number when both are numeric, otherwise by their string form.
 *
 * @example
 * values.sort(sort);
 */
export default function sort(first: unknown, second: unknown): number {
  if (typeof first === 'number' && typeof second === 'number') {
    return sortNumbers(first, second);
  }

  const firstStr: string = toString(first);
  const secondStr: string = toString(second);
  return firstStr.localeCompare(secondStr);
}
