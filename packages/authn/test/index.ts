import { exports as worker } from "cloudflare:workers";
import { expect } from "vitest";

export async function fetch (...params: Readonly<Parameters<Fetcher["fetch"]>>): Promise<Response> {

  const response: Readonly<Response> = await worker.default.fetch(...params);

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

  expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  expect(response.headers.get("X-Frame-Options")).toBe("SAMEORIGIN");

  return response;

}
