import DEFAULT_CONFIG, {
  COVERAGE_OPTIONS,
  type CoverageOptions,
  defineConfig,
  INLINE_CONFIG,
  PLUGIN_OPTIONS,
  type UserConfig,
} from '@quisido/vitest-config';
import viteReact from '@vitejs/plugin-react';

const CONFIG: UserConfig = defineConfig({
  ...DEFAULT_CONFIG,
  plugins: [...PLUGIN_OPTIONS, viteReact()],
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
    } as CoverageOptions,
    environment: 'jsdom',
  },
});

export default CONFIG;
