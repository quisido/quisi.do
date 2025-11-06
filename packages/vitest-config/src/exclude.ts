import { defaultExclude } from 'vitest/config';

export const EXCLUDE: readonly string[] = [
  ...defaultExclude,
  '.next/**',
  '.vitest/**',
  '.wrangler/**',
  '.yarn/**',
  'certificates/**',
  'coverage/**',
  'cypress/**',
  'dist/**',
  'out/**',
  'packages/**',
  '*.config.*',
];
