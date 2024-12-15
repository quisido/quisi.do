import type TreeLogger from '@monorepo-template/tree-logger';
import { isString } from 'fmrs';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import GitHubWorkflowTest from '../../suites/github-workflow/index.js';
import type PackageJson from '../../types/package-json.js';
import type Test from '../../types/test.js';
import mapPathToPackageJson from '../../utils/map-path-to-package-json.js';
import mapYamlFilePathToName from '../../utils/map-yaml-file-path-to-name.js';
import MISSING_PACKAGE_WORKSPACES_PROPERTY_ERROR from './constants/missing-package-workspaces-property-error.js';
import PACKAGE_WORKSPACES_TYPE_ERROR from './constants/package-workspaces-type-error.js';
import mapRootToGitHubWorkflowPaths from './utils/map-root-to-github-workflow-paths.js';
import mapWorkspaceGlobToEndsWithError from './utils/map-workspace-glob-to-ends-with-error.js';

const GLOB_ENDING = /\/\*$/u;

export default class GitHubWorkflowsTest implements Test {
  readonly #root: string;

  readonly #workflowPaths: readonly string[];

  readonly #workspacePaths: readonly string[];

  public constructor(root: string = process.cwd()) {
    const packageJson: PackageJson = mapPathToPackageJson(root);

    this.#root = root;
    this.#workflowPaths = mapRootToGitHubWorkflowPaths(root);
    this.#workspacePaths =
      this.mapPackageJsonToRelativeWorkspacePaths(packageJson);
  }

  // For each workspace, run a test.
  public get test(): (this: Readonly<TreeLogger>) => void {
    const getTestEntries = this.getTestEntries.bind(this);
    return function testGitHubWorkflows(this: Readonly<TreeLogger>): void {
      for (const [name, test] of getTestEntries()) {
        this.scope(name, test);
      }
    };
  }

  private get testEntries(): readonly [
    string,
    (this: Readonly<TreeLogger>) => void,
  ][] {
    const mapPathToTestEntry = this.mapPathToTestEntry.bind(this);
    return this.#workflowPaths.map(mapPathToTestEntry);
  }

  private getTestEntries(): readonly [
    string,
    (this: Readonly<TreeLogger>) => void,
  ][] {
    return this.testEntries;
  }

  private mapPackageJsonToRelativeWorkspacePaths({
    workspaces,
  }: PackageJson): readonly string[] {
    if (typeof workspaces === 'undefined') {
      throw MISSING_PACKAGE_WORKSPACES_PROPERTY_ERROR;
    }

    if (!Array.isArray(workspaces) || !workspaces.every(isString)) {
      throw PACKAGE_WORKSPACES_TYPE_ERROR;
    }

    const reduceWorkspaceGlobsToRelativePaths =
      this.reduceWorkspaceGlobsToRelativePaths.bind(this);
    return workspaces.reduce(reduceWorkspaceGlobsToRelativePaths, []);
  }

  private mapPathToTestEntry(
    path: string,
  ): [string, (this: Readonly<TreeLogger>) => void] {
    const gitHubWorkflow: GitHubWorkflowTest = new GitHubWorkflowTest(path);
    gitHubWorkflow.setRelativeWorkspacePaths(this.#workspacePaths);
    return [mapYamlFilePathToName(path), gitHubWorkflow.test];
  }

  private mapWorkspaceGlobToRelativePaths(glob: string): readonly string[] {
    if (!glob.endsWith('/*')) {
      throw mapWorkspaceGlobToEndsWithError(glob);
    }

    const relativeRoot: string = glob.replace(GLOB_ENDING, '');
    const absoluteRoot: string = join(this.#root, relativeRoot);

    /**
     *   We use `/` instead of `path.join()` because this should pass on
     * developers' Windows machines and the path will be `/` during CI.
     */
    const mapFileNameToRelativePath = (fileName: string): string =>
      `${relativeRoot}/${fileName}`;

    const newFileNames: readonly string[] = readdirSync(absoluteRoot);
    return newFileNames.map(mapFileNameToRelativePath);
  }

  private reduceWorkspaceGlobsToRelativePaths(
    paths: readonly string[],
    glob: string,
  ): readonly string[] {
    const newPaths: readonly string[] =
      this.mapWorkspaceGlobToRelativePaths(glob);
    return [...paths, ...newPaths];
  }
}
