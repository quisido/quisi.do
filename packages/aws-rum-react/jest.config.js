import MODULE_NAME_MAPPER from './src/test/constants/module-name-mapper.js';

/** @type {import('jest').Config} */
export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: MODULE_NAME_MAPPER,
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/src/test/setup.ts'],
  testEnvironment: 'jsdom',

  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  transform: {
    unknown2string: '@monorepo-template/jest-transformer',
    '^.+\\.tsx?$': '@monorepo-template/jest-transformer',
  },
};
