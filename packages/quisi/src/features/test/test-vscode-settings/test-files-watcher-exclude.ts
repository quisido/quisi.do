const FILES = new Set<string>(['.cache/', '.tests/', 'dist/', 'node_modules/']);

export default function testFilesWatcherExclude(settings: object): void {
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

  for (const file of FILES) {
    const value: unknown =
      // @ts-expect-error: TypeScript won't allow variable indices, even if you
      // check that they exist first.
      filesWatcherExclude[file] ?? filesWatcherExclude[`**/${file}`];
    if (typeof value !== 'boolean' || !value) {
      throw new Error(
        `Expected .vscode/settings.json "files.watcherExclude" value for "${file}" to be true.`,
      );
    }
  }
}
