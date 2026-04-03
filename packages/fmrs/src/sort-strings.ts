/**
 * Sorts strings using `localeCompare`.
 *
 * @example
 * ['b', 'a'].sort(sortStrings);
 */
export default function sortStrings(first: string, second: string): number {
  return first.localeCompare(second);
}
