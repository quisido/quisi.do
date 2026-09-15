import { defineESLintConfig, type ESLintConfig } from 'quisido';

const CONFIG: readonly ESLintConfig[] = defineESLintConfig(
  // TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      'no-warning-comments': 'warn',
    },
  },

  // Game Engine
  {
    files: ['src/modules/game/*.ts'],
    ignores: ['src/modules/game/*.test.ts'],
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

  // Temporarily disabled for performance reasons.
  {
    rules: {
      '@typescript-eslint/no-deprecated': 'off', // 2s
      '@typescript-eslint/no-floating-promises': 'off', // 13s
      '@typescript-eslint/no-misused-promises': 'off', // 4s
      '@typescript-eslint/no-unsafe-assignment': 'off', // 6s
      '@typescript-eslint/no-unused-vars': 'off', // 1s
    },
  }
);

export default CONFIG;
