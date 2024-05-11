import type { JestConfigWithTsJest } from 'ts-jest';

export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*.d.ts'],
  coverageDirectory: './jest/coverage',
  extensionsToTreatAsEsm: ['.ts'],
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',

  coverageReporters: [
    'clover',
    'json',
    'lcov',
    ['text', { skipEmpty: true, skipFull: true }],
  ],

  coverageThreshold: {
    global: {
      branches: 32,
      functions: 53,
      lines: 73,
      statements: 73,
    },
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '@quisido/authn-shared': '@monorepo-template/jest-transformer',
    '@quisido/workers-shared': '@monorepo-template/jest-transformer',
    'authn-shared': '@monorepo-template/jest-transformer',
    'workers-shared': '@monorepo-template/jest-transformer',
    fmrs: '@monorepo-template/jest-transformer',
    unknown2string: '@monorepo-template/jest-transformer',

    '\\.[jt]s$': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true,
        verbatimModuleSyntax: true,
      },
    ],
  },

  transformIgnorePatterns: [
    '\\.pnp\\.[^\\/]+$',
  ],
} satisfies JestConfigWithTsJest;
