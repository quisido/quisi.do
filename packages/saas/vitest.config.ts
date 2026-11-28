import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  define: {
    'import.meta.env.WHOAMI': JSON.stringify('https://authn.test/whoami/'),
  },
  plugins: [react()],
  test: {
    attachmentsDir: '.tests/vitest/attachments',
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium', name: 'Chromium' }],
      provider: playwright(),
      screenshotDirectory: '.tests/vitest/screenshots',
      trace: 'off',
      ui: false,
    },
    coverage: {
      thresholds: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
    env: {
      CLARITY_TAG: 'test-clarity-tag',
      VITE_TESTED_DESIGN_SYSTEM:
        process.env['VITE_TESTED_DESIGN_SYSTEM'] ?? 'template',
    },
    setupFiles: [
      './test/cleanup-react-testing-library.ts',
      './test/expect-to-have-attribute.ts',
    ],
    // Allow more time for slower devices to support browsers.
    testTimeout: 15_000,
  },
});

export default CONFIG;
