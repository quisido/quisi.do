import { describe, it } from "vitest";
import { env } from "cloudflare:workers";
import { fetch } from "./index.js";

describe("Access-Control-Allow-Origin", (): void => {

  describe.each(["GET", "OPTIONS"])("%s", (method: string): void => {

    describe.each(["/", "/favicon.ico", "/robots.txt", "/whoami/"])("%s", (pathname: string): void => {

      it.each(["localhost", "null", "http://localhost:3000", "https://localhost:3000", "https://quisi.do", "https://unknown.origin", env.ORIGIN])("handles %s", async (origin: string): Promise<void> => {

        const { expectHeaders } = await fetch(pathname, { "headers": { "Origin": origin }, method });

        expectHeaders({ "access-control-allow-origin": env.ORIGIN });

      });

      it("handles missing origins", async (): Promise<void> => {

        const { expectHeaders } = await fetch(pathname, { method });

        expectHeaders({ "access-control-allow-origin": env.ORIGIN });

      });

    });

  });

});
