import process from 'node:process';
import { join } from 'node:path';
import isDirectory from '../../../utils/is-directory.js';

export default async function testSearchExclude(
  settings: object,
): Promise<void> {
  if (!('search.exclude' in settings)) {
    throw new Error(
      'Expected .vscode/settings.json to contain "search.exclude".',
    );
  }

  const searchExclude: unknown = settings['search.exclude'];
  if (typeof searchExclude !== 'object' || searchExclude === null) {
    throw new Error(
      'Expected .vscode/settings.json\'s "search.exclude" to be an object.',
    );
  }

  const excludes = new Set<string>(['node_modules/']);
  const cwd: string = process.cwd();
  for (const exclude of ['.cache', '.tests', 'dist']) {
    // eslint-disable-next-line no-await-in-loop
    if (!(await isDirectory(join(cwd, exclude)))) {
      continue;
    }
    excludes.add(`${exclude}/`);
  }

  for (const exclude of excludes) {
    const value: unknown =
      // @ts-expect-error: TypeScript won't allow variable indices, even if you
      // check that they exist first.
      searchExclude[exclude] ?? searchExclude[`**/${exclude}`];
    if (typeof value !== 'boolean' || !value) {
      throw new Error(
        `Expected .vscode/settings.json "search.exclude" value for "${exclude}" to be true.`,
      );
    }
  }
}
