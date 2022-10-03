export default function filterByUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}
