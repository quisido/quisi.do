import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleForbiddenPatreonIdentityResponse', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        patreonIdentity: '{}',
        patreonIdentityStatusCode: StatusCode.Forbidden,
      });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } =
      await fetchPatreon();

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectPublicMetric({ name: MetricName.ForbiddenPatreonIdentityResponse });

    expectPrivateMetric({
      name: MetricName.ForbiddenPatreonIdentityResponse,
      value: '{}',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=39',
      location: 'https://test.host/test-return-path/#authn:error=39',
    });
  });
});
