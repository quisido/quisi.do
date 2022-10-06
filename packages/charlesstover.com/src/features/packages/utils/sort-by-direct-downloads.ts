import type Item from '../types/packages-item';

export default function sortByDirectDownloads(a: Item, b: Item): number {
  return a.directDownloads - b.directDownloads;
}
