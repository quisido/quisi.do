import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import AuthnTest from '../test/authn-test.js';

describe('handleMissingAuthnUserIdsNamespace', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new AuthnTest({
      authnUserIdsNamespace: undefined,
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/whoami/',
    );

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);
    expectPublicMetric({ name: MetricName.MissingAuthnUserIdsNamespace });
    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=49',
      location: 'https://test.host/#authn:error=49',
    });
  });
});
