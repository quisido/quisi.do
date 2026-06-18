import { playwright } from '@vitest/browser-playwright';
import { defineVitestConfig, type VitestConfig } from 'quisido';
import { MONOGATARI_ALIASES } from './monogatari-aliases.js';

const RESOLVE_CONFIG = {
  alias: MONOGATARI_ALIASES,
};

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
            instances: [
              { browser: 'chromium', name: 'chromium' },
              { browser: 'firefox', name: 'firefox' },
              { browser: 'webkit', name: 'webkit' },
            ],
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
