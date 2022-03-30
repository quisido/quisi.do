export default {
  preset: '@monorepo-template/jest-application-preset',
  testEnvironment: '<rootDir>/jest/test-environment.mjs',
  testURL: 'https://charlesstover.com/',
  transformIgnorePatterns: ['node_modules/(?!@awsui/components-react)/'],
  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@awsui-.+\\.[cm]?js$': 'babel-jest',
  },
};
