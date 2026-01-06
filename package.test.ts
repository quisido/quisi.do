import { describe, expect, it } from 'vitest';
import packageJson from './package.json' with { type: 'json' };
import type PackageJson from './types/package-json.js';
import mapDirectoryToPackageJson from './utils/map-directory-to-package-json.js';
import reducePackageJsonsToOverrides from './utils/reduce-package-jsons-to-overrides.js';
import { WORKSPACES } from './utils/workspaces.js';

describe('package.json', (): void => {
  /**
   *   NPM only respects `overrides` in the root `package.json`, but including
   * them in the workspace `package.json` allows the workspace to function
   * autonomously if it were ever to split from the monorepo.
   */
  describe('overrides', (): void => {
    it('should contain workspace overrides', async (): Promise<void> => {
      const packageJsons: readonly PackageJson[] = await Promise.all(
        WORKSPACES.map(mapDirectoryToPackageJson),
      );
      const rootOverrides: Record<string, Record<string, string> | string> =
        packageJsons.reduce(reducePackageJsonsToOverrides, {});
      expect(packageJson.overrides).toStrictEqual(rootOverrides);
    });
  });
});
