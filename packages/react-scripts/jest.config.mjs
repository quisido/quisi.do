import PRESET from '@monorepo-template/jest-application-preset';

export default {
  preset: '@monorepo-template/jest-application-preset',

  collectCoverageFrom: [
    ...PRESET.collectCoverageFrom,
    '!<rootDir>/src/test/cypress/',
  ],

  testEnvironmentOptions: {
    ...PRESET.testEnvironmentOptions,
    url: 'https://charlesstover.com/',
  },

  transform: {
    ...PRESET.transform,
    '@awsui-.+\\.[cm]?js$': 'babel-jest',
  },

  transformIgnorePatterns: [
    // ...PRESET.transformIgnorePatterns,
    'node_modules/(?!@awsui/components-react)/',
  ],
};
