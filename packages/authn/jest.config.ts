import { dirname, join } from 'path';
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
      functions: 58,
      lines: 75,
      statements: 75,
    },
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    'proposal-async-context/src/index.js': join(
      dirname(require.resolve('proposal-async-context/package.json')),
      'src',
      'index.ts',
    ),
  },

  transform: {
    fmrs: '@monorepo-template/jest-transformer',
    unknown2string: '@monorepo-template/jest-transformer',
    '^(.*\\/)?proposal-async-context\\/src\\/index(\\.[jt]s)?$': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true,
        verbatimModuleSyntax: true,
      },
    ],
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
    '/node_modules/(?!(proposal-async-context)/)',
    '\\.pnp\\.[^\\/]+$',
  ],
} satisfies JestConfigWithTsJest;
