import Item from '../types/item';

export default function sortItemsByReactionsPerDay(
  { reactions: an, views: ad }: Item,
  { reactions: bn, views: bd }: Item,
): -1 | 0 | 1 {
  const a: number = an / ad;
  const b: number = bn / bd;
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}
