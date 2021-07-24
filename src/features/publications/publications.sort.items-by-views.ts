import type Item from './publications.type.item';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationsItemsByViews(
  { views: a }: Readonly<Item>,
  { views: b }: Readonly<Item>,
): number {
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
