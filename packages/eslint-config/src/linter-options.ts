import type { ESLintLinterOptions } from './eslint-linter-options.js';

export const LINTER_OPTIONS: Required<ESLintLinterOptions> = {
  // It's unrealistic for all edge cases to be covered by a root file.
  noInlineConfig: false,
  reportUnusedDisableDirectives: 'error',
  reportUnusedInlineConfigs: 'error',
};
