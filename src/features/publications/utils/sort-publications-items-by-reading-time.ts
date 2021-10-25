import type Item from '../types/publications-item';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationItemsByReadingTime(
  { readingTime: a }: Readonly<Item>,
  { readingTime: b }: Readonly<Item>,
): number {
  if (typeof a === 'undefined') {
    if (typeof b === 'undefined') {
      return SAME;
    }
    return NEXT;
  }
  if (typeof b === 'undefined') {
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
