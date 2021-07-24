import Sort from './publication-cards.constant.sort';
import sortItemsByPublicationDate from './publication-cards.sort.items-by-publication-date';
import sortItemsByReactions from './publication-cards.sort.items-by-reactions';
import sortItemsByReactionsPerDay from './publication-cards.sort.items-by-reactions-per-day';
import sortItemsByReactionsPerView from './publication-cards.sort.items-by-reactions-per-view';
import sortItemsByReadingTime from './publication-cards.sort.items-by-reading-time';
import sortItemsByViews from './publication-cards.sort.items-by-views';
import sortItemsByViewsPerDay from './publication-cards.sort.items-by-views-per-day';
import type Item from './publication-cards.type.item';

export default function mapPublicationCardsSortToFunction(
  sort: Sort,
): (a: Item, b: Item) => number {
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
