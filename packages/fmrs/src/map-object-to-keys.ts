type ObjectKeys<T> = Extract<keyof T, string> | `${Extract<keyof T, number>}`;

/**
 * Returns the enumerable keys of an object.
 *
 * @example
 * mapObjectToKeys({ a: 1, b: 2 });
 */
export default function mapObjectToKeys<T extends object>(
  obj: T,
): readonly ObjectKeys<T>[] {
  return Object.keys(obj) as readonly ObjectKeys<T>[];
}
