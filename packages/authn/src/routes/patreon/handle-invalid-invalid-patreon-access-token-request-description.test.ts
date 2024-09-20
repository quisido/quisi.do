import { StatusCode } from "cloudflare-utils";
import { describe, it } from "vitest";
import { MetricName } from "../../constants/metric-name.js";
import AuthnTest from "../../test/authn-test.js";

describe('handleInvalidInvalidPatreonAccessTokenRequestDescription', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonTokenStatusCode: StatusCode.BadRequest,

      patreonToken: JSON.stringify({
        error: 'invalid_request',
        error_description: true
      }),
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
      value: '{"error_description":true}',
    });

    expectPublicMetric({
      name: MetricName.InvalidInvalidPatreonAccessTokenRequestDescription,
      type: 'boolean',
    });

    expectResponseHeadersToBe({
         "access-control-allow-methods": "GET",
         "allow": "GET",
         "content-location": "https://test.host/test-return-path/#authn:error=31",
         "location": "https://test.host/test-return-path/#authn:error=31",});
  });
});
