/** @type {import('jest').Config} */
export default {
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],
  testEnvironmentOptions: {
    url: 'https://quisi.do/',
  },
};
