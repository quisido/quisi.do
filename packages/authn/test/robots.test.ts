import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";

describe("robots.txt", (): void => {

  it("supports OPTIONS", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("https://localhost:3000/robots.txt", { "method": "OPTIONS" });

    expect(response.status).toBe(StatusCode.OK);
    expect(Object.fromEntries(response.headers.entries())).toMatchObject({
      "access-control-allow-credentials": "true",
      "access-control-allow-headers": "Baggage, Sentry-Trace",
      "access-control-allow-methods": "GET",
      "access-control-allow-origin": "https://test.origin:3000",
      "access-control-max-age": "31536000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-security-policy": "frame-ancestors 'none';",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
    });

  });

  it("disallows all user agents", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("https://localhost:3000/robots.txt");

    expect(response.status).toBe(StatusCode.OK);
    expect(Object.fromEntries(response.headers.entries())).toMatchObject({
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "https://test.origin:3000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-security-policy": "frame-ancestors 'none';",
      "content-type": "text/plain; charset=utf-8",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
    });

    await expect(response.text()).resolves.toBe("User-agent: *\nDisallow: /\n");

  });

});
