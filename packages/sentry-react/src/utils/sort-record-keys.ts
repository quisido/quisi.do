export default function sortRecordKeys(
  a: number | string | symbol,
  b: number | string | symbol,
): number {
  return a.toString().localeCompare(b.toString());
}
