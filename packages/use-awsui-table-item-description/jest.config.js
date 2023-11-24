/** @type {import('jest').Config} */
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
  transformIgnorePatterns: ['node_modules/(?!@awsui/components-react)/'],

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

  moduleNameMapper: {
    '.+\.css$': '<rootDir>/src/test/constants/css.ts',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '@awsui-.+\\.[cm]?js$': '@monorepo-template/jest-transformer',
    '^.+\\.tsx?$': '@monorepo-template/jest-transformer',
  },
};
