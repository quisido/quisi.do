export default function sortEntriesByKey(
  [keyA]: [string, unknown],
  [keyB]: [string, unknown],
): number {
  return keyA.localeCompare(keyB);
}
