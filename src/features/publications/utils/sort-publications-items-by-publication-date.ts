import type Item from '../types/publications-item';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationItemsByPublicationDate(
  { dateTime: a }: Readonly<Item>,
  { dateTime: b }: Readonly<Item>,
): number {
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
