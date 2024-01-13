import type Item from '../types/packages-item.js';

export default function sortByPackageName(a: Item, b: Item): number {
  return a.packageName.localeCompare(b.packageName);
}
