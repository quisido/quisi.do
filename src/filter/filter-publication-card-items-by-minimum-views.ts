import PublicationCardItem from '../types/publication-card-item';

export default function filterPublicationCardItemsByMinimumViews({
  views,
}: PublicationCardItem): boolean {
  return views >= 5000;
}
