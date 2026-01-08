import { type Dirent } from 'node:fs';
import mapDirentToPackageJson from './map-dirent-to-package-json.js';

export default async function isPublicWorkspaceDirectory(
  workspaceDirectory: Dirent,
): Promise<boolean> {
  const { private: isPrivate = false } =
    await mapDirentToPackageJson(workspaceDirectory);

  return !isPrivate;
}
