import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  // TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      'no-magic-numbers': 'warn',
      'no-warning-comments': 'warn',
    },
  },

  // Game Engine
  {
    files: ['src/modules/game-engine/*.ts'],
    ignores: ['src/modules/game-engine/*.test.ts'],
    rules: {
      'no-restricted-properties': [
        'error',
        {
          message: "Use the engine's timestamp.",
          object: 'Date',
          property: 'now',
        },
        {
          message: "Use the engine's random number generator.",
          object: 'Math',
          property: 'random',
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          message: 'Use deterministic engine math.',
          selector: "BinaryExpression[operator='**']",
        },
      ],
    },
  },
);

export default CONFIG;
