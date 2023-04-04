import MINIMUM_DOWNLOADS from '../constants/minimum-package-downloads';
import type Item from '../types/packages-item';

export default function filterPackagesByMinimumDownloads({
  totalDownloads,
}: Readonly<Item>): boolean {
  return totalDownloads >= MINIMUM_DOWNLOADS;
}
