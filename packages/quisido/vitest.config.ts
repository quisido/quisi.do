import { defineVitestConfig, type VitestConfig } from './dist/vitest.js';

const CONFIG: VitestConfig = await defineVitestConfig({});

export default CONFIG;
