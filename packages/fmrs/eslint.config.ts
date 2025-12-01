import configs, {
  defineConfig,
  disableRulesForFiles,
} from '@quisido/eslint-config';
import type { Config } from 'eslint/config';

const CONFIG: readonly Config[] = defineConfig(
  ...configs,

  ...disableRulesForFiles({
    '@typescript-eslint/no-base-to-string': ['src/map-to-string.ts'],
    '@typescript-eslint/no-unused-vars': ['src/reduce-entries-to-record.ts'],

    '@typescript-eslint/prefer-reduce-type-parameter': [
      'src/map-entries-to-record.ts',
    ],
    'max-statements': ['src/map-to-string.ts'],
    'no-magic-numbers': ['src/*.test.ts'],
  }),

  {
    files: ['src/reduce-entries-to-record.ts'],
    rules: {
      'max-params': ['error', { max: 4 }],
    },
  },
);

export default CONFIG;
