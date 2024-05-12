const AFTER = 1;
const BEFORE = -1;
const EQUAL = 0;

export default function mapKeyToNumberSort<
  K extends string,
  T extends Partial<Record<K, number | undefined>>,
>(key: K): (a: T, b: T) => number {
  return function sortRows(first: Readonly<T>, second: Readonly<T>): number {
    const aValue: number | undefined = first[key];
    const bValue: number | undefined = second[key];

    if (typeof aValue === 'undefined') {
      if (typeof bValue === 'undefined') {
        return EQUAL;
      }
      return BEFORE;
    }

    if (typeof bValue === 'undefined') {
      return AFTER;
    }

    if (aValue < bValue) {
      return BEFORE;
    }

    if (aValue > bValue) {
      return AFTER;
    }

    return EQUAL;
  };
}
