const FILES = new Set<string>(['.cache/', '.tests/', 'dist/', 'node_modules/']);

export default function testSearchExclude(settings: object): void {
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

  for (const file of FILES) {
    const value: unknown =
      // @ts-expect-error: TypeScript won't allow variable indices, even if you
      // check that they exist first.
      searchExclude[file] ?? searchExclude[`**/${file}`];
    if (typeof value !== 'boolean' || !value) {
      throw new Error(
        `Expected .vscode/settings.json "search.exclude" value for "${file}" to be true.`,
      );
    }
  }
}
