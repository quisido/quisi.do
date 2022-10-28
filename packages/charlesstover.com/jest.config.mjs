export default {
  preset: '@monorepo-template/jest-application-preset',
  transformIgnorePatterns: ['node_modules/(?!@awsui/components-react)/'],

  testEnvironmentOptions: {
    url: 'https://charlesstover.com/',
  },

  transform: {
    '@awsui-.+\\.[cm]?js$': 'babel-jest',
  },
};
