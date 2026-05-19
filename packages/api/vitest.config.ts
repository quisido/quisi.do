import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      all: true,
      enabled: true,
      exclude: ['src/**/*.test.ts'],
      include: ['src/**/*.ts'],
      provider: 'istanbul',
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    mockReset: true,
    restoreMocks: true,
  },
});
