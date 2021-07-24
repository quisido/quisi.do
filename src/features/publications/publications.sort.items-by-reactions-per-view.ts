import type Item from './publications.type.item';

const NEXT = 1;
const PREVIOUS = -1;
const SAME = 0;

export default function sortPublicationItemsByReactionsPerDay(
  { reactions: an, views: ad }: Readonly<Item>,
  { reactions: bn, views: bd }: Readonly<Item>,
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
