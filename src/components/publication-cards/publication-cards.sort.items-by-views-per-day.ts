import type PublicationCardItem from './publication-cards.type.item';

const NEXT = 1;
const NOW: number = Date.now();
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationCardItemsByReactionsPerDay(
  { dateTime: ad, views: an }: Readonly<PublicationCardItem>,
  { dateTime: bd, views: bn }: Readonly<PublicationCardItem>,
): number {
  const a: number = an / (NOW - ad);
  const b: number = bn / (NOW - bd);
  if (a < b) {
    return NEXT;
  }
  if (a > b) {
    return PREVIOUS;
  }
  return SAME;
}
