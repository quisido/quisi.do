import { type Config } from 'jest';

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

  moduleNameMapper: {
    '\\.module\\.scss$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  testEnvironmentOptions: {
    url: 'https://quisi.do/',
  },

  transform: {
    '^.+\\.tsx?$': '@monorepo-template/jest-transformer',
    '@quisido/authn-shared': '@monorepo-template/jest-transformer',
    '@quisido/eslint-config': '@monorepo-template/jest-transformer',
    'aws-rum-react': '@monorepo-template/jest-transformer',
    'cjs-ts': '@monorepo-template/jest-transformer',
    fmrs: '@monorepo-template/jest-transformer',
    'fullstory-react': '@monorepo-template/jest-transformer',
    'lazy-i18n': '@monorepo-template/jest-transformer',
    'number-format-react': '@monorepo-template/jest-transformer',
    'react-datadog': '@monorepo-template/jest-transformer',
    'sentry-react': '@monorepo-template/jest-transformer',
    unknown2string: '@monorepo-template/jest-transformer',
    'use-shallow-memo': '@monorepo-template/jest-transformer',
  },
} satisfies Config;
