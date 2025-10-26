import type { Dirent } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { describe } from 'vitest';
import isDirectory from './is-directory.js';

const PACKAGES_DIRECTORY_ENTRIES: readonly Dirent[] = await readdir(
  new URL('../packages/', import.meta.url),
  { withFileTypes: true },
);

const PACKAGE_DIRECTORIES: readonly Dirent[] =
  PACKAGES_DIRECTORY_ENTRIES.filter(isDirectory);

export default function describeWorkspaces(
  fn: (dirent: Dirent) => Promise<void> | void,
): void {
  describe('packages/', (): void => {
    describe.each(PACKAGE_DIRECTORIES)('$name/', fn);
  });
}
