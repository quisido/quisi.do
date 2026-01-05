import type PackageJson from '../types/package-json.js';

export default function reducePackageJsonsToOverrides(
  rootOverrides: Record<string, Record<string, string> | string>,
  { overrides = {} }: PackageJson,
): Record<string, Record<string, string> | string> {
  return {
    ...rootOverrides,
    ...overrides,
  };
}
