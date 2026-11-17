import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";

describe("Who Am I?", (): void => {

  describe("OPTIONS", (): void => {

    it("supports unknown origins", async (): Promise<void> => {

      const response = await fetch("https://localhost:3000/whoami/", { "method": "OPTIONS" });
      expect(response.status).toBe(200);
      expect(response.headers.get("access-control-allow-origin")).toBe("*");

    });

    it("supports insecure localhost", async (): Promise<void> => {

      const response = await fetch("http://localhost:3000/whoami/", { "headers": { "Origin": "http://localhost:3000" }, "method": "OPTIONS" });
      expect(response.status).toBe(200);
      expect(response.headers.get("access-control-allow-origin")).toBe("http://localhost:3000");

    });

    it("supports secure localhost", async (): Promise<void> => {

      const response = await fetch("https://localhost:3000/whoami/", { "headers": { "Origin": "https://localhost:3000" }, "method": "OPTIONS" });
      expect(response.status).toBe(200);
      expect(response.headers.get("access-control-allow-origin")).toBe("https://localhost:3000");

    });

    it("falls back to the cookie domain var", async (): Promise<void> => {

      const response = await fetch("https://unknown.origin/whoami/", { "headers": { "Origin": "https://unknown.origin" }, "method": "OPTIONS" });
      expect(response.status).toBe(200);
      expect(response.headers.get("access-control-allow-origin")).toBe("https://cookie.domain");

    });

  });

  it("identifies unauthenticated users", async (): Promise<void> => {

    const response = await fetch("https://localhost:3000/whoami/");
    expect(response.status).toBe(200);
    expect(await response.json()).toStrictEqual({ "code": 1 });

  });

});
