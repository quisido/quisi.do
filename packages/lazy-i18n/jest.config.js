/** @type {import('jest').Config} */
export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  coverageDirectory: './jest/coverage',
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    ['text', { skipEmpty: true, skipFull: true }],
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\.module.scss$': '<rootDir>/src/test/constants/module-scss.ts',
  },
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': '@monorepo-template/jest-transformer',
  },
};
