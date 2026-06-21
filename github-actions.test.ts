import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const DEFAULT_BRANCH_RESTORE_KEY_EXPRESSION: string = [
  '$',
  '{{ github.event.repository.default_branch }}-',
].join('');

const readRepositoryFile = async (path: string): Promise<string> => {
  return await readFile(new URL(path, import.meta.url), 'utf8');
};

describe('GitHub Actions static analysis cache', (): void => {
  it('should restore TypeScript and ESLint caches from the default branch', async (): Promise<void> => {
    const action: string = await readRepositoryFile(
      './.github/actions/setup/action.yml',
    );

    expect(action).toContain('uses: actions/cache/restore@v4');
    expect(action).toContain('.cache/*.tsbuildinfo');
    expect(action).toContain('packages/*/.cache/*.tsbuildinfo');
    expect(action).toContain('.cache/eslint.json');
    expect(action).toContain('packages/*/.cache/eslint.json');
    expect(action).toContain(DEFAULT_BRANCH_RESTORE_KEY_EXPRESSION);
  });

  it('should save TypeScript caches only from successful default branch builds', async (): Promise<void> => {
    const action: string = await readRepositoryFile(
      './.github/actions/build/action.yml',
    );

    expect(action).toContain('uses: actions/cache/save@v4');
    expect(action).toContain(
      'github.ref_name == github.event.repository.default_branch',
    );
    expect(action).toContain("steps.build.outcome == 'success'");
    expect(action).toContain('.cache/*.tsbuildinfo');
    expect(action).toContain('packages/*/.cache/*.tsbuildinfo');
  });

  it('should save ESLint caches only from successful default branch tests', async (): Promise<void> => {
    const action: string = await readRepositoryFile(
      './.github/actions/test/action.yml',
    );

    expect(action).toContain('uses: actions/cache/save@v4');
    expect(action).toContain(
      'github.ref_name == github.event.repository.default_branch',
    );
    expect(action).toContain("steps.test.outcome == 'success'");
    expect(action).toContain('.cache/eslint.json');
    expect(action).toContain('packages/*/.cache/eslint.json');
  });
});
