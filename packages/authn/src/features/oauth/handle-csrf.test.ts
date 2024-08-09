import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../../constants/metric-name.js';
import AuthnTest from '../../test/authn-test.js';

describe('handleCrossSiteRequestForgery', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetchPatreon } = new AuthnTest();

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetchPatreon({
      sessionIdCookie: 'test-session-id-cookie',
      sessionIdState: 'test-session-id-state',
    });

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectPublicMetric({ name: MetricName.CSRF });

    expectPrivateMetric({
      cookie: 'test-session-id-cookie',
      name: MetricName.CSRF,
      state: 'test-session-id-state',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=14',
      location: 'https://test.host/#authn:error=14',
    });
  });
});
