import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleInvalidPatreonAccessTokenErrorBody', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } =
      new AuthnTest({
        patreonToken: '/',
        patreonTokenStatusCode: StatusCode.BadRequest,
      });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } =
      await fetchPatreon();

    // Assert
    expectPublicMetric({ name: MetricName.InvalidPatreonAccessTokenErrorBody });
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.InvalidPatreonAccessTokenErrorBody,
      value: '/',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=24',
      location: 'https://test.host/test-return-path/#authn:error=24',
    });
  });
});
