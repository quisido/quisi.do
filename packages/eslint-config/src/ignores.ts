import { defineConfig } from '@eslint/config-helpers';

export default defineConfig({
  ignores: [
    '.git/**',
    '.idea/**',
    '.wrangler/**',
    '.yarn/**',
    'analyze/**',
    'coverage/**',
    'dist/**',
    'hint-report/**',
    'jest/**',
    'node_modules/**',
    '.pnp.*',
    'vitest.config.ts.timestamp-*-*.mjs',
  ],
});
