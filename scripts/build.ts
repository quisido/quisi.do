import { type Dirent } from 'node:fs';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import mapDirentToPackageJson from './utils/map-dirent-to-package-json.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const TYPESCRIPT_ONLY_BUILD_SCRIPTS: ReadonlySet<string> = new Set([
  'exit 0',
  'quisido build',
  'tsc --project tsconfig.build.json',
]);

const workspaceDirectories: readonly Dirent[] = await getWorkspaceDirectories();

const buildWorkspace = async (workspaceDirectory: Dirent): Promise<void> => {
  const { scripts = {} } = await mapDirentToPackageJson(workspaceDirectory);
  const buildScript: string | undefined = scripts['build'];

  if (
    typeof buildScript === 'undefined' ||
    TYPESCRIPT_ONLY_BUILD_SCRIPTS.has(buildScript)
  ) {
    return;
  }

  await npmExecWorkspace(workspaceDirectory.name, 'run', 'build');
};

await Promise.all(workspaceDirectories.map(buildWorkspace));
