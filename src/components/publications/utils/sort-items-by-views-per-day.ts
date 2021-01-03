import Item from '../types/item';

const NOW: number = Date.now();

export default function sortItemsByReactionsPerDay(
  { dateTime: ad, views: an }: Item,
  { dateTime: bd, views: bn }: Item,
): -1 | 0 | 1 {
  const a: number = an / (NOW - ad);
  const b: number = bn / (NOW - bd);
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}
