import Sort from '../constants/sort';
import Item from '../types/item';
import sortItemsByPublicationDate from '../utils/sort-items-by-publication-date';
import sortItemsByReactions from '../utils/sort-items-by-reactions';
import sortItemsByReactionsPerDay from '../utils/sort-items-by-reactions-per-day';
import sortItemsByReactionsPerView from '../utils/sort-items-by-reactions-per-view';
import sortItemsByReadingTime from '../utils/sort-items-by-reading-time';
import sortItemsByViews from '../utils/sort-items-by-views';
import sortItemsByViewsPerDay from '../utils/sort-items-by-views-per-day';

type SortFunction<Item> = (a: Item, b: Item) => -1 | 0 | 1;

export default function mapSortToSortFunction(sort: Sort): SortFunction<Item> {
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
