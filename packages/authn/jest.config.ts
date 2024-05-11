import { dirname, join } from 'node:path';
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

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    'proposal-async-context/src/index.js': join(
      dirname(require.resolve('proposal-async-context/package.json')),
      'src',
      'index.ts',
    ),
  },

  transform: {
    '@quisido/authn-shared': '@monorepo-template/jest-transformer',
    '@quisido/workers-shared': '@monorepo-template/jest-transformer',
    'authn-shared': '@monorepo-template/jest-transformer',
    fmrs: '@monorepo-template/jest-transformer',
    unknown2string: '@monorepo-template/jest-transformer',
    'workers-shared': '@monorepo-template/jest-transformer',

    '\\.[jt]s$': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true,
        verbatimModuleSyntax: true,
      },
    ],

    '^(.*\\/)?proposal-async-context\\/src\\/index(\\.[jt]s)?$': [
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
