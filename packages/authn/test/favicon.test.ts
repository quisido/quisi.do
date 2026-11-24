import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import { FAVICON } from "#lib/favicon.js";
import { StatusCode } from "#lib/status-code.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";

const FAVICON_BUFFER: ReadonlyDeep<Buffer> = Buffer.from(FAVICON);

describe("favicon.ico", (): void => {

  it("supports OPTIONS", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("/favicon.ico", { "method": "OPTIONS" });

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

  it("is a transparent icon", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("/favicon.ico");

    expect(response.status).toBe(StatusCode.OK);
    expect(Object.fromEntries(response.headers.entries())).toMatchObject({
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "https://test.origin:3000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-security-policy": "frame-ancestors 'none';",
      "content-type": "image/vnd.microsoft.icon",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
    });

    const responseBuffer: ReadonlyDeep<Buffer> =
      Buffer.from(await response.arrayBuffer());

    expect(responseBuffer).toEqual(FAVICON_BUFFER);

  });

});
