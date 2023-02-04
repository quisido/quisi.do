import findDefined from '../utils/find-defined';

export default function findUndefined(value: unknown): value is undefined {
  return !findDefined(value);
}
