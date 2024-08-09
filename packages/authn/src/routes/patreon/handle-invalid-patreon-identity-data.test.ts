import { StatusCode } from "cloudflare-utils";
import { describe, it } from "vitest";
import { MetricName } from "../../constants/metric-name.js";
import AuthnTest from "../../test/authn-test.js";

describe('handleInvalidPatreonIdentityData', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon, mockPatreonIdentity, mockPatreonToken } = new AuthnTest();

    mockPatreonToken('{"access_token":"test-access-token"}');
    mockPatreonIdentity('{"data":true}');

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.InvalidPatreonIdentityData,
      value: 'true',
    });

    expectPublicMetric({
      name: MetricName.InvalidPatreonIdentityData,
      type: 'boolean',
    });

    expectResponseHeadersToBe({
         "access-control-allow-methods": "GET",
         "allow": "GET",
         "content-location": "https://test.host/test-return-path/#authn:error=43",
         "location": "https://test.host/test-return-path/#authn:error=43",});
  });
});
