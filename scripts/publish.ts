/* eslint-disable no-console */
import type { Dirent } from 'node:fs';
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import isPublicWorkspaceDirectory from './utils/is-public-workspace-directory.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const REPUBLISH_ERROR_MESSAGE =
  'You cannot publish over the previously published versions:';

const workspaceDirectories: readonly Dirent[] = await getWorkspaceDirectories();

for (const workspaceDirectory of workspaceDirectories) {
  const isPublic: boolean =
    // eslint-disable-next-line no-await-in-loop
    await isPublicWorkspaceDirectory(workspaceDirectory);
  if (!isPublic) {
    continue;
  }

  try {
    // eslint-disable-next-line no-await-in-loop
    await npmExecWorkspace(
      workspaceDirectory.name,
      'publish',
      '--access',
      'public',
      '--provenance',
    );
  } catch (err: unknown) {
    // Unknown error
    if (!(err instanceof Error)) {
      throw err;
    }

    // Tolerate republish
    if (err.message.includes(REPUBLISH_ERROR_MESSAGE)) {
      console.log(`Tolerating republish for ${workspaceDirectory.name}`);
      continue;
    }

    // Unknown error
    throw err;
  }
}
