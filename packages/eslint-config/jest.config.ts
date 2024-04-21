import type { Config } from 'jest';

export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',

  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],

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

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '^.+\\.tsx?$': '@monorepo-template/jest-transformer',
    unknown2string: '@monorepo-template/jest-transformer',
  },
} satisfies Config;
