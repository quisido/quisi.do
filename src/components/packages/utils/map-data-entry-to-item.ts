import PACKAGE_DEPENDENCIES from '../../../constants/package-dependencies';
import PACKAGE_DESCRIPTIONS from '../../../constants/package-descriptions';
import reduceArrayToSum from '../../../utils/reduce-array-to-sum';
import Item from '../types/item';
import mapPackageNameToRepositoryName from '../utils/map-package-name-to-repository-name';

export default function mapDataEntryToItem(
  [packageName, downloads]: [string, number[]],
  entries: [string, number[]][],
): Item {
  const totalDownloads: number = downloads.reduce(reduceArrayToSum, 0);
  let uniqueDownloads: number = totalDownloads;
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
      uniqueDownloads -= dependentDownloads.reduce(reduceArrayToSum, 0);
      break;
    }
  }
  return {
    description: PACKAGE_DESCRIPTIONS.get(packageName),
    downloads,
    filteringText: '',
    isHighlighted: false,
    packageName,
    repositoryName: mapPackageNameToRepositoryName(packageName),
    title: packageName,
    totalDownloads,
    uniqueDownloads,
    value: uniqueDownloads,
  };
}
