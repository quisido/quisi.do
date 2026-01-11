import { type Config, defineConfig } from '@eslint/config-helpers';

const IGNORES_CONFIG: readonly Config[] = defineConfig({
  ignores: [
    '.idea/**',
    'analyze/**',

    // Cloudflare
    '.wrangler/**',

    // ESLint
    '.eslintcache',

    // git
    '.git/**',

    // Jest
    'jest/**',

    // Lighthouse
    'lighthouse.report.*',
    'lighthouse-*.devtoolslog.json',
    'lighthouse-*.trace.json',

    // Next
    'certificates/**',

    // Node
    'dist/**',
    'node_modules/**',
    '*.tgz',

    // quisi
    '.cache/**',
    '.tests/**',

    // TypeScript
    '*.tsbuildinfo',

    // Vitest
    '.vitest/**',
    'coverage/**',
    'vitest.config.ts.timestamp-*-*.mjs',

    // Webhint
    'hint-report/**',

    // Yarn
    '.pnp.*',
    '.yarn/**',
  ],
});

export default IGNORES_CONFIG;
