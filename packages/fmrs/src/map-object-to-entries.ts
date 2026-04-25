export type Entry<T extends object> = [keyof T, T[keyof T]];

/**
 * Converts an object into an array of typed entries.
 *
 * @example
 * mapObjectToEntries({ a: 1, b: 2 });
 */
export default function mapObjectToEntries<T extends object>(
  obj: T,
): Entry<T>[] {
  return Object.entries(obj) as Entry<T>[];
}
