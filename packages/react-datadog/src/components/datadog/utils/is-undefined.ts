import isDefined from '../utils/is-defined';

export default function isUndefined(value: unknown): value is undefined {
  return !isDefined(value);
}
