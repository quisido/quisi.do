export default {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  preset: '@monorepo-template/jest-module-preset',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '^.+\\.tsx?$': '@monorepo-template/jest-transformer',
  },
};
