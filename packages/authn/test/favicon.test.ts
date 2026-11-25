import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import { FAVICON } from "#lib/favicon.js";
import { StatusCode } from "#lib/status-code.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";

const FAVICON_BUFFER: ReadonlyDeep<Buffer> = Buffer.from(FAVICON);

describe("favicon.ico", (): void => {

  it("supports OPTIONS", async (): Promise<void> => {

    const { expectStatus } = await fetch("/favicon.ico", { "method": "OPTIONS" });

    expectStatus(StatusCode.OK);

  });

  it("is a transparent icon", async (): Promise<void> => {

    const { expectContentType, expectPermanentCache, expectStatus, response } = await fetch("/favicon.ico");

    expectContentType("image/vnd.microsoft.icon");
    expectPermanentCache();
    expectStatus(StatusCode.OK);

    const responseBuffer: ReadonlyDeep<Buffer> =
      Buffer.from(await response.arrayBuffer());

    expect(responseBuffer).toEqual(FAVICON_BUFFER);

  });

});
