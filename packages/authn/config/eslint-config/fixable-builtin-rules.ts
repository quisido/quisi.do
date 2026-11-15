import type { RulesConfig } from "@eslint/core";
import { builtinRules } from "eslint/use-at-your-own-risk";
import { toFixable } from "./to-fixable.js";

export const FIXABLE_BUILTIN_RULES: RulesConfig =
  toFixable(Object.fromEntries(builtinRules.entries()));
