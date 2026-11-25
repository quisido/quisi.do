import { describe, it } from "vitest";
import { fetch } from "./index.js";
import { StatusCode } from "#lib/status-code.js";

describe("Method Not Allowed", (): void => {

  describe.each(["/", "/whoami/", "/favicon.ico", "/robots.txt"])("%s", (pathname: string): void => {

    it.each(["DELETE", "HEAD", "PATCH", "POST", "PUT", "QUERY", "TRACE"])("rejects %s", async (method: string): Promise<void> => {

      const { expectStatus } = await fetch(pathname, { method });

      expectStatus(StatusCode.MethodNotAllowed);

    });

  });

});
