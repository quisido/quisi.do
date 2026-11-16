import { cpus } from "node:os";
import { configDefaults, defineConfig } from "vitest/config";
import type { InlineConfig } from "vitest/node";
import type { UserConfig } from "vite";
import { cloudflareTest } from "@cloudflare/vitest-plugin";

const CPU_COUNT: number = cpus().length;
const REPORTERS: InlineConfig["reporters"] = [["agent", { "summary": false }]];

if (process.env["GITHUB_ACTIONS"] === "true") {

  REPORTERS.push("github-actions");

}

const CONFIG: UserConfig = defineConfig({
  "plugins": [
    cloudflareTest({
      "miniflare": {
        "bindings": {
          "COOKIE_DOMAIN": "cookie.domain",
        },
      },
      "wrangler": {
        "configPath": "./wrangler.jsonc",
        "environment": "development",
      },
    }),
  ],
  "test": {
    "coverage": {
      "enabled": true,
      "exclude": ["node_modules/**", "worker-configuration.d.ts"],
      "include": ["**/*.ts"],
      "skipFull": true,
      "thresholds": { "100": true },
    },
    "forceRerunTriggers": [...configDefaults.forceRerunTriggers, "src/"],
    "include": ["app/**/*.test.ts"],
    "isolate": false,
    "maxWorkers": CPU_COUNT,
    "mockReset": true,
    "name": "Authentication",
    "reporters": REPORTERS,
    "restoreMocks": true,
    "unstubEnvs": true,
    "unstubGlobals": true,
  },
});

export default CONFIG;
