import type { Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import isDirectory from './scripts/utils/is-directory.js';
import type PackageJson from './types/package-json.js';
import mapDirectoryToPackageJson from './utils/map-directory-to-package-json.js';

const PACKAGES_DIRECTORY_ENTRIES: readonly Dirent[] = await readdir(
  new URL('./packages/', import.meta.url),
  { withFileTypes: true },
);

const PACKAGE_DIRECTORIES: readonly Dirent[] =
  PACKAGES_DIRECTORY_ENTRIES.filter(isDirectory);

describe('packages/', (): void => {
  describe.each(PACKAGE_DIRECTORIES)(
    '$name/',
    async (dirent: Dirent): Promise<void> => {
      const packageJson: PackageJson = await mapDirectoryToPackageJson(dirent);

      describe('package.json', (): void => {
        it('should contain a funding field', (): void => {
          expect(packageJson.funding).toEqual({
            type: 'individual',
            url: 'https://github.com/sponsors/quisido',
          });
        });
      });
    },
  );
});
