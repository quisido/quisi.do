/// <reference types="node" />
import { readFileSync } from 'node:fs';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

interface PackageJson {
  readonly dependencies?: Record<string, string>;
  readonly devDependencies?: Record<string, string>;
  readonly name: string;
}

const EMPTY = 0;
const EMPTY_SET: ReadonlySet<never> = new Set();
const PACKAGE_WORKSPACE_DIRECTORIES = new Map<string, string>();
const WORKSPACE_DEPENDENCIES = new Map<string, ReadonlySet<string>>();
const WORKSPACE_TOPOLOGICAL_DEPENDENCIES = new Map<
  string,
  ReadonlySet<string>
>();

const workspaceDirectories: readonly string[] = getWorkspaceDirectories();

for (const workspaceDirectory of workspaceDirectories) {
  const {
    dependencies = {},
    devDependencies = {},
    name,
  } = JSON.parse(
    readFileSync(`./packages/${workspaceDirectory}/package.json`).toString(),
  ) as PackageJson;

  PACKAGE_WORKSPACE_DIRECTORIES.set(name, workspaceDirectory);
  WORKSPACE_DEPENDENCIES.set(
    workspaceDirectory,
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

    npmExecWorkspace(workspaceDirectory, 'run-script', 'build');
    WORKSPACE_TOPOLOGICAL_DEPENDENCIES.delete(workspaceDirectory);
    deleteTopologicalDependency(workspaceDirectory);
  }
}
