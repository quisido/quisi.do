import type { Plugin } from "@eslint/core";
import { TYPESCRIPT_PLUGIN_RULES } from "./typescript-plugin-rules.js";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export const TYPESCRIPT_PLUGIN: Plugin = {
  "name": "@typescript-eslint",
  ...tsPlugin,
  "configs": {},
  "rules": TYPESCRIPT_PLUGIN_RULES
};
