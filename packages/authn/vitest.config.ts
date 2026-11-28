// eslint-disable-next-line import-x/no-nodejs-modules -- `@cloudflare/vitest-plugin` already depends on `node:os`.
import { cpus } from "node:os";
import { defineConfig } from "vitest/config";
import type { InlineConfig } from "vitest/node";
import type { UserConfig } from "vite";
import { cloudflareTest } from "@cloudflare/vitest-plugin";

const CPU_COUNT: number = cpus().length;
const REPORTERS: InlineConfig["reporters"] = [["agent", { "summary": false }]];

if (process.env["GITHUB_ACTIONS"] === "true") {

  REPORTERS.push("github-actions");

}

const CONFIG: UserConfig = defineConfig({
  "plugins": [],
  "test": {
    "coverage": {
      "enabled": true,
      "exclude": [
        "coverage/**",
        "lib/**",
        "node_modules/**",
        "worker-configuration.d.ts",
      ],
      "include": ["**/*.ts"],
      "provider": "istanbul",
      "reporter": ["cobertura", "html-spa", "text"],
      "skipFull": true,
      "thresholds": { "100": true },
    },
    "forceRerunTriggers": ["config/", "lib/", "src/", "package.json", "vitest.config.ts", "wrangler.jsonc"],
    "hideSkippedTests": true,
    "isolate": true,
    "logHeapUsage": true,
    "maxWorkers": CPU_COUNT,
    "mockReset": true,
    "name": "Authentication",
    "projects": [
      {
        "extends": true,
        "plugins": [
          cloudflareTest({
            "wrangler": {
              "configPath": "./wrangler.jsonc",
              "environment": "test",
            },
          }),
        ],
        "test": {
          "detectAsyncLeaks": true,
          "include": ["test/**/*.test.ts"],
          "name": "Cloudflare Worker",
        },
      },
      {
        "test": {
          "environment": "node",
          "include": ["config/**/*.test.ts", "*.test.ts"],
          "name": "Node",
        },
      },
    ],
    "reporters": REPORTERS,
    "restoreMocks": true,
    "sequence": {
      "concurrent": true,
      "shuffle": {
        "files": true,
        "tests": true,
      },
    },
    "setupFiles": ["./config/vitest-config/setup-file.ts"],
    "typecheck": {
      "build": false,
      "enabled": true,
      "only": false,
    },
    "unstubEnvs": true,
    "unstubGlobals": true,
  },
});

export default CONFIG;
