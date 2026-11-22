import { describe, expect, it } from "vitest";
import faviconArrayBuffer from "./favicon.ico";
import { fetch } from "./index.js";
import type { ReadonlyDeep } from "@lib/readonly-deep.js";

const FAVICON_BUFFER: Buffer = Buffer.from(faviconArrayBuffer);

describe("favicon.ico", (): void => {

  it("should be a transparent icon", async (): Promise<void> => {

    const response: ReadonlyDeep<Response> = await fetch("https://localhost:3000/favicon.ico");

    expect(Object.fromEntries(response.headers.entries())).toMatchObject({
      "access-control-max-age": "31536000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-type": "image/vnd.microsoft.icon",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
    });

    const responseBuffer: Buffer = Buffer.from(await response.arrayBuffer());

    expect(responseBuffer).toEqual(FAVICON_BUFFER);

  });

});
