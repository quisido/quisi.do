import DEFAULT_CONFIG, {
  COVERAGE_OPTIONS,
  defineConfig,
  INLINE_CONFIG,
  type UserConfig,
} from '@quisido/vitest-config';

const CONFIG: UserConfig = defineConfig({
  ...DEFAULT_CONFIG,
  test: {
    ...INLINE_CONFIG,

    coverage: {
      ...COVERAGE_OPTIONS,

      thresholds: {
        branches: 6,
        functions: 7,
        lines: 24,
        statements: 25,
      },
    },
  },
});

export default CONFIG;
