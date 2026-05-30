import { sortEntriesByKey } from 'fmrs';

export default function mapValueToDependencies(
  value: boolean | null | number | object | string | undefined,
): readonly unknown[] {
  if (typeof value !== 'object') {
    return [value];
  }

  if (value === null) {
    return [null];
  }

  return Object.entries(value)
    .sort(sortEntriesByKey)
    .flatMap(([key, value]: readonly [string, unknown]): readonly unknown[] => [
      key,
      value,
    ]);
}
