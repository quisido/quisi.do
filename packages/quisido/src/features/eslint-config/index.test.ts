import { describe, expect, it } from 'vitest';
import config from './index.js';
import { ESLint } from 'eslint';

const ERROR_SEVERITY = 2;

describe('@quisido/eslint-config', (): void => {
  it('should be a valid ESLint configuration', async (): Promise<void> => {
    const linter = new ESLint({
      overrideConfig: config,
    });
    await linter.lintText('{}');
  });

  it('should validate GitHub workflow YAML schemas', async (): Promise<void> => {
    const linter = new ESLint({
      overrideConfig: config,
    });
    const eslintConfig: unknown = await linter.calculateConfigForFile(
      '.github/workflows/main.yml',
    );

    expect(eslintConfig).toMatchObject({
      rules: {
        'json-schema-validator/no-invalid': [
          ERROR_SEVERITY,
          {
            useSchemastoreCatalog: true,
          },
        ],
      },
    });
  });
});
