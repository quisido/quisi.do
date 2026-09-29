import { type Config, defineConfig } from 'eslint/config';

import { CJS_CONFIG } from './cjs.js';
import { D_TS_CONFIG } from './d-ts.js';
import { GITHUB_WORKFLOW_CONFIG } from './github-workflow.js';
import IGNORES from './ignores.js';
import { JS_CONFIG } from './js.js';
import { JSON_CONFIG } from './json.js';
import { JSONC_CONFIG } from './jsonc.js';
import { PACKAGE_JSON_CONFIG } from './package-json.js';
import { TEST_TS_CONFIG } from './test-ts.js';
import { TS_CONFIG } from './ts.js';

export const DEFAULT_CONFIGS: Config[] = defineConfig(
  JS_CONFIG,
  JSON_CONFIG,

  // Extends JS.
  CJS_CONFIG,
  TS_CONFIG,

  // Extends JSON.
  JSONC_CONFIG,
  PACKAGE_JSON_CONFIG,

  // Extends TS.
  D_TS_CONFIG,
  TEST_TS_CONFIG,

  // Extends YAML (if there was a YAML config)
  GITHUB_WORKFLOW_CONFIG,

  ...IGNORES,
);
