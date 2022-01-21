export default {
  preset: '@monorepo-template/jest-application-preset',
  testEnvironment: '<rootDir>/jest/test-environment.mjs',
  testURL: 'https://charlesstover.com/',
  transformIgnorePatterns: ['node_modules/(?!@awsui/components-react)/'],
  transform: {
    '@awsui-.+\\.[cm]?js$': 'babel-jest',
  },
};
