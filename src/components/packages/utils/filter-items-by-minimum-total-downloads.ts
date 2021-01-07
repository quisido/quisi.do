import MINIMUM_TOTAL_DOWNLOADS from '../constants/minimum-total-downloads';
import Item from '../types/item';

export default function filterItemsByMinimumTotalDownloads({
  totalDownloads,
}: Item): boolean {
  return totalDownloads >= MINIMUM_TOTAL_DOWNLOADS;
}
