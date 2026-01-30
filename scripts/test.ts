import type { Dirent } from 'node:fs';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const workspaceDirectories: readonly Dirent[] = await getWorkspaceDirectories();

for (const workspaceDirectory of workspaceDirectories) {
  try {
    // eslint-disable-next-line no-await-in-loop
    await npmExecWorkspace(workspaceDirectory.name, 'test');
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exitCode = 1;
    break;
  }
}
