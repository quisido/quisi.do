import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      exclude: ['scripts/'],
      thresholds: {
        branches: 35,
        functions: 25,
        lines: 47,
        statements: 47,
      },
    },
  },
});

export default CONFIG;
