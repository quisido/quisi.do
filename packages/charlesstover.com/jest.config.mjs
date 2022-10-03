export default {
  preset: '@monorepo-template/jest-application-preset',
  transformIgnorePatterns: ['node_modules/(?!@awsui/components-react)/'],

  testEnvironmentOptions: {
    url: 'https://charlesstover.com/',
  },

  transform: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@awsui-.+\\.[cm]?js$': 'babel-jest',
  },
};
