import { StatusCode } from "cloudflare-utils";
import { describe, it } from "vitest";
import { MetricName } from "../../constants/metric-name.js";
import AuthnTest from "../../test/authn-test.js";

describe('handleMissingPatreonIdentityData', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetchPatreon } = new AuthnTest({
      patreonIdentity: '{}',
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectPublicMetric({ name: MetricName.MissingPatreonIdentityData });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=42',
      location: 'https://test.host/test-return-path/#authn:error=42',
    });
  });
});
