import type { UserConfig } from "vite";
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { cpus } from "node:os";
import { defineConfig } from "vitest/config";

const CPU_COUNT: number = cpus().length;

const CONFIG: UserConfig = defineConfig({
  "plugins": [
    cloudflareTest({
      "wrangler": {
        "configPath": "./wrangler.jsonc",
        "environment": "development"
      }
    })
  ],
  "test": {
    "coverage": {
      "enabled": true,
      "exclude": ["node_modules/**", "worker-configuration.d.ts"],
      "include": ["**/*.ts"],
      "skipFull": true,
      "thresholds": { "100": true }
    },
    "include": ["app/**/*.test.ts"],
    "isolate": false,
    "maxWorkers": CPU_COUNT,
    "name": "Authentication",
    "reporters": [["agent", { "summary": true }]]
  }
});

export default CONFIG;
