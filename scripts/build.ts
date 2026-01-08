/// <reference types="node" />
import { type Dirent } from 'node:fs';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import mapDirentToPackageJson from './utils/map-dirent-to-package-json.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const EMPTY = 0;
const EMPTY_SET: ReadonlySet<never> = new Set();
const PACKAGE_WORKSPACE_DIRECTORIES = new Map<string, string>();
const WORKSPACE_DEPENDENCIES = new Map<string, ReadonlySet<string>>();
const WORKSPACE_TOPOLOGICAL_DEPENDENCIES = new Map<
  string,
  ReadonlySet<string>
>();

const workspaceDirectories: readonly Dirent[] = await getWorkspaceDirectories();

for (const workspaceDirectory of workspaceDirectories) {
  const {
    dependencies = {},
    devDependencies = {},
    name,
    // eslint-disable-next-line no-await-in-loop
  } = await mapDirentToPackageJson(workspaceDirectory);

  PACKAGE_WORKSPACE_DIRECTORIES.set(name, workspaceDirectory.name);
  WORKSPACE_DEPENDENCIES.set(
    workspaceDirectory.name,
    new Set<string>([
      ...Object.keys(dependencies),
      ...Object.keys(devDependencies),
    ]),
  );
}

for (const [
  workspaceDirectory,
  dependencies,
] of WORKSPACE_DEPENDENCIES.entries()) {
  const reduceDependenciesToWorkspaceDirectories = (
    directories: ReadonlySet<string>,
    dependency: string,
  ): ReadonlySet<string> => {
    const dependencyWorkspaceDirectory: string | undefined =
      PACKAGE_WORKSPACE_DIRECTORIES.get(dependency);

    if (typeof dependencyWorkspaceDirectory === 'undefined') {
      return directories;
    }

    return new Set([...directories, dependencyWorkspaceDirectory]);
  };

  WORKSPACE_TOPOLOGICAL_DEPENDENCIES.set(
    workspaceDirectory,
    [...dependencies].reduce(
      reduceDependenciesToWorkspaceDirectories,
      EMPTY_SET,
    ),
  );
}

const deleteTopologicalDependency = (workspaceDirectory: string): void => {
  const isNotBuilt = (dependencyWorkspaceDirectory: string): boolean =>
    dependencyWorkspaceDirectory !== workspaceDirectory;

  for (const [
    dependentWorkspaceDirectory,
    dependencyWorkspaceDirectories,
  ] of WORKSPACE_TOPOLOGICAL_DEPENDENCIES.entries()) {
    if (!dependencyWorkspaceDirectories.has(workspaceDirectory)) {
      continue;
    }

    WORKSPACE_TOPOLOGICAL_DEPENDENCIES.set(
      dependentWorkspaceDirectory,
      new Set([...dependencyWorkspaceDirectories].filter(isNotBuilt)),
    );
  }
};

while (WORKSPACE_TOPOLOGICAL_DEPENDENCIES.size > EMPTY) {
  for (const [
    workspaceDirectory,
    dependencyWorkspaceDirectories,
  ] of WORKSPACE_TOPOLOGICAL_DEPENDENCIES.entries()) {
    if (dependencyWorkspaceDirectories.size !== EMPTY) {
      continue;
    }

    npmExecWorkspace(workspaceDirectory, 'run', 'build');
    WORKSPACE_TOPOLOGICAL_DEPENDENCIES.delete(workspaceDirectory);
    deleteTopologicalDependency(workspaceDirectory);
  }
}
