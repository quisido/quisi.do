import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import { StatusCode } from "#lib/status-code.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";

describe("/", (): void => {

  it("should redirect to the host", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("/");

    // A "303 See Other" response code redirects with a GET request.
    expect(response.status).toBe(StatusCode.SeeOther);
    expect(Object.fromEntries(response.headers.entries())).toMatchObject({
      "access-control-allow-origin": "https://test.origin:3000",
      "access-control-max-age": "31536000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-security-policy": "frame-ancestors 'none';",
      "location": "https://test.host:3000/",
      "x-frame-options": "DENY",
    });

  });

});
