import type PublicationCardItem from './publication-cards.type.item';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationCardItemsByPublicationDate(
  { dateTime: a }: Readonly<PublicationCardItem>,
  { dateTime: b }: Readonly<PublicationCardItem>,
): number {
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
