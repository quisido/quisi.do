export default function findUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}
