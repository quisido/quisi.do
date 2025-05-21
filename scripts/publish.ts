/// <reference types="node" />
import getWorkspaceDirectories from './utils/get-workspace-directories.js';
import isPublicWorkspaceDirectory from './utils/is-public-workspace-directory.js';
import npmExecWorkspace from './utils/npm-exec-workspace.js';

const publicWorkspaceDirectories: readonly string[] =
  getWorkspaceDirectories().filter(isPublicWorkspaceDirectory);

for (const publicWorkspaceDirectory of publicWorkspaceDirectories) {
  npmExecWorkspace(publicWorkspaceDirectory, 'publish');
}
