export default function isArray(value: unknown): value is readonly unknown[] {
  return Array.isArray(value);
}
