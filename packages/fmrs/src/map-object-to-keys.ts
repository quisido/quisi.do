type ObjectKeys<T> = Extract<keyof T, string> | `${Extract<keyof T, number>}`;

export default function mapObjectToKeys<T extends object>(
  obj: T,
): readonly ObjectKeys<T>[] {
  return Object.keys(obj) as readonly ObjectKeys<T>[];
}
