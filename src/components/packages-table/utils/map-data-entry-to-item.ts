import PACKAGE_DEPENDENCIES from '../../../constants/package-dependencies';
import reduceArrayToSum from '../../../utils/reduce-array-to-sum';
import Item from '../types/item';
import mapPackageNameToRepositoryName from '../utils/map-package-name-to-repository-name';

export default function mapDataEntryToItem(
  [packageName, downloads]: [string, number[]],
  _index: number,
  entries: [string, number[]][],
): Item {
  const totalDownloads: number = downloads.reduce(reduceArrayToSum, 0);
  let explicitDownloads: number = totalDownloads;
  for (const [
    dependentPackageName,
    dependencies,
  ] of PACKAGE_DEPENDENCIES.entries()) {
    for (const dependency of dependencies) {
      if (dependency !== packageName) {
        continue;
      }
      const findDependentEntry = ([entryPackageName]: [
        string,
        number[],
      ]): boolean => entryPackageName === dependentPackageName;
      const dependentEntry: [string, number[]] | undefined = entries.find(
        findDependentEntry,
      );
      if (typeof dependentEntry === 'undefined') {
        break;
      }
      const [, dependentDownloads] = dependentEntry;
      explicitDownloads -= dependentDownloads.reduce(reduceArrayToSum, 0);
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
