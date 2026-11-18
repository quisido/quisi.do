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
  "test": {
    "coverage": {
      "enabled": true,
      "exclude": [
        "coverage/**",
        "node_modules/**",
        "worker-configuration.d.ts",
      ],
      "include": ["**/*.ts"],
      "skipFull": true,
      "thresholds": { "100": true },
    },
    "forceRerunTriggers": ["config/", "src/", "package.json", "vitest.config.ts"],
    "isolate": true,
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
          "include": ["app/**/*.test.ts"],
          "name": "Cloudflare Worker",
        },
      },
      {
        "test": {
          "environment": "node",
          "include": ["eslint-config.test.ts", "vitest-config.test.ts"],
          "name": "Node",
        },
      },
    ],
    "reporters": REPORTERS,
    "restoreMocks": true,
    "setupFiles": ["./config/vitest-config/setup-file.ts"],
    "unstubEnvs": true,
    "unstubGlobals": true,
  },
});

export default CONFIG;
