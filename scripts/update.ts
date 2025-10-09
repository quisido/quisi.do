import { readFileSync } from 'node:fs';
import type PackageJson from '../types/package-json.js';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const save = new Map<string, Set<string>>();
const saveDev = new Map<string, Set<string>>();
const workspaceDirectories: readonly string[] = getWorkspaceDirectories();
const workspacePackageVersions = new Map<string, string>();

for (const workspaceDirectory of workspaceDirectories) {
  const { dependencies, devDependencies, name, version } = JSON.parse(
    readFileSync(`packages/${workspaceDirectory}/package.json`, 'utf8'),
  ) as PackageJson;

  workspacePackageVersions.set(name, version);

  const workspaceSave = new Set<string>();
  const workspaceSaveDev = new Set<string>();

  if (typeof dependencies === 'object') {
    for (const name of Object.keys(dependencies)) {
      workspaceSave.add(name);
    }

    save.set(workspaceDirectory, workspaceSave);
  }

  if (typeof devDependencies === 'object') {
    for (const name of Object.keys(devDependencies)) {
      if (workspaceSave.has(name)) {
        throw new Error(
          `${workspaceDirectory} has ${name} as both a dependency and dev dependency.`,
        );
      }

      workspaceSaveDev.add(name);
    }

    saveDev.set(workspaceDirectory, workspaceSaveDev);
  }
}

const mapToLatest = (dependency: string): string => {
  if (workspacePackageVersions.has(dependency)) {
    return `${dependency}@^${workspacePackageVersions.get(dependency)}`;
  }

  return `${dependency}@latest`;
};

for (const [workspaceDirectory, dependencies] of save.entries()) {
  npmExecWorkspace(
    workspaceDirectory,
    'install',
    '--save',
    ...[...dependencies].map(mapToLatest),
  );
}

for (const [workspaceDirectory, devDependencies] of saveDev.entries()) {
  npmExecWorkspace(
    workspaceDirectory,
    'install',
    '--save-dev',
    ...[...devDependencies].map(mapToLatest),
  );
}
