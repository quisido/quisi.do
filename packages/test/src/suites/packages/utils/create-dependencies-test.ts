import type TreeLogger from '@monorepo-template/tree-logger';
import type PackageJson from '../../../types/package-json.js';
import noop from '../../../utils/noop.js';
import mapPackageJsonToDependenciesSet from './map-package-json-to-dependencies-set.js';
import mapPackageJsonToPeerDependenciesList from './map-package-json-to-peer-dependencies-list.js';

interface Params {
  readonly dependencyKey: 'dependencies' | 'devDependencies';
  readonly packageJson: PackageJson;
  readonly packageNameToJsonMap: Readonly<Map<string, PackageJson>>;
}

const WORKSPACE_VERSION = /^workspace:.*$/;

export default function createDependenciesTest({
  dependencyKey,
  packageJson,
  packageNameToJsonMap,
}: Readonly<Params>): (this: Readonly<TreeLogger>) => void {
  // For each workspace dependency,
  const record: Record<string, string> | undefined = packageJson[dependencyKey];

  if (typeof record === 'undefined') {
    return noop;
  }

  return function testDependencies(this: Readonly<TreeLogger>): void {
    for (const [name, version] of Object.entries(record)) {
      // If this isn't a dependency in the workspace, then there's nothing to
      //   test.
      if (!WORKSPACE_VERSION.test(version)) {
        continue;
      }

      // If the dependency doesn't exist in the workspace, log an error.
      const dependencyPackageJson: PackageJson | undefined =
        packageNameToJsonMap.get(name);
      if (typeof dependencyPackageJson === 'undefined') {
        this.addError(
          new Error(
            `Expected to find \`${name}\` in the \`packages\` directory.`,
          ),
        );
        continue;
      }

      // Validate that all peer dependencies are present.
      const packageDependenciesSet: Set<string> =
        mapPackageJsonToDependenciesSet(packageJson);
      const filterByMissingDependency = (dependency: string): boolean =>
        !packageDependenciesSet.has(dependency);
      const dependencyPeerDependenciesList: readonly string[] =
        mapPackageJsonToPeerDependenciesList(dependencyPackageJson);
      const missingDependencies: readonly string[] =
        dependencyPeerDependenciesList.filter(filterByMissingDependency);
      for (const missingDependency of missingDependencies) {
        this.addError(
          new Error(
            `Expected dependency \`${missingDependency}\` as required by \`${name}\`.`,
          ),
        );
      }
    }
  };
}
