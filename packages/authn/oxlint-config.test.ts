import { assertType, describe, it } from "vitest";
import type { OxlintConfig } from "oxlint";
import oxlintConfig from "./oxlint.config.js";

describe("Oxlint configuration", (): void => {

  it("should be the correct type", (): void => {

    assertType<OxlintConfig>(oxlintConfig);

  });

});
