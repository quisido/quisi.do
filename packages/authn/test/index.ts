import { env, exports as worker } from "cloudflare:workers";
import { expect } from "vitest";
import type { ReadonlyDeep } from "../lib/readonly-deep.js";
import { StatusCode } from "../lib/status-code.js";
import type ErrorCode from "../lib/error-code.js";

interface Options {
  readonly "headers"?: Record<string, string> | undefined;
  readonly "method"?: string | undefined;
}

interface TestUtils {
  readonly "expectContentType": (type: string) => void;
  readonly "expectErrorRedirect": (code: ErrorCode, returnPath?: string | undefined) => void;
  readonly "expectHeaders": (headers: Readonly<Record<string, string>>) => void;
  readonly "expectPermanentCache": () => void;
  readonly "expectStatus": (code: StatusCode) => void;
  readonly "expectUncacheable": () => void;
  readonly "response": ReadonlyDeep<Response>;
}

export async function fetch (
  url: string,
  { headers = {}, method = "GET" }: Options = {},
): Promise<TestUtils> {

  const response: ReadonlyDeep<Response> = await worker.default.fetch(`${env.ORIGIN}${url}`, {
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

  const responseHeaders: Readonly<Record<string, string>> =
    Object.fromEntries(response.headers.entries());

  expect(responseHeaders).toHaveProperty("access-control-allow-origin");

  // Universal headers
  expect(responseHeaders).toMatchObject({
    "allow": "GET, OPTIONS",
    "access-control-allow-credentials": "true",
    "access-control-allow-headers": "Baggage, Sentry-Trace",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-expose-headers": "allow",
    "content-security-policy": "frame-ancestors 'none';",
  });

  switch (method) {

    // Universal GET headers
    case "GET": {

      expect(responseHeaders).toMatchObject({
        "x-frame-options": "DENY",
      });

      break;

    }

    // Universal OPTIONS headers
    case "OPTIONS": {

      expect(responseHeaders).toMatchObject({
        "access-control-max-age": "31536000",
      });
      expect(responseHeaders).not.toHaveProperty("cache-control");
      expect(responseHeaders).not.toHaveProperty("content-type");
      expect(responseHeaders).not.toHaveProperty("x-content-type-options");

      break;

    }

  }

  const expectStatus = (code: StatusCode): void => {

    expect(response.status).toBe(code);

  };

  const expectUncacheable = (): void => {

    expect(responseHeaders).toMatchObject({
      "cache-control": "no-store",
      "vary": "*",
    });

  };

  return {
    "expectContentType": (contentType: string): void => {

      expect(responseHeaders).toMatchObject({
        "content-type": contentType,
        "x-content-type-options": "nosniff",
      });

    },
    "expectErrorRedirect": (code: ErrorCode, returnPath = "/"): void => {

      const errorUrl = `${env.ORIGIN}${returnPath}#authn:error=${code.toString()}`;

      expect(response.headers.get("location")).toBe(errorUrl);

      expectStatus(StatusCode.SeeOther);
      expectUncacheable();

    },
    "expectHeaders": (expectedHeaders: Readonly<Record<string, string>>): void => {

      expect(responseHeaders).toMatchObject(expectedHeaders);

    },
    "expectPermanentCache": (): void => {

      expect(responseHeaders).toMatchObject({
        "cache-control": "immutable, max-age=31536000, public",
      });
      expect(responseHeaders).not.toHaveProperty("vary");

    },
    expectStatus,
    expectUncacheable,
    response,
  };

}
