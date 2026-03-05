import { defaultExclude } from 'vitest/config';

// Exclude these files from both tests and coverage.

export const EXCLUDE: readonly string[] = [
  ...defaultExclude,
  '*.config.*',

  // Cypress
  'cypress/**',

  // Next
  '.next/**',
  'certificates/**',
  'out/**',

  // Node
  'packages/**',

  // quisido
  '.cache/**',
  '.tests/**',

  // TypeScript
  'dist/**',

  // Vitest
  '.vitest/**',
  'coverage/**',

  // Wrangler
  '.wrangler/**',

  // Yarn
  '.yarn/**',
];
