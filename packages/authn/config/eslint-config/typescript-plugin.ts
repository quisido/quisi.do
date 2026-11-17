import type { Plugin } from "@eslint/core";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { TYPESCRIPT_PLUGIN_RULES } from "./typescript-plugin-rules.js";

export const TYPESCRIPT_PLUGIN: Plugin = {
  ...tsPlugin,
  "configs": {},
  "rules": TYPESCRIPT_PLUGIN_RULES,
};
