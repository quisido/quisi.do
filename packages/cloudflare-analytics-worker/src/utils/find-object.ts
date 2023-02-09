export default function findObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
