/* eslint-disable no-console */
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import isPublicWorkspaceDirectory from './utils/is-public-workspace-directory.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const REPUBLISH_ERROR_MESSAGE =
  'You cannot publish over the previously published versions:';

const publicWorkspaceDirectories: readonly string[] =
  getWorkspaceDirectories().filter(isPublicWorkspaceDirectory);

for (const publicWorkspaceDirectory of publicWorkspaceDirectories) {
  try {
    npmExecWorkspace(
      publicWorkspaceDirectory,
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
      console.log(`Tolerating republish for ${publicWorkspaceDirectory}`);
      continue;
    }

    // Unknown error
    throw err;
  }
}
