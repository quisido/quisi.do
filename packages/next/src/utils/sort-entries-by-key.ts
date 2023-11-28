export default function sortEntriesByKey(
  [a]: [string, unknown],
  [b]: [string, unknown],
): number {
  return a.localeCompare(b);
}
