import mapPackageNameToRepositoryName from '../utils/map-package-name-to-repository-name';

export default function mapPackageNameToRepositoryHref(
  packageName: string,
): string {
  // Monorepo template dependencies
  if (packageName.startsWith('@monorepo-template/')) {
    const [, packageDirectory] = packageName.split('/');
    return `https://github.com/monorepo-template/dependencies/tree/main/packages/${packageDirectory}#readme`;
  }

  return `https://github.com/CharlesStover/${mapPackageNameToRepositoryName(
    packageName,
  )}#readme`;
}
