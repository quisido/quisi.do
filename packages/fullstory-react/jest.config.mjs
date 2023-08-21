export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
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

  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
    },
  },
};
