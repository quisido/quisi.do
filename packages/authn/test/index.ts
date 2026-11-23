import { exports as worker } from "cloudflare:workers";
import { expect } from "vitest";

interface Options {
  readonly "headers"?: Record<string, string> | undefined;
  readonly "method"?: string | undefined;
}

export async function fetch (
  url: string,
  { headers = {}, method = "GET" }: Options = {},
): Promise<Response> {

  const input = ((): Readonly<URL> => {

    try {

      return new URL(url);

    } catch {

      return new URL(`https://test.origin:3000${url}`);

    }

  })();

  const response: Readonly<Response> = await worker.default.fetch(input, {
    headers,
    method,
    "redirect": "manual",
  });

  /**
   * TODO:
   * Assert status code is expected
   * Assert security headers
   * Assert CORS
   * Assert body matches schema for given route (recommended: OpenAPI or JSON)
   * Assert no stack traces
   * Assert no secrets (e.g. `JWT_ENCRYPTION_SECRET` or
   * `PATREON_OAUTH_CLIENT_SECRET`) are present in the body, headers (e.g.
   * Set-Cookie), analytics write calls, or console output.
   * Assert expected D1/KV call counts.
   * Assert all fetch requests are to allowlisted hosts.
   */

  expect(response.headers.get("content-security-policy")).toBe("frame-ancestors 'none';");
  expect(response.headers.get("x-frame-options")).toBe("DENY");

  return response;

}
