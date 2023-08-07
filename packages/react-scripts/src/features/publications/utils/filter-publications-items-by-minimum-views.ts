import MINIMUM_VIEWS from '../constants/minimum-publications-views';
import type Publication from '../types/publication';

export default function filterPublicationItemsByMinimumViews({
  views,
}: Readonly<Publication>): boolean {
  return views >= MINIMUM_VIEWS;
}
