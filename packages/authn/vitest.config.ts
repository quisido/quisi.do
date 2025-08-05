import config, {
  COVERAGE_OPTIONS,
  defineConfig,
  INLINE_CONFIG,
  THRESHOLDS,
} from '@quisido/vitest-config';

export default defineConfig({
  ...config,
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
