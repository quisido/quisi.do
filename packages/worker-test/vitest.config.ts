import config, {
  COVERAGE_OPTIONS,
  type CoverageOptions,
  defineConfig,
  EXCLUDE,
  INLINE_CONFIG,
  THRESHOLDS,
  type UserConfig,
} from '@quisido/vitest-config';

const CONFIG: UserConfig = defineConfig({
  ...config,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      exclude: [...EXCLUDE, 'scripts/'],
      thresholds: {
        ...THRESHOLDS,
        branches: 31,
        functions: 29,
        lines: 48,
        statements: 47,
      },
    } as CoverageOptions,
  },
});

export default CONFIG;
