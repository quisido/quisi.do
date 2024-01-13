import PACKAGE_DEPENDENCIES from '../../../constants/package-dependencies.js';
import mapPackageNameToHref from '../../../utils/map-package-name-to-href.js';
import reduceArrayToSum from '../../../utils/reduce-array-to-sum.js';
import type Item from '../types/packages-item.js';

const NONE = 0;

export default function mapNpmDownloadsEntryToPackagesItem(
  [packageName, downloads]: readonly [string, readonly number[]],
  _index: number,
  entries: readonly (readonly [string, readonly number[]])[],
): Item {
  const totalDownloads: number = downloads.reduce(reduceArrayToSum, NONE);
  let directDownloads: number = totalDownloads;
  for (const [
    dependentPackageName,
    dependencies,
  ] of PACKAGE_DEPENDENCIES.entries()) {
    for (const dependency of dependencies) {
      if (dependency !== packageName) {
        continue;
      }
      const findDependentEntry = ([entryPackageName]: readonly [
        string,
        readonly number[],
      ]): boolean => entryPackageName === dependentPackageName;
      const dependentEntry: readonly [string, readonly number[]] | undefined =
        entries.find(findDependentEntry);
      if (typeof dependentEntry === 'undefined') {
        break;
      }
      const [, dependentDownloads] = dependentEntry;
      directDownloads -= dependentDownloads.reduce(reduceArrayToSum, NONE);
      break;
    }
  }
  return {
    directDownloads,
    downloads,
    href: mapPackageNameToHref(packageName),
    isHighlighted: false,
    packageName,
    totalDownloads,
  };
}
