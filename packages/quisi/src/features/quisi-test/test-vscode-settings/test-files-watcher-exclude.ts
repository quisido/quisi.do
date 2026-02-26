import process from 'node:process';
import { join } from 'node:path';
import isDirectory from '../../../utils/is-directory.js';

export default async function testFilesWatcherExclude(
  settings: object,
): Promise<void> {
  if (!('files.watcherExclude' in settings)) {
    throw new Error(
      'Expected .vscode/settings.json to contain "files.watcherExclude".',
    );
  }

  const filesWatcherExclude: unknown = settings['files.watcherExclude'];
  if (typeof filesWatcherExclude !== 'object' || filesWatcherExclude === null) {
    throw new Error(
      'Expected .vscode/settings.json\'s "files.watcherExclude" to be an object.',
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
      filesWatcherExclude[exclude] ?? filesWatcherExclude[`**/${exclude}`];
    if (value !== true) {
      throw new Error(
        `Expected .vscode/settings.json "files.watcherExclude" value for "${exclude}" to be true.`,
      );
    }
  }
}
