import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type PackageJson from '../types/package-json.js';

export default function mapPathToPackageJson(path: string): PackageJson {
  const packageFileName: string = join(path, 'package.json');
  const packageContents: string = readFileSync(packageFileName, 'utf8');
  const packageJson: PackageJson = JSON.parse(
    packageContents,
  ) as unknown as PackageJson;
  return packageJson;
}
