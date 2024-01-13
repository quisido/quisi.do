import type Item from '../types/packages-item.js';

export default function sortByTotalDownloads(a: Item, b: Item): number {
  return a.totalDownloads - b.totalDownloads;
}
