import { type Dirent } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type PackageJson from '../../types/package-json.js';

export default async function mapDirentToPackageJson(
  dirent: Dirent,
): Promise<PackageJson> {
  const packageJsonPath = join(dirent.parentPath, dirent.name, 'package.json');
  const contentsBuffer: Buffer = await readFile(packageJsonPath);
  const contentsStr: string = contentsBuffer.toString();
  return JSON.parse(contentsStr) as PackageJson;
}
