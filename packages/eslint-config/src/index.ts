import CJS from './cjs.js';
import D_TS from './d-ts.js';
import JS from './js.js';
import JSON from './json.js';
import JSONC from './jsonc.js';
import TEST_TS from './test-ts.js';
import TS from './ts.js';
import { defineConfig } from 'eslint/config';
import IGNORES from './ignores.js';

export { defineConfig } from 'eslint/config';
export { default as disableRulesForFiles } from './disable-rules-for-files.js';

export default defineConfig(
  JS,
  JSON,

  // Extends JS.
  CJS,
  TS,

  // Extends JSON.
  JSONC,

  // Extends TS.
  D_TS,
  TEST_TS,

  ...IGNORES,
);
