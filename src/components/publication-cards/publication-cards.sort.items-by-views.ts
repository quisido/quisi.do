import type PublicationCardItem from './publication-cards.type.item';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationCardItemsByViews(
  { views: a }: Readonly<PublicationCardItem>,
  { views: b }: Readonly<PublicationCardItem>,
): number {
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
