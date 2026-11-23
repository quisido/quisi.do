import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import ErrorCode from "#lib/error-code.js";
import { StatusCode } from "#lib/status-code.js";

describe("Who Am I?", (): void => {

  describe("OPTIONS", (): void => {

    describe("access-control-allow-origin", (): void => {

      it("supports insecure localhost", async (): Promise<void> => {

        const response: Response = await fetch("http://localhost:3000/whoami/", { "headers": { "Origin": "http://localhost:3000" }, "method": "OPTIONS" });

        expect(response.status).toBe(StatusCode.OK);
        expect(response.headers.get("access-control-allow-origin")).toBe("http://localhost:3000");

      });

      it("supports secure localhost", async (): Promise<void> => {

        const response: Response = await fetch("https://localhost:3000/whoami/", { "headers": { "Origin": "https://localhost:3000" }, "method": "OPTIONS" });

        expect(response.status).toBe(StatusCode.OK);
        expect(response.headers.get("access-control-allow-origin")).toBe("https://localhost:3000");

      });

      it("falls back to the origin var for undefined origins", async (): Promise<void> => {

        const response: Response = await fetch("/whoami/", { "method": "OPTIONS" });

        expect(response.status).toBe(StatusCode.OK);
        expect(response.headers.get("access-control-allow-origin")).toBe("https://test.origin:3000");

      });

      it("falls back to the origin var for unknown origins", async (): Promise<void> => {

        const response: Response = await fetch("https://unknown.origin/whoami/", { "headers": { "Origin": "https://unknown.origin" }, "method": "OPTIONS" });

        expect(response.status).toBe(StatusCode.OK);
        expect(response.headers.get("access-control-allow-origin")).toBe("https://test.origin:3000");

      });

    });

  });

  it("identifies unauthenticated users", async (): Promise<void> => {

    const response: Response = await fetch("/whoami/");

    expect(response.status).toBe(StatusCode.OK);
    await expect(response.json()).resolves.toStrictEqual({ "code": ErrorCode.Unauthenticated });

  });

});
