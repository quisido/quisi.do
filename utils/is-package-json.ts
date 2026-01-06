import { type Dirent } from 'node:fs';

export default function isPackageJson(dirent: Dirent): boolean {
  return dirent.isFile() && dirent.name === 'package.json';
}
