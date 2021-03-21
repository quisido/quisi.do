import PublicationCardItem from '../types/publication-card-item';

export default function sortPublicationCardItemsByPublicationDate(
  { dateTime: a }: PublicationCardItem,
  { dateTime: b }: PublicationCardItem,
): -1 | 0 | 1 {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}
