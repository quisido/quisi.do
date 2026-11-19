import * as tsParser from "@typescript-eslint/parser";
import type { LanguageOptions } from "@eslint/core";

export const TYPESCRIPT_LANGUAGE_OPTIONS: Readonly<LanguageOptions> = {
  "ecmaVersion": "latest",
  "globals": {},
  "parser": tsParser,
  "parserOptions": {
    "allowReserved": false,
    "ecmaVersion": "latest",
    "projectService": {
      "allowDefaultProject": [],
    },
    "sourceType": "module",
  },
  "sourceType": "module",
};
