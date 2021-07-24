import Sort from './publications.constant.sort';
import sortItemsByPublicationDate from './publications.sort.items-by-publication-date';
import sortItemsByReactions from './publications.sort.items-by-reactions';
import sortItemsByReactionsPerDay from './publications.sort.items-by-reactions-per-day';
import sortItemsByReactionsPerView from './publications.sort.items-by-reactions-per-view';
import sortItemsByReadingTime from './publications.sort.items-by-reading-time';
import sortItemsByViews from './publications.sort.items-by-views';
import sortItemsByViewsPerDay from './publications.sort.items-by-views-per-day';
import type Item from './publications.type.item';

export default function mapPublicationsSortToFunction(
  sort: Sort,
): (a: Readonly<Item>, b: Readonly<Item>) => number {
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
