import cloudflare from "@cloudflare/oxlint-config";
import { defineConfig } from "oxlint";
import type { OxlintConfig } from "oxlint";

const CONFIG: Readonly<OxlintConfig> = defineConfig({
  "extends": [cloudflare],
  "env": cloudflare.env,
  "ignorePatterns": [...cloudflare.ignorePatterns, ".wrangler/", "coverage/", "node_modules/", "worker-configuration.d.ts"],
});

export default CONFIG;
