import DEFAULT_CONFIG, {
  COVERAGE_OPTIONS,
  defineConfig,
  INLINE_CONFIG,
  THRESHOLDS,
  type UserConfig,
} from '@quisido/vitest-config';

const CONFIG: UserConfig = defineConfig({
  ...DEFAULT_CONFIG,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      thresholds: {
        ...THRESHOLDS,

        /**
         *   Technical debt: These can easily be 100%. Grind 'em out once the
         * dashboard is complete!
         */
        branches: 63,
        functions: 84,
        lines: 82,
        statements: 82,
      },
    },
  },
});

export default CONFIG;
