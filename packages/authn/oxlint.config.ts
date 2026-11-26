import cloudflare from "@cloudflare/oxlint-config";
import { defineConfig } from "oxlint";
import type { OxlintConfig } from "oxlint";

const CONFIG: Readonly<OxlintConfig> = defineConfig({
  "env": cloudflare.env,
  "extends": [cloudflare],
  "ignorePatterns": [...cloudflare.ignorePatterns, ".wrangler/", "coverage/", "node_modules/", "worker-configuration.d.ts"],
});

export default CONFIG;
