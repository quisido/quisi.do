export default function sortEntryByKey<T>(
  [a]: readonly [string, T],
  [b]: readonly [string, T],
): number {
  return a.localeCompare(b);
}
