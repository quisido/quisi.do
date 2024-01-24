/** @type {import('jest').Config} */
export default {
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    ['text', { skipEmpty: true, skipFull: true }],
  ],
  testEnvironmentOptions: {
    url: 'https://quisi.do/',
  },
};
