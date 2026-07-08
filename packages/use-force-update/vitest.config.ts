import { defineVitestConfig, type VitestConfig } from 'quisido/vitest';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    environment: 'jsdom',
  },
});

export default CONFIG;
