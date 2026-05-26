import { describe, expect, it } from 'vitest';
import {
  extractChangedFilePaths,
  isEslintFormattablePath,
  mapPathsToExistingFormattablePaths,
} from './format-files.js';

describe('extractChangedFilePaths', (): void => {
  it('returns changed file paths from an apply_patch command', (): void => {
    const command = [
      '*** Begin Patch',
      '*** Add File: .codex/hooks.json',
      '+{}',
      '*** Update File: package.json',
      '@@',
      ' {}',
      '*** Delete File: old.ts',
      '*** End Patch',
    ].join('\n');

    expect(extractChangedFilePaths(command)).toStrictEqual([
      '.codex/hooks.json',
      'package.json',
    ]);
  });

  it('deduplicates moved and updated file paths', (): void => {
    const command = [
      '*** Begin Patch',
      '*** Update File: old-name.ts',
      '*** Move to: new-name.ts',
      '@@',
      '-export const value = 1;',
      '+export const value = 2;',
      '*** Update File: new-name.ts',
      '@@',
      ' export const value = 2;',
      '*** End Patch',
    ].join('\n');

    expect(extractChangedFilePaths(command)).toStrictEqual([
      'old-name.ts',
      'new-name.ts',
    ]);
  });
});

describe('isEslintFormattablePath', (): void => {
  it('returns true for file extensions handled by this repository eslint config', (): void => {
    expect(isEslintFormattablePath('src/index.ts')).toBe(true);
    expect(isEslintFormattablePath('package.json')).toBe(true);
  });

  it('returns false for file extensions handled by other formatters', (): void => {
    expect(isEslintFormattablePath('src/styles.scss')).toBe(false);
    expect(isEslintFormattablePath('README.md')).toBe(false);
  });
});

describe('mapPathsToExistingFormattablePaths', (): void => {
  it('keeps existing formattable paths inside the repository', (): void => {
    const root: URL = new URL('../../', import.meta.url);

    expect(
      mapPathsToExistingFormattablePaths(root.pathname, [
        '.codex/hooks.json',
        '../../package.json',
        'README.md',
        'missing.ts',
      ]),
    ).toStrictEqual(['.codex/hooks.json']);
  });
});
