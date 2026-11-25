import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import { StatusCode } from "#lib/status-code.js";

describe("robots.txt", (): void => {

  it("supports OPTIONS", async (): Promise<void> => {

    const { expectStatus } = await fetch("/robots.txt", { "method": "OPTIONS" });

    expectStatus(StatusCode.OK);

  });

  it("disallows all user agents", async (): Promise<void> => {

    const { expectContentType, expectPermanentCache, expectStatus, response } = await fetch("/robots.txt");

    expectStatus(StatusCode.OK);
    expectContentType("text/plain; charset=utf-8");
    expectPermanentCache();

    await expect(response.text()).resolves.toBe("User-agent: *\nDisallow: /\n");

  });

});
