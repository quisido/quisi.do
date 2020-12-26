import Item from '../types/item';

export default function sortItemsByViews(
  { views: viewsA }: Item,
  { views: viewsB }: Item,
): -1 | 0 | 1 {
  if (viewsA < viewsB) {
    return 1;
  }
  if (viewsA > viewsB) {
    return -1;
  }
  return 0;
}
