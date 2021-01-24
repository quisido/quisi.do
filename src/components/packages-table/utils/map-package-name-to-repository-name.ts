const NAMESPACE = /^@charlesstover\//;

export default function mapPackageNameToRepositoryName(
  packageName: string,
): string {
  return packageName.replace(NAMESPACE, '');
}
