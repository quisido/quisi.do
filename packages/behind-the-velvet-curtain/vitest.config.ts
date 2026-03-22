import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      enabled: false,
    },
    environment: 'jsdom',
    exclude: ['src/**/browser-smoke.test.ts'],
  },
});

export default CONFIG;
