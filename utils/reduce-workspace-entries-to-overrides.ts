import { type Dirent, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type PackageJson from '../types/package-json.js';

export default function reduceWorkspaceEntriesToOverrides(
  rootOverrides: Record<string, Record<string, string> | string>,
  workspace: Dirent,
): Record<string, Record<string, string> | string> {
  const packageJsonStr: string = readFileSync(
    join(workspace.parentPath, workspace.name, 'package.json'),
    'utf-8',
  );
  const packageJson: PackageJson = JSON.parse(packageJsonStr) as PackageJson;
  if (!('overrides' in packageJson)) {
    return rootOverrides;
  }

  const { overrides } = packageJson;
  if (typeof overrides !== 'object' || overrides === null) {
    return rootOverrides;
  }

  return {
    ...rootOverrides,
    ...overrides,
  };
}
