import { defaultExclude } from "vitest/config";

export const EXCLUDE: readonly string[] = [
  ...defaultExclude,
  '.next/**',
  '.yarn/**',
  '.wrangler/**',
  'certificates/**',
  'coverage/**',
  'cypress/**',
  'dist/**',
  'out/**',
  'packages/**',
  '*.config.*',
];
