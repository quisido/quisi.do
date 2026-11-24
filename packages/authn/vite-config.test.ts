import { assertType, describe, it } from "vitest";
import type { UserConfig } from "vite";
import viteConfig from "./vite.config.js";

describe("Vite configuration", (): void => {

  it("should be the correct type", (): void => {

    assertType<UserConfig>(viteConfig);

  });

});
