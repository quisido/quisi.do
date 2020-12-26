import Item from '../types/item';

export default function filterItemsByMinimumTotalDownloads({
  totalDownloads,
}: Item): boolean {
  return totalDownloads >= 2500;
}
