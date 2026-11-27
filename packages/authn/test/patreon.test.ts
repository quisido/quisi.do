import { describe, it } from "vitest";
import { fetch } from "./index.js";
import ErrorCode from "#lib/error-code.js";
import { StatusCode } from "#lib/status-code.js";

const toPath = (state: unknown): string => {

  const stateStr: string = JSON.stringify(state);
  return `/patreon/?state=${encodeURIComponent(stateStr)}`;

};

describe("Who Am I?", (): void => {

  it("supports OPTIONS", async (): Promise<void> => {

    const { expectStatus } = await fetch("/patreon/", { "method": "OPTIONS" });
    expectStatus(StatusCode.OK);

  });

  it("handles missing state", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch("/patreon/");
    expectErrorRedirect(ErrorCode.PatreonStateMissing);

  });

  it("handles non-JSON state", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch("/patreon/?state=abc");
    expectErrorRedirect(ErrorCode.PatreonStateNonJson);

  });

  it.each([1, false, null, true, [], [{}]])("handles non-record state %s", async (state: unknown): Promise<void> => {

    const { expectErrorRedirect } = await fetch(toPath(state));
    expectErrorRedirect(ErrorCode.PatreonStateNonRecord);

  });

  it("handles missing return paths", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch(toPath({}));
    expectErrorRedirect(ErrorCode.PatreonStateReturnPathMissing);

  });

  it("handles non-string return paths", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch(toPath({ "returnPath": 123 }));
    expectErrorRedirect(ErrorCode.PatreonStateReturnPathInvalid);

  });

  it("handles missing session IDs", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch(toPath({ "returnPath": "/return-path/" }));
    expectErrorRedirect(ErrorCode.PatreonStateSessionIdMissing, "/return-path/");

  });

  it("handles non-string session IDs", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch(toPath({ "returnPath": "/return-path/", "sessionId": 123 }));
    expectErrorRedirect(ErrorCode.PatreonStateSessionIdInvalid, "/return-path/");

  });

  it("handles CSRF with no session ID", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch(toPath({ "returnPath": "/return-path/", "sessionId": "test-session-id" }));
    expectErrorRedirect(ErrorCode.PatreonCsrfMissing, "/return-path/");

  });

  it("handles CSRF with invalid session ID", async (): Promise<void> => {

    const { expectErrorRedirect } = await fetch(toPath({ "returnPath": "/return-path/", "sessionId": "test-session-id" }), {
      "headers": {
        "Cookie": "__Secure-Session-ID=invalid-session-id",
      },
    });
    expectErrorRedirect(ErrorCode.PatreonCsrfInvalid, "/return-path/");

  });

});
