import PublicationCardItem from '../types/publication-card-item';

export default function sortPublicationCardItemsByReactionsPerDay(
  { reactions: an, views: ad }: PublicationCardItem,
  { reactions: bn, views: bd }: PublicationCardItem,
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
