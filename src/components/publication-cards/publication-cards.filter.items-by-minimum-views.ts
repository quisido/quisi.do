import type Item from './publication-cards.type.item';

const MINIMUM_VIEWS = 5000;

export default function filterPublicationCardItemsByMinimumViews({
  views,
}: Readonly<Item>): boolean {
  return views >= MINIMUM_VIEWS;
}
