import { playwright } from '@vitest/browser-playwright';
import { defineVitestConfig, type VitestConfig } from 'quisido/vitest';
import { MONOGATARI_ALIASES } from './monogatari-aliases.js';

const RESOLVE_CONFIG = {
  alias: MONOGATARI_ALIASES,
};

const BROWSER_INSTANCES =
  process.env['PLAYWRIGHT_FULL_BROWSER_MATRIX'] === 'true'
    ? [
        { browser: 'chromium' as const, name: 'chromium' },
        { browser: 'firefox' as const, name: 'firefox' },
        { browser: 'webkit' as const, name: 'webkit' },
      ]
    : [{ browser: 'chromium' as const, name: 'chromium' }];

const CONFIG: VitestConfig = await defineVitestConfig({
  resolve: RESOLVE_CONFIG,
  test: {
    coverage: {
      enabled: false,
    },
    projects: [
      {
        resolve: RESOLVE_CONFIG,
        test: {
          environment: 'jsdom',
          exclude: ['src/**/browser-smoke.test.ts'],
          include: ['src/**/*.test.ts'],
          name: 'unit',
        },
      },
      {
        resolve: RESOLVE_CONFIG,
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: BROWSER_INSTANCES,
            provider: playwright({}),
          },
          include: ['src/**/browser-smoke.test.ts'],
          name: 'browser',
        },
      },
    ],
  },
});

export default CONFIG;
