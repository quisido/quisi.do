import { describe, it } from "vitest";
import { env } from "cloudflare:workers";
import { fetch } from "./index.js";
import { StatusCode } from "#lib/status-code.js";

describe("/", (): void => {

  it("supports OPTIONS", async (): Promise<void> => {

    const { expectStatus } = await fetch("/", { "method": "OPTIONS" });

    expectStatus(StatusCode.OK);

  });

  it("redirects to the host", async (): Promise<void> => {

    const { expectHeaders, expectPermanentCache, expectStatus } = await fetch("/");

    // A "303 See Other" response code redirects with a GET request.
    expectStatus(StatusCode.SeeOther);
    expectHeaders({ "location": `${env.ORIGIN}/` });
    expectPermanentCache();

  });

});
