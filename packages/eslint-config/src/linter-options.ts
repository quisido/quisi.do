import type { ESLintLinterOptions } from "./eslint-linter-options.js";

export const LINTER_OPTIONS: Required<ESLintLinterOptions> = {
  noInlineConfig: true,
  reportUnusedDisableDirectives: 'error',
};
