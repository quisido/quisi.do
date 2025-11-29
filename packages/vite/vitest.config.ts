import DEFAULT_CONFIG, {
  COVERAGE_OPTIONS,
  type CoverageOptions,
  defineConfig,
  INLINE_CONFIG,
  PLUGIN_OPTIONS,
  type UserConfig
} from '@quisido/vitest-config';
import viteReact from '@vitejs/plugin-react';

const CONFIG: UserConfig = defineConfig({
  ...DEFAULT_CONFIG,
  plugins: [...PLUGIN_OPTIONS, ...viteReact()],
  test: {
    ...INLINE_CONFIG,
    coverage: {
      ...COVERAGE_OPTIONS,
      thresholds: {
        branches: 3,
        functions: 5,
        lines: 6,
        statements: 6,
      },
    } as CoverageOptions,
    env: {
      CLARITY_TAG: 'test-clarity-tag',
    },
    environment: 'jsdom',
  },
});

export default CONFIG;
