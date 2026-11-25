import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import ErrorCode from "#lib/error-code.js";
import { StatusCode } from "#lib/status-code.js";

describe("Who Am I?", (): void => {

  it("supports OPTIONS", async (): Promise<void> => {

    const { expectStatus } = await fetch("/whoami/", { "method": "OPTIONS" });
    expectStatus(StatusCode.OK);

  });

  it("identifies unauthenticated users", async (): Promise<void> => {

    const { expectContentType, expectStatus, expectUncacheable, response } = await fetch("/whoami/");

    expectStatus(StatusCode.OK);
    expectContentType("application/json");
    expectUncacheable();

    await expect(response.json()).resolves.toStrictEqual({ "code": ErrorCode.Unauthenticated });

  });

});
