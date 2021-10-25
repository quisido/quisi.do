import MINIMUM_VIEWS from '../constants/minimum-publications-views';
import type Item from '../types/publications-item';

export default function filterPublicationItemsByMinimumViews({
  views,
}: Readonly<Item>): boolean {
  return views >= MINIMUM_VIEWS;
}
