import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    coverage: {
      enabled: false,
    },
    environment: 'jsdom',
    projects: [
      {
        test: {
          exclude: ['./src/modules/reference-material/'],
          name: 'Game',
        },
      },
      {
        test: {
          include: ['./src/modules/reference-material/'],
          name: 'Reconciler',
        },
      },
    ],
    setupFiles: ['./tests/setup-file.ts'],
  },
});

export default CONFIG;
