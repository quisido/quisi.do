import { defineVitestConfig, type VitestConfig } from 'quisido';

const CONFIG: VitestConfig = await defineVitestConfig({
  test: {
    environment: 'jsdom',
  },
});

export default CONFIG;
