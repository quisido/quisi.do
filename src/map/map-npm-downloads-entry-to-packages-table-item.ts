import PACKAGE_DEPENDENCIES from '../constants/package-dependencies';
import mapPackageNameToRepositoryName from '../map/map-package-name-to-repository-name';
import reduceArrayToSum from '../reduce/reduce-array-to-sum';
import type PackagesTableItem from '../types/packages-table-item';

const NONE = 0;

export default function mapNpmDownloadsEntryToPackagesTableItem(
  [packageName, downloads]: readonly [string, readonly number[]],
  _index: number,
  entries: readonly (readonly [string, readonly number[]])[],
): PackagesTableItem {
  const totalDownloads: number = downloads.reduce(reduceArrayToSum, NONE);
  let explicitDownloads: number = totalDownloads;
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
      explicitDownloads -= dependentDownloads.reduce(reduceArrayToSum, NONE);
      break;
    }
  }
  return {
    downloads,
    explicitDownloads,
    isHighlighted: false,
    packageName,
    repositoryName: mapPackageNameToRepositoryName(packageName),
    totalDownloads,
  };
}
