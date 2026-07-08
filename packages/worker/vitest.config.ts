import { defineVitestConfig, type VitestConfig } from 'quisido/vitest';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      exclude: ['scripts/'],
    },
  },
});

export default CONFIG;
