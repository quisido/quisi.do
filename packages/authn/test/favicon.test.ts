import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import { FAVICON } from "#lib/favicon.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";

const FAVICON_BUFFER: ReadonlyDeep<Buffer> = Buffer.from(FAVICON);

describe("favicon.ico", (): void => {

  it("should be a transparent icon", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("/favicon.ico");

    expect(Object.fromEntries(response.headers.entries())).toMatchObject({
      "access-control-allow-origin": "https://test.origin:3000",
      "access-control-max-age": "31536000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-type": "image/vnd.microsoft.icon",
      "content-security-policy": "frame-ancestors 'none';",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
    });

    const responseBuffer: ReadonlyDeep<Buffer> =
      Buffer.from(await response.arrayBuffer());

    expect(responseBuffer).toEqual(FAVICON_BUFFER);

  });

});
