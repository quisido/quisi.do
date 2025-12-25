import type { BuildConfig } from 'quisi';

export const BUILD: BuildConfig = {
  /**
   * `@cloudflare/workers-types` clashes with `@types/node`.
   * `@vitest/expect/dist/chai.d.ts` redeclares `@types/chai`.
   * `tinybench` incorrectly extends `EventTarget`.
   * `vite` cannot find name `Worker`.
   */
  skipLibCheck: true,
};
