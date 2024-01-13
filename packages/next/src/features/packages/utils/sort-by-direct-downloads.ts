import type Item from '../types/packages-item.js';

export default function sortByDirectDownloads(a: Item, b: Item): number {
  return a.directDownloads - b.directDownloads;
}
