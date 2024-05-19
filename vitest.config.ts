import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    environment: 'node',
    mockReset: true,
    restoreMocks: true,

    coverage: {
      all: true,
      clean: true,
      enabled: true,
      ignoreEmptyLines: true,
      provider: 'v8',
      skipFull: true,

      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },

    exclude: [
      ...configDefaults.exclude,
      '.yarn/**',
      'coverage/**',
      'packages/**',
    ],
  },
});
