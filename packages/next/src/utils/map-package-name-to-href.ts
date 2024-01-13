import mapPackageNameToRepositoryName from '../utils/map-package-name-to-repository-name.js';

const MONOREPO_DEPENDENCIES = new Set([
  'aws-rum-react',
  'fullstory-react',
  'lazy-i18n',
  'number-format-react',
  'react-datadog',
  'sentry-react',
  'unknown2string',
  'use-awsui-table-item-description',
  'use-next-awsui',
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
    return `https://github.com/quisido/quisi.do/tree/main/packages/${packageName}#readme`;
  }

  return `https://github.com/quisido/${mapPackageNameToRepositoryName(
    packageName,
  )}#readme`;
}
