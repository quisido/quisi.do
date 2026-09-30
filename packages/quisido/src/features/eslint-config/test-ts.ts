import defineConfig, { type Config } from './define-config.js';
import fileGlobsByExtension from './file-globs-by-extension.js';
import { TS_CONFIG } from './ts.js';

export const TEST_TS_CONFIG: Config = defineConfig({
  ...TS_CONFIG,
  files: fileGlobsByExtension('test.ts', 'test.tsx'),
  ignores: [],
  name: '@quisido/test-ts',
  rules: {
    ...TS_CONFIG.rules,
    /**
     * This rule is incompatible with TypeScript when setting a variable in a
     * callback.
     *
     * let x: (() => void) | undefined = undefined;
     * (function(): void {
     *   x = () => {};
     * }).apply(null);
     * assert(typeof x !== 'undefined');
     * x(); // Type 'never' has no call signatures. ts(2349)
     */
    'init-declarations': 'off',
    'max-lines-per-function': 'off',
    'no-magic-numbers': 'off',
    'no-undefined': 'off',
  },
});
