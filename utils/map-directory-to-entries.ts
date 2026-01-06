import { type Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export default function mapDirectoryToEntries(
  dirent: Dirent,
): Promise<readonly Dirent[]> {
  return readdir(join(dirent.parentPath, dirent.name), {
    withFileTypes: true,
  });
}
