import PublicationCardItem from '../types/publication-card-item';

export default function sortPublicationCardItemsByReadingTime(
  { readingTime: a }: PublicationCardItem,
  { readingTime: b }: PublicationCardItem,
): -1 | 0 | 1 {
  if (typeof a === 'undefined') {
    if (typeof b === 'undefined') {
      return 0;
    }
    return 1;
  } else if (typeof b === 'undefined') {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}
