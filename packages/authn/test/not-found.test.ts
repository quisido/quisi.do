import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import { StatusCode } from "#lib/status-code.js";

describe("Not Found", (): void => {

  describe.each(["GET", "OPTIONS"])("%s", (method: string): void => {

    it.each(["/wp-admin", "/wp-content", "/wp-includes", "/wp-login.php", "/xmlrpc.php", "/wp-signup.php", "/wp-activate.php", "/register.php", "/wp-register.php"])("%s", async (pathname: string): Promise<void> => {

      const { expectStatus, response } = await fetch(pathname, { method });

      expectStatus(StatusCode.NotFound);

      await expect(response.text()).resolves.toBe("Not Found");

    });

  });

});
