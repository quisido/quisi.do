import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { StatusCode } from "#lib/status-code.js";

describe("Method Not Allowed", (): void => {

  describe.each(["/", "/whoami/", "/favicon.ico", "/robots.txt"])("%s", (pathname: string): void => {

    it("rejects POST", async (): Promise<void> => {

      const response: ReadonlyDeep<Response> = await fetch(pathname, { "method": "POST" });

      expect(response.status).toBe(StatusCode.MethodNotAllowed);

    });

    it("rejects PUT", async (): Promise<void> => {

      const response: ReadonlyDeep<Response> = await fetch(pathname, { "method": "PUT" });

      expect(response.status).toBe(StatusCode.MethodNotAllowed);

    });

  });

});
