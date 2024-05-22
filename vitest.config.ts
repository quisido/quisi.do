import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    environment: 'node',
    exclude: [...defaultExclude, '.yarn/**', 'coverage/**', 'packages/**'],
    mockReset: true,
    restoreMocks: true,

    coverage: {
      all: true,
      clean: true,
      enabled: true,
      provider: 'istanbul',
      skipFull: true,

      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
