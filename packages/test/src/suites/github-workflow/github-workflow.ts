import type TreeLogger from '@monorepo-template/tree-logger';
import type PackageJson from '../../types/package-json.js';
import type Test from '../../types/test.js';
import filterByArray from '../../utils/filter-by-array.js';
import filterByRecord from '../../utils/filter-by-record.js';
import filterByString from '../../utils/filter-by-string.js';
import filterByUndefined from '../../utils/filter-by-undefined.js';
import filterEntryByRecordValue from '../../utils/filter-entry-by-record-value.js';
import mapPathToPackageJson from '../../utils/map-path-to-package-json.js';
import mapYamlPathToJson from '../../utils/map-yaml-path-to-json.js';
import noop from '../../utils/noop.js';
import DEPENDENCY_PROPERTIES from './constants/dependency-properties.js';
import EXPECTED_ON_TYPE_ERROR from './constants/expected-on-type-error.js';
import mapGitHubWorkflowEventNameToPathsTypeFail from './utils/map-github-workflow-event-name-to-paths-type-fail.js';
import mapGitHubWorkflowPathToRelative from './utils/map-github-workflow-path-to-relative.js';

const GLOB_ENDING = /(?:\/\*\*)?\/\*$/u;

export default class GitHubWorkflowTest implements Test {
  readonly #absolutePath: string;

  readonly #relativePath: string;

  #relativeWorkspacePaths: readonly string[] = [];

  public constructor(absolutePath: string) {
    this.#absolutePath = absolutePath;
    this.#relativePath = mapGitHubWorkflowPathToRelative(absolutePath);
  }

  /**
   *   The `test` getter returns a function, instead of a method, so that it has
   * access to the `GitHubWorkflowsTest` object despite that returned function
   * using a `TreeLogger` context.
   */
  public get test(): (this: Readonly<TreeLogger>) => void {
    const { on }: Record<string, unknown> = mapYamlPathToJson(
      this.#absolutePath,
    );

    // Skip. Does not target any events.
    if (typeof on === 'undefined') {
      return noop;
    }

    if (!filterByRecord(on)) {
      return function failGitHubWorkflow(this: Readonly<TreeLogger>): void {
        this.addError(EXPECTED_ON_TYPE_ERROR);
      };
    }

    const eventEntries: [string, Record<string, unknown>][] = Object.entries(
      on,
    ).filter(filterEntryByRecordValue);

    const mapEventEntryToTestEntry = this.mapEventEntryToTestEntry.bind(this);
    const testEntries: [string, (this: Readonly<TreeLogger>) => void][] =
      eventEntries.map(mapEventEntryToTestEntry);

    return function testGitHubWorkflow(this: Readonly<TreeLogger>): void {
      for (const [event, test] of testEntries) {
        this.scope(event, test);
      }
    };
  }

  public setRelativeWorkspacePaths(paths: readonly string[]): this {
    this.#relativeWorkspacePaths = paths;
    return this;
  }

  private mapEventEntryToTest([event, sources]: readonly [
    string,
    Readonly<Record<string, unknown>>,
  ]): (this: Readonly<TreeLogger>) => void {
    if (event !== 'pull_request' && event !== 'push') {
      return noop;
    }

    const { paths } = sources;
    if (typeof paths === 'undefined') {
      return noop;
    }

    if (!filterByArray(paths) || !paths.every(filterByString)) {
      return mapGitHubWorkflowEventNameToPathsTypeFail(event);
    }

    const relativePath: string = this.#relativePath;
    if (!paths.includes(relativePath)) {
      return function failGitHubWorkflowEvent(
        this: Readonly<TreeLogger>,
      ): void {
        this.addError(
          new Error(
            `Expected \`on.${event}.paths\` to include itself ('${relativePath}').`,
          ),
        );
      };
    }

    const mapPathToWorkspace = this.mapPathToWorkspace.bind(this);
    return function testGitHubWorkflowEvent(this: Readonly<TreeLogger>): void {
      const workspacePackageJsons: Map<string, PackageJson> =
        new Map<string, PackageJson>();
      for (const path of paths) {
        const workspacePath: string | undefined = mapPathToWorkspace(path);

        // Skip. Not a workspace.
        if (filterByUndefined(workspacePath)) {
          continue;
        }

        // Skip. Already tested.
        if (workspacePackageJsons.has(workspacePath)) {
          continue;
        }

        this.addItem(path.replace(GLOB_ENDING, ''));

        const packageJson = mapPathToPackageJson(workspacePath);
        workspacePackageJsons.set(workspacePath, packageJson);
      }

      const filterWorkspacePackageJsonsByPackageName = (
        packageName: string,
      ): boolean => {
        for (const { name } of workspacePackageJsons.values()) {
          if (name === packageName) {
            return true;
          }
        }
        return false;
      };

      for (const [
        workspacePath,
        packageJson,
      ] of workspacePackageJsons.entries()) {
        // Check the workspace's dependencies for other workspaces.
        for (const property of DEPENDENCY_PROPERTIES) {
          const dependenciesRecord: Record<string, string> | undefined =
            packageJson[property];

          if (typeof dependenciesRecord === 'undefined') {
            continue;
          }

          // For each dependency, check if it is a workspace package.
          for (const [packageName, packageVersion] of Object.entries(
            dependenciesRecord,
          )) {
            if (!packageVersion.startsWith('workspace:')) {
              continue;
            }

            if (filterWorkspacePackageJsonsByPackageName(packageName)) {
              continue;
            }

            this.addError(
              new Error(
                `Expected \`on.${event}.paths\` to include \`${packageName}\`'s workspace path, because it is a dependency of \`${workspacePath}\`.`,
              ),
            );
          }
        }
      }
    };
  }

  private mapEventEntryToTestEntry([event, sources]: readonly [
    string,
    Readonly<Record<string, unknown>>,
  ]): [string, (this: Readonly<TreeLogger>) => void] {
    return [event, this.mapEventEntryToTest([event, sources])];
  }

  private mapPathToWorkspace(path: string): string | undefined {
    for (const relativeWorkspacePath of this.#relativeWorkspacePaths) {
      if (
        path === relativeWorkspacePath ||
        path.startsWith(`${relativeWorkspacePath}/`)
      ) {
        return relativeWorkspacePath;
      }
    }

    return;
  }
}
