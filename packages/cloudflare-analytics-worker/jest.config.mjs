/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  transform: {
    '.ts': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true,
        verbatimModuleSyntax: true,
      },
    ],
  },
};
