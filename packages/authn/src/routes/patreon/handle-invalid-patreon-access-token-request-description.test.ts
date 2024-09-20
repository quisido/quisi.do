import { StatusCode } from "cloudflare-utils";
import { describe, it } from "vitest";
import { MetricName } from "../../constants/metric-name.js";
import AuthnTest from "../../test/authn-test.js";

describe('handleInvalidPatreonAccessTokenRequestDescription', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonTokenStatusCode: StatusCode.BadRequest,

      patreonToken: JSON.stringify({
        error: 'invalid_request',
        error_description: 'test description',
        key: 'value',
      }),
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectPublicMetric({ name: MetricName.InvalidPatreonAccessTokenRequest });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      description: 'test description',
      name: MetricName.InvalidPatreonAccessTokenRequest,
      value: '{"key":"value"}',
    });

    expectResponseHeadersToBe({
         "access-control-allow-methods": "GET",
         "allow": "GET",
         "content-location": "https://test.host/test-return-path/#authn:error=32",
         "location": "https://test.host/test-return-path/#authn:error=32",});
  });
});
