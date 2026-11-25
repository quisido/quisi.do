import { describe, expect, it } from "vitest";
import { fetch } from "./index.js";
import { StatusCode } from "#lib/status-code.js";

describe("Origin", (): void => {

  it("can be an invalid URL for OPTIONS", async (): Promise<void> => {

    const response: Response = await fetch("/", { "headers": { "Origin": "null" }, "method": "OPTIONS" });

    expect(response.status).toBe(StatusCode.OK);
    expect(response.headers.get("access-control-allow-origin")).toBe("https://test.origin:3000");

  });

  it("can be an invalid URL for GET", async (): Promise<void> => {

    const response: Response = await fetch("/", { "headers": { "Origin": "null" } });

    expect(response.status).toBe(StatusCode.SeeOther);
    expect(response.headers.get("access-control-allow-origin")).toBe("https://test.origin:3000");

  });

});
