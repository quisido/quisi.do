import tsPlugin from '@typescript-eslint/eslint-plugin';
import type { Linter } from 'eslint';
import ts from 'typescript-eslint';
import JS from './js.js';
import reduceFlatConfigsToRules from './reduce-flat-configs-to-rules.js';
import { TYPESCRIPT_LANGUAGE_OPTIONS } from './typescript-language-options.js';

export default {
  ...JS,
  files: ['**/*.ts'],
  ignores: ['**/*.d.ts', '**/*.test.ts'],
  languageOptions: TYPESCRIPT_LANGUAGE_OPTIONS,
  name: '@quisido/ts',

  plugins: {
    ...JS.plugins,
    '@typescript-eslint': tsPlugin,
  },

  rules: {
    ...JS.rules,
    ...ts.configs.base.rules,
    ...ts.configs.eslintRecommended.rules,
    ...ts.configs.stylisticTypeChecked.reduce(reduceFlatConfigsToRules, {}),
    ...ts.configs.recommendedTypeChecked.reduce(reduceFlatConfigsToRules, {}),
    ...ts.configs.strictTypeChecked.reduce(reduceFlatConfigsToRules, {}),
    'no-invalid-this': 'off',

    // Exhaustive `switch`es do not require a default case.
    'default-case': 'off',

    /**
     *   ESLint incorrectly flags shadowing in TypeScript: (1) `enum`s and (2)
     * functions with `this` inside other functions with `this`.
     */
    'no-shadow': 'off',
  },
} satisfies Required<Omit<Linter.FlatConfig, 'processor'>>;
