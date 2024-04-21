import type { Linter } from "eslint";
import { ECMA_FEATURES } from "./ecma-features.js";

export const PARSER_OPTIONS: Required<Linter.ParserOptions> = {
  ecmaFeatures: ECMA_FEATURES,
  ecmaVersion: 'latest' as const,
  sourceType: 'module' as const,
};
