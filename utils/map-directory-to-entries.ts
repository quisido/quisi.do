import type { Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export default async function mapDirectoryToEntries(
  dirent: Dirent,
): Promise<readonly Dirent[]> {
  return await readdir(join(dirent.parentPath, dirent.name), {
    withFileTypes: true,
  });
}
