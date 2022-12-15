export default {
  preset: '@monorepo-template/jest-module-preset',
  setupFiles: ['<rootDir>/src/test/setup.ts'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^uuid$': 'uuid',
  },
};
