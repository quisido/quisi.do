import { assertType, describe, it, vi } from "vitest";
import type { UserConfig } from "vite";
import vitestConfig from "./vitest.config.js";

// eslint-disable-next-line vitest/prefer-import-in-mock -- Importing the Cloudflare Vitest plugin spawns the workerd runtime.
vi.mock("@cloudflare/vitest-plugin", (): Readonly<Record<"cloudflareTest", () => Readonly<Record<"name", string>>>> => ({
  "cloudflareTest": (): Readonly<Record<"name", string>> => ({
    "name": "mock-cloudflare-vitest-plugin",
  }),
}));

describe("Vitest configuration", (): void => {

  it("should be the correct type", (): void => {

    assertType<UserConfig>(vitestConfig);

  });

});
