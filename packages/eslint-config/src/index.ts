import type { Linter } from 'eslint';
import CJS from './cjs.js';
import D_TS from './d-ts.js';
import JS from './js.js';
import TEST_TS from './test-ts.js';
import TS from './ts.js';

export default [
  JS,

  // Extends JS.
  CJS,
  TS,

  // Extends TS.
  D_TS,
  TEST_TS,

  {
    ignores: [
      '.git/**',
      '.idea/**',
      '.next/**',
      '.wrangler/**',
      '.yarn/**',
      'analyze/**',
      'certificates/**',
      'coverage/**',
      'cypress/coverage/**',
      'cypress/downloads/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
      'dist/**',
      'jest/**',
      'node_modules/**',
      'out/**',
      '.pnp.*',
    ],
  },
] satisfies readonly Linter.FlatConfig[];
