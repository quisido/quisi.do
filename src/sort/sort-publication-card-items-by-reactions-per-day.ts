import PublicationCardItem from '../types/publication-card-item';

const NOW: number = Date.now();

export default function sortPublicationCardItemsByReactionsPerDay(
  { dateTime: ad, reactions: an }: PublicationCardItem,
  { dateTime: bd, reactions: bn }: PublicationCardItem,
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
