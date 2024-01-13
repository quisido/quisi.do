import MINIMUM_VIEWS from '../constants/minimum-publications-views.js';
import type Publication from '../types/publication.js';

export default function filterPublicationItemsByMinimumViews({
  views,
}: Readonly<Publication>): boolean {
  return views >= MINIMUM_VIEWS;
}
