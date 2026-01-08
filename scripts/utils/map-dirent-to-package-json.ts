import { type Dirent } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type PackageJson from '../../types/package-json.js';

export default async function mapDirentToPackageJson(
  dirent: Dirent,
): Promise<PackageJson> {
  const packageJsonPath = join(dirent.parentPath, dirent.name, 'package.json');
  const contents: string = await readFile(packageJsonPath, 'utf8');
  return JSON.parse(contents) as PackageJson;
}
