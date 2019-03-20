export default function mapObjectToEntries<T extends object>(
  obj: T,
): [keyof T, T[keyof T]][] {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
