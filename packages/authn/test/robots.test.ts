import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";

describe("robots.txt", (): void => {

  it("should disallow all user agents", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("https://localhost:3000/robots.txt");

    expect(Object.fromEntries(response.headers.entries())).toMatchObject({
      "access-control-max-age": "31536000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-type": "text/plain; charset=utf-8",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
    });

    await expect(response.text()).resolves.toBe("User-agent: *\nDisallow: /\n");

  });

});
