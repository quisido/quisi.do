import { defineVitestConfig, type VitestConfig } from 'quisi';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      exclude: ['scripts/'],
    },
  },
});

export default CONFIG;
