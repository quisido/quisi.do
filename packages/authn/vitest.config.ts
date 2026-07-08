import { defineVitestConfig, type VitestConfig } from 'quisido/vitest';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      enabled: false,
    },
  },
});

export default CONFIG;
