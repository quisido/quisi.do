import { readFileSync } from 'node:fs';
import type PackageJson from '../../types/package-json.js';

export default function isPublicWorkspaceDirectory(
  workspaceDirectory: string,
): boolean {
  const packageJsonStr: string = readFileSync(
    `./packages/${workspaceDirectory}/package.json`,
  ).toString();

  const { private: isPrivate = false } = JSON.parse(
    packageJsonStr,
  ) as PackageJson;

  return !isPrivate;
}
