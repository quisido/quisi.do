import type { Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';
import isDirectory from '../../utils/is-directory.js';

export default async function getWorkspaceDirectories(): Promise<
  readonly Dirent[]
> {
  const packages: Dirent[] = await readdir('./packages', {
    withFileTypes: true,
  });

  return packages.filter(isDirectory);
}
