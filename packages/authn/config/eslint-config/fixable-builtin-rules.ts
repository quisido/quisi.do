import type { RulesConfig } from "@eslint/core";
import { builtinRules } from "eslint/use-at-your-own-risk";
import { toFixable } from "./to-fixable.js";
import type { ReadonlyDeep } from "@lib/readonly-deep.js";

export const FIXABLE_BUILTIN_RULES: ReadonlyDeep<RulesConfig> =
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- Builtin rules are not exposed through other means.
  toFixable(Object.fromEntries(builtinRules.entries()));
