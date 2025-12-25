import { type BuildConfig, type TestConfig } from 'quisi';

export const TEST: TestConfig = {
  coverage: {
    branches: 6,
    functions: 16,
    lines: 51,
    statements: 50,
  },

  /**
   * `@cloudflare/workers-types` clashes with `@types/node`.
   * `@vitest/expect/dist/chai.d.ts` redeclares `@types/chai`.
   * `tinybench` incorrectly extends `EventTarget`.
   * `vite` cannot find name `Worker`.
   */
  skipLibCheck: true,
};

export const BUILD: BuildConfig = {
  /**
   * `@cloudflare/workers-types` clashes with `@types/node`.
   * `@vitest/expect/dist/chai.d.ts` redeclares `@types/chai`.
   * `tinybench` incorrectly extends `EventTarget`.
   * `vite` cannot find name `Worker`.
   */
  skipLibCheck: true,
};
