import { assertType, describe, it } from "vitest";
import type { ConfigObject } from "@eslint/core";
import eslintConfig from "./eslint.config.js";

describe("ESLint configuration", (): void => {

  it("should be the correct type", (): void => {

    assertType<readonly ConfigObject[]>(eslintConfig);

  });

});
