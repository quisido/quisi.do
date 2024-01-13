import type Publication from '../types/publication.js';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationItemsByPublicationDate(
  { dateTime: a }: Readonly<Publication>,
  { dateTime: b }: Readonly<Publication>,
): number {
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
