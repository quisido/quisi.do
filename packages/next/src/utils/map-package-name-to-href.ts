import mapPackageNameToRepositoryName from '../utils/map-package-name-to-repository-name';

const MONOREPO_DEPENDENCIES = new Set([
  'aws-rum-react',
  'fullstory-react',
  'react-datadog',
  'unknown2string',
  'use-offline',
]);

export default function mapPackageNameToRepositoryHref(
  packageName: string,
): string {
  // Monorepo template dependencies
  if (packageName.startsWith('@monorepo-template/')) {
    const [, packageDirectory] = packageName.split('/');
    return `https://github.com/monorepo-template/dependencies/tree/main/packages/${packageDirectory}#readme`;
  }

  if (MONOREPO_DEPENDENCIES.has(packageName)) {
    return `https://github.com/CharlesStover/quisi.do/tree/main/packages/${packageName}#readme`;
  }

  return `https://github.com/CharlesStover/${mapPackageNameToRepositoryName(
    packageName,
  )}#readme`;
}
