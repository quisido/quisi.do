import filterByUndefined from '../../../utils/filter-by-undefined';
import type Publication from '../types/publication';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationItemsByReadingTime(
  { readingTime: a }: Readonly<Publication>,
  { readingTime: b }: Readonly<Publication>,
): number {
  if (filterByUndefined(a)) {
    if (filterByUndefined(b)) {
      return SAME;
    }
    return NEXT;
  }
  if (filterByUndefined(b)) {
    return PREVIOUS;
  }
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
