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
        branches: 6,
        functions: 16,
        lines: 51,
        statements: 50,
      },
    },
  },
});

export default CONFIG;
