import type PackageJson from '../../../types/package-json.js';

export default function mapPackageJsonToDependenciesSet(
  packageJson: Readonly<PackageJson>,
): Set<string> {
  const record: Record<string, string> = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  };
  const arr: readonly string[] = Object.keys(record);
  return new Set(arr);
}
