import findUndefined from '../../../utils/find-undefined';
import type Publication from '../types/publication';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationItemsByReadingTime(
  { readingTime: a }: Readonly<Publication>,
  { readingTime: b }: Readonly<Publication>,
): number {
  if (findUndefined(a)) {
    if (findUndefined(b)) {
      return SAME;
    }
    return NEXT;
  }
  if (findUndefined(b)) {
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
