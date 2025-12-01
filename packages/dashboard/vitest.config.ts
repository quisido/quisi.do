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
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
  },
});

export default CONFIG;
