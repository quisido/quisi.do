import type TreeLogger from '@monorepo-template/tree-logger';
import { readdirSync } from 'fs';
import { join } from 'path';
import type PackageJson from '../../types/package-json.js';
import type Test from '../../types/test.js';
import filterByDefined from '../../utils/filter-by-defined.js';
import filterByRecord from '../../utils/filter-by-record.js';
import filterByUndefined from '../../utils/filter-by-undefined.js';
import mapPathToPackageJson from '../../utils/map-path-to-package-json.js';
import MISSING_PACKAGES_DIRECTORY_ERROR from './constants/missing-packages-directory-error.js';
import createDependenciesTest from './utils/create-dependencies-test.js';
import failPackageJsonFiles from './utils/fail-package-json-files.js';
import mapPackageDirectoryToMissingPackageJsonError from './utils/map-package-directory-to-missing-package-json-error.js';
import mapPackageJsonExportsToTest from './utils/map-package-json-exports-to-test.js';

const DEPENDENCY_KEYS = ['dependencies' as const, 'devDependencies' as const];

export default class PackagesTest implements Test {
  private _packagesDirectory = 'packages';

  private readonly _root: string;

  public constructor(root: string = process.cwd()) {
    this._root = root;
  }

  public get test(): (this: Readonly<TreeLogger>) => void {
    const getPackageDirectories = this.getPackageDirectories.bind(this);
    const mapPackageDirectoryToPackageJson =
      this.mapPackageDirectoryToPackageJson.bind(this);

    return function testPackages(this: Readonly<TreeLogger>): void {
      const packageDirectories: readonly string[] = getPackageDirectories();
      const packageDirectoryToJsonMap: Map<string, PackageJson> = new Map();
      const packageNameToJsonMap: Map<string, PackageJson> = new Map();

      for (const packageDirectory of packageDirectories) {
        const packageJson: PackageJson =
          mapPackageDirectoryToPackageJson(packageDirectory);
        packageDirectoryToJsonMap.set(packageDirectory, packageJson);
        packageNameToJsonMap.set(packageJson.name, packageJson);
      }

      const mapPackageDirectoryToTest = (
        packageDirectory: string,
      ): ((this: Readonly<TreeLogger>) => void) => {
        return function testPackage(this: Readonly<TreeLogger>): void {
          const packageJson: PackageJson | undefined =
            packageDirectoryToJsonMap.get(packageDirectory);

          if (filterByUndefined(packageJson)) {
            this.addError(
              mapPackageDirectoryToMissingPackageJsonError(packageDirectory),
            );
            return;
          }

          // Check for an `exports` property.
          const { exports, files } = packageJson;
          if (filterByRecord(exports)) {
            this.scope('exports', mapPackageJsonExportsToTest(exports));
          }

          // Check for a `files` property.
          if (filterByDefined(files)) {
            this.scope('files', failPackageJsonFiles);
          }

          // Check for missing peer dependencies.
          for (const dependencyKey of DEPENDENCY_KEYS) {
            if (
              !Object.prototype.hasOwnProperty.call(packageJson, dependencyKey)
            ) {
              continue;
            }

            this.scope(
              dependencyKey,
              createDependenciesTest({
                dependencyKey,
                packageJson,
                packageNameToJsonMap,
              }),
            );
          }
        };
      };

      for (const packageDirectory of packageDirectories) {
        this.scope(
          packageDirectory,
          mapPackageDirectoryToTest(packageDirectory),
        );
      }
    };
  }

  private get packageDirectories(): readonly string[] {
    if (!readdirSync(this._root).includes(this._packagesDirectory)) {
      throw MISSING_PACKAGES_DIRECTORY_ERROR;
    }

    const packagesPath: string = join(this._root, this._packagesDirectory);
    return readdirSync(packagesPath);
  }

  public setPackagesDirectory(dir: string): this {
    this._packagesDirectory = dir;
    return this;
  }

  private getPackageDirectories(): readonly string[] {
    return this.packageDirectories;
  }

  private mapPackageDirectoryToPackageJson(packageDir: string): PackageJson {
    const path: string = join(this._root, this._packagesDirectory, packageDir);
    return mapPathToPackageJson(path);
  }
}
