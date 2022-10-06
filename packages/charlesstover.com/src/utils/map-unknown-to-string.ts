import filterByUndefined from '../utils/filter-by-undefined';

export default function mapUnknownToString(unknown: unknown): string | null {
  if (filterByUndefined(unknown) || unknown === null) {
    return null;
  }
  if (typeof unknown === 'number') {
    return unknown.toString();
  }
  if (typeof unknown === 'string') {
    return unknown;
  }
  if (unknown instanceof Error) {
    return unknown.message;
  }
  return JSON.stringify(unknown);
}
