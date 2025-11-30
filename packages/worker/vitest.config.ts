import config, {
  COVERAGE_OPTIONS,
  defineConfig,
  EXCLUDE,
  INLINE_CONFIG,
  type UserConfig,
} from '@quisido/vitest-config';

const CONFIG: UserConfig = defineConfig({
  ...config,
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      exclude: [...EXCLUDE, 'scripts/'],
    },
  },
});

export default CONFIG;
