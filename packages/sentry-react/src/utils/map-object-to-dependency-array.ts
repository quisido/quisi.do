import sortRecordKeys from '../utils/sort-record-keys';

export default function mapObjectToDependencyArray<T extends object>(
  obj: T,
): unknown[] {
  const dependencies: unknown[] = [];

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const keys: (keyof T)[] = Object.keys(obj) as (keyof T)[];

  keys.sort(sortRecordKeys);

  for (const key of keys) {
    dependencies.push(key);
    dependencies.push(obj[key]);
  }

  return dependencies;
}
