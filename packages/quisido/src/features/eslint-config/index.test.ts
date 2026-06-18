import { describe, expect, it } from 'vitest';
import config from './index.js';
import { ESLint } from 'eslint';

describe('@quisido/eslint-config', (): void => {
  it('should be a valid ESLint configuration', async (): Promise<void> => {
    const linter = new ESLint({
      overrideConfig: config,
    });
    await linter.lintText('{}');
  });

  // When the Schema Store is inaccessible, the linter fails silently.
  // This test asserts that the Schema Store is functional.
  it('should use the Schema Store catalog', async (): Promise<void> => {
    const linter = new ESLint({
      overrideConfig: config,
    });
    const results = await linter.lintText(
      'abcdefg: hijkl\n',
      { filePath: '.github/workflows/test.yml' },
    );
    expect(results[0].messages.length).toBeGreaterThan(0);
  });

  it('should lint GitHub workflows', async (): Promise<void> => {
    const linter = new ESLint({
      overrideConfig: config,
    });

    const configForFile: unknown = await linter.calculateConfigForFile(
      '.github/workflows/main.yml',
    );

    expect(configForFile).toMatchObject({
      rules: {
        'json-schema-validator/no-invalid': expect.anything(),
      },
    });
  });
});
