import { resolve } from 'node:path';
import mapRootToGitHubWorkflowFileNames from './map-root-to-github-workflow-file-names.js';

export default function mapRootToGitHubWorkflowPaths(
  root: string,
): readonly string[] {
  const fileNames: readonly string[] = mapRootToGitHubWorkflowFileNames(root);

  const mapFileNameToPath = (fileName: string): string =>
    resolve(root, '.github', 'workflows', fileName);

  return fileNames.map(mapFileNameToPath);
}
