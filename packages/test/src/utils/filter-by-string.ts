export default function filterByString(value: unknown): value is string {
  return typeof value === 'string';
}
