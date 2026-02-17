import { type Config, defineConfig } from '@eslint/config-helpers';

const IGNORES_CONFIG: readonly Config[] = defineConfig({
  ignores: [
    '**/.idea/**',

    // ESLint
    '**/.eslintcache',

    // git
    '**/.git/**',

    // Jest
    '**/jest/**',

    // Lighthouse
    '**/lighthouse.report.*',
    '**/lighthouse-*.devtoolslog.json',
    '**/lighthouse-*.trace.json',

    // Next
    '**/certificates/**',

    // Node
    '**/*-*.*.*.tgz',
    '**/node_modules/**',

    // quisi
    '**/.cache/**',
    '**/.tests/**',

    // TypeScript
    '**/dist/**',
    '**/*.tsbuildinfo',

    // Vitest
    '**/.vitest/**',
    '**/coverage/**',
    '**/vitest.config.ts.timestamp-*-*.mjs',

    // Webhint
    '**/hint-report/**',

    // Wrangler
    '**/.wrangler/**',

    // Yarn
    '**/.pnp.*',
    '**/.yarn/**',
  ],
});

export default IGNORES_CONFIG;
