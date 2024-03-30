import type { JestConfigWithTsJest } from 'ts-jest';

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
} satisfies JestConfigWithTsJest;
