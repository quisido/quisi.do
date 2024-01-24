/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
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
