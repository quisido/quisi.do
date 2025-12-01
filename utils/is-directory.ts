import type { Dirent } from 'node:fs';

export default function isDirectory(dirent: Dirent): boolean {
  return dirent.isDirectory();
}
