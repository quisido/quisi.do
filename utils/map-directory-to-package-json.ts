import assert from 'node:assert';
import { type Dirent } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type PackageJson from '../types/package-json.js';
import isPackageJson from './is-package-json.js';
import mapDirectoryToEntries from './map-directory-to-entries.js';

export default async function mapDirectoryToPackageJson(
  entry: Dirent,
): Promise<PackageJson> {
  const entries: readonly Dirent[] = await mapDirectoryToEntries(entry);
  const packageJson: Dirent | undefined = entries.find(isPackageJson);

  assert(
    typeof packageJson !== 'undefined',
    'Expected a package.json file to exist.',
  );

  const packageJsonStr: string = await readFile(
    join(packageJson.parentPath, packageJson.name),
    { encoding: 'utf-8' },
  );

  return JSON.parse(packageJsonStr) as PackageJson;
}
