import type Item from './publications.type.item';

const MINIMUM_VIEWS = 5000;

export default function filterPublicationItemsByMinimumViews({
  views,
}: Readonly<Item>): boolean {
  return views >= MINIMUM_VIEWS;
}
