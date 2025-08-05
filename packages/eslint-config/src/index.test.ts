import { describe, it } from 'vitest';
import config from './index.js';
import { ESLint } from 'eslint';

describe('@quisido/eslint-config', (): void => {
  it('should be a valid ESLint configuration', async (): Promise<void> => {
    const linter = new ESLint({
      overrideConfig: config,
    });
    await linter.lintText('{}');
  });
});
