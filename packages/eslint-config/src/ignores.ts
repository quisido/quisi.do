import { type Config, defineConfig } from '@eslint/config-helpers';

const IGNORES_CONFIG: readonly Config[] = defineConfig({
  ignores: [
    '.cache/**',
    '.eslintcache',
    '.git/**',
    '.idea/**',
    '.pnp.*',
    '.tests/**',
    '.vitest/**',
    '.wrangler/**',
    '.yarn/**',
    '*.tgz',
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

export default IGNORES_CONFIG;
