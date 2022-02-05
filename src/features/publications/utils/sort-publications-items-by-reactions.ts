import type Publication from '../types/publication';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationItemsByReactions(
  { reactions: a }: Readonly<Publication>,
  { reactions: b }: Readonly<Publication>,
): number {
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
