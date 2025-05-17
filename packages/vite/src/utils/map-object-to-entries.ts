type Entry<T extends object> = [keyof T, T[keyof T]];

export default function mapObjectToEntries<T extends object>(
  obj: T,
): Entry<T>[] {
  // Type 'string' is not comparable to type 'keyof T'.
  return Object.entries(obj) as unknown as Entry<T>[];
}
