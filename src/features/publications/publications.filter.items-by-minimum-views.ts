import MINIMUM_VIEWS from './publications.constant.minimum-views';
import type Item from './publications.type.item';

export default function filterPublicationItemsByMinimumViews({
  views,
}: Readonly<Item>): boolean {
  return views >= MINIMUM_VIEWS;
}
