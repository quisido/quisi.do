import { assert, describe, expect, it } from 'vitest';
import { ESLint } from 'eslint';
import config from './index.js';

class QuisidoESLint extends ESLint {
  public constructor() {
    super({ overrideConfig: config });
  }
}

describe('@quisido/eslint-config', (): void => {
  it('should be a valid ESLint configuration', async (): Promise<void> => {
    const linter: ESLint = new QuisidoESLint();
    await linter.lintText('{}');
  });

  // When the Schema Store is inaccessible, the linter fails silently.
  // This test asserts that the Schema Store is functional.
  it('should use the Schema Store catalog', async (): Promise<void> => {
    const linter: ESLint = new QuisidoESLint();
    const [firstResult] = await linter.lintText('abcdefg: hijkl\n', {
      filePath: '.github/workflows/test.yml',
    });
    assert(firstResult !== undefined);
    expect(firstResult.messages.length).toBeGreaterThan(0);
  });

  it('should lint GitHub workflows', async (): Promise<void> => {
    const linter: ESLint = new QuisidoESLint();

    const configForFile: unknown = await linter.calculateConfigForFile(
      '.github/workflows/main.yml',
    );

    expect(configForFile).toHaveProperty([
      'rules',
      'json-schema-validator/no-invalid',
    ]);
  });
});
