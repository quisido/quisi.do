import type { Linter } from 'eslint';
import cjs from './cjs.js';
import dts from './dts.js';
import js from './js.js';
import ts from './ts.js';

export default [
  cjs,
  dts,
  js,
  ts,

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
