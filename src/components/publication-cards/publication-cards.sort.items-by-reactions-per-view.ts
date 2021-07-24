import type PublicationCardItem from './publication-cards.type.item';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationCardItemsByReactionsPerDay(
  { reactions: an, views: ad }: Readonly<PublicationCardItem>,
  { reactions: bn, views: bd }: Readonly<PublicationCardItem>,
): number {
  const a: number = an / ad;
  const b: number = bn / bd;
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
