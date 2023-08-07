import Sort from '../constants/publications-sort';
import type Publication from '../types/publication';
import sortItemsByPublicationDate from '../utils/sort-publications-items-by-publication-date';
import sortItemsByReactions from '../utils/sort-publications-items-by-reactions';
import sortItemsByReactionsPerDay from '../utils/sort-publications-items-by-reactions-per-day';
import sortItemsByReactionsPerView from '../utils/sort-publications-items-by-reactions-per-view';
import sortItemsByReadingTime from '../utils/sort-publications-items-by-reading-time';
import sortItemsByViews from '../utils/sort-publications-items-by-views';
import sortItemsByViewsPerDay from '../utils/sort-publications-items-by-views-per-day';

export default function mapPublicationsSortToFunction(
  sort: Sort,
): (a: Readonly<Publication>, b: Readonly<Publication>) => number {
  switch (sort) {
    case Sort.PublicationDate:
      return sortItemsByPublicationDate;
    case Sort.Reactions:
      return sortItemsByReactions;
    case Sort.ReactionsPerDay:
      return sortItemsByReactionsPerDay;
    case Sort.ReactionsPerView:
      return sortItemsByReactionsPerView;
    case Sort.ReadingTime:
      return sortItemsByReadingTime;
    case Sort.Views:
      return sortItemsByViews;
    case Sort.ViewsPerDay:
      return sortItemsByViewsPerDay;
  }
}
