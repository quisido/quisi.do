export type Entry<T extends object> = [keyof T, T[keyof T]];

export default function mapObjectToEntries<T extends object>(
  obj: T,
): Entry<T>[] {
  return Object.entries(obj) as Entry<T>[];
}
