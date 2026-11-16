import { assertType, describe, it } from "vitest";
import type { UserConfig } from "vite";
import vitestConfig from "./vitest.config.js";

describe("Vitest configuration", (): void => {

  it("should be the correct type", (): void => {

    assertType<UserConfig>(vitestConfig);

  });

});
