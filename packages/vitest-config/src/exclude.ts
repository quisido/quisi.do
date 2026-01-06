import { defaultExclude } from 'vitest/config';

export const EXCLUDE: readonly string[] = [
  ...defaultExclude,
  '.cache/**',
  '.next/**',
  '.tests/**',
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
