import { defineConfig } from '@eslint/config-helpers';

export default defineConfig({
  ignores: [
    '.eslintcache',
    '.git/**',
    '.idea/**',
    '.pnp.*',
    '.wrangler/**',
    '.yarn/**',
    '*.tsbuildinfo',
    'analyze/**',
    'certificates/**',
    'coverage/**',
    'dist/**',
    'hint-report/**',
    'jest/**',
    'lighthouse.report.*',
    'lighthouse-*.devtoolslog.json',
    'lighthouse-*.trace.json',
    'node_modules/**',
    'vitest.config.ts.timestamp-*-*.mjs',
  ],
});
