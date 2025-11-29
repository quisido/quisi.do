import { type Config, defineConfig } from 'eslint/config';
import CJS from './cjs.js';
import D_TS from './d-ts.js';
import IGNORES from './ignores.js';
import JS from './js.js';
import JSON from './json.js';
import JSONC from './jsonc.js';
import PACKAGE_JSON from './package-json.js';
import TEST_TS from './test-ts.js';
import TS from './ts.js';

export { defineConfig } from 'eslint/config';
export { default as disableRulesForFiles } from './disable-rules-for-files.js';

const CONFIG: Config[] = defineConfig(
  JS,
  JSON,

  // Extends JS.
  CJS,
  TS,

  // Extends JSON.
  JSONC,
  PACKAGE_JSON,

  // Extends TS.
  D_TS,
  TEST_TS,

  ...IGNORES,
);

export default CONFIG;
