export default function mapObjectToValues<
  K extends number | string | symbol,
  T extends number | string | undefined,
>(obj: Partial<Record<K, T>>): T[] {
  return Object.values(obj) as T[];
}
