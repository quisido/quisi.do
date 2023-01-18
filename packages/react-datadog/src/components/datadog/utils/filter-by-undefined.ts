import filterByDefined from '../utils/filter-by-defined';

export default function filterByUndefined(value: unknown): value is undefined {
  return !filterByDefined(value);
}
