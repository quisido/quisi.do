import PublicationCardsSort from '../constants/publication-cards-sort';
import sortItemsByPublicationDate from '../sort/sort-publication-card-items-by-publication-date';
import sortItemsByReactions from '../sort/sort-publication-card-items-by-reactions';
import sortItemsByReactionsPerDay from '../sort/sort-publication-card-items-by-reactions-per-day';
import sortItemsByReactionsPerView from '../sort/sort-publication-card-items-by-reactions-per-view';
import sortItemsByReadingTime from '../sort/sort-publication-card-items-by-reading-time';
import sortItemsByViews from '../sort/sort-publication-card-items-by-views';
import sortItemsByViewsPerDay from '../sort/sort-publication-card-items-by-views-per-day';
import PublicationCardItem from '../types/publication-card-item';

type SortFunction<Item> = (a: Item, b: Item) => -1 | 0 | 1;

export default function mapPublicationCardsSortToFunction(
  sort: PublicationCardsSort,
): SortFunction<PublicationCardItem> {
  switch (sort) {
    case PublicationCardsSort.PublicationDate:
      return sortItemsByPublicationDate;
    case PublicationCardsSort.Reactions:
      return sortItemsByReactions;
    case PublicationCardsSort.ReactionsPerDay:
      return sortItemsByReactionsPerDay;
    case PublicationCardsSort.ReactionsPerView:
      return sortItemsByReactionsPerView;
    case PublicationCardsSort.ReadingTime:
      return sortItemsByReadingTime;
    case PublicationCardsSort.Views:
      return sortItemsByViews;
    case PublicationCardsSort.ViewsPerDay:
      return sortItemsByViewsPerDay;
  }
}
