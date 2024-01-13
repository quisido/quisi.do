import Sort from '../constants/publications-sort.js';
import type Publication from '../types/publication.js';
import sortItemsByPublicationDate from '../utils/sort-publications-items-by-publication-date.js';
import sortItemsByReactions from '../utils/sort-publications-items-by-reactions.js';
import sortItemsByReactionsPerDay from '../utils/sort-publications-items-by-reactions-per-day.js';
import sortItemsByReactionsPerView from '../utils/sort-publications-items-by-reactions-per-view.js';
import sortItemsByReadingTime from '../utils/sort-publications-items-by-reading-time.js';
import sortItemsByViews from '../utils/sort-publications-items-by-views.js';
import sortItemsByViewsPerDay from '../utils/sort-publications-items-by-views-per-day.js';

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
