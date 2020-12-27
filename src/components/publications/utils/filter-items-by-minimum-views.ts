import Item from '../types/item';

export default function filterItemsByMinimumViews({ views }: Item): boolean {
  return views >= 5000;
}
