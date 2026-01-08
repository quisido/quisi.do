import type { Dirent } from 'node:fs';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const workspaceDirectories: readonly Dirent[] = await getWorkspaceDirectories();

for (const workspaceDirectory of workspaceDirectories) {
  // eslint-disable-next-line no-await-in-loop
  await npmExecWorkspace(workspaceDirectory.name, 'test');
}
