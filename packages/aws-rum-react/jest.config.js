import MODULE_NAME_MAPPER from './src/test/constants/module-name-mapper';

export default {
  moduleNameMapper: MODULE_NAME_MAPPER,
  preset: '@monorepo-template/jest-module-preset',
  setupFiles: ['<rootDir>/src/test/setup.ts'],
  testEnvironment: 'jsdom',
};
