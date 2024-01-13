import MINIMUM_DOWNLOADS from '../constants/minimum-package-downloads.js';
import type Item from '../types/packages-item.js';

export default function filterPackagesByMinimumDownloads({
  totalDownloads,
}: Readonly<Item>): boolean {
  return totalDownloads >= MINIMUM_DOWNLOADS;
}
