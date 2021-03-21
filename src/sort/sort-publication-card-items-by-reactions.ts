import PublicationCardItem from '../types/publication-card-item';

export default function sortPublicationCardItemsByReactions(
  { reactions: a }: PublicationCardItem,
  { reactions: b }: PublicationCardItem,
): -1 | 0 | 1 {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}
