import tsPlugin from '@typescript-eslint/eslint-plugin';
import type { ESLint, Linter } from 'eslint';
import ts from 'typescript-eslint';
import JS from './js.js';
import reduceConfigsToRules from './reduce-configs-to-rules.js';
import { TYPESCRIPT_LANGUAGE_OPTIONS } from './typescript-language-options.js';

export default {
  ...JS,
  files: ['**/*.ts'],
  ignores: ['**/*.d.ts', '**/*.test.ts'],
  languageOptions: TYPESCRIPT_LANGUAGE_OPTIONS,
  name: '@quisido/ts',

  plugins: {
    ...JS.plugins,
    '@typescript-eslint': tsPlugin as unknown as ESLint.Plugin,
  },

  rules: {
    ...(JS.rules as Linter.RulesRecord),
    ...(ts.configs.base.rules as Linter.RulesRecord),
    ...(ts.configs.eslintRecommended.rules as Linter.RulesRecord),
    ...(ts.configs.stylisticTypeChecked as Linter.Config[]).reduce(
      reduceConfigsToRules,
      {},
    ),
    ...(ts.configs.recommendedTypeChecked as Linter.Config[]).reduce(
      reduceConfigsToRules,
      {},
    ),
    ...(ts.configs.strictTypeChecked as Linter.Config[]).reduce(
      reduceConfigsToRules,
      {},
    ),
    'no-invalid-this': 'off',

    // Exhaustive `switch`es do not require a default case.
    'default-case': 'off',

    /**
     *   ESLint incorrectly flags shadowing in TypeScript: (1) `enum`s and (2)
     * functions with `this` inside other functions with `this`.
     */
    'no-shadow': 'off',
  } satisfies Linter.RulesRecord,
} satisfies Required<Omit<Linter.Config, 'language' | 'processor'>>;
