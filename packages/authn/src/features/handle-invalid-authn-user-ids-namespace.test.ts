import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import Test from '../test/test.js';

describe('handleInvalidAuthnUserIdsNamespace', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } = new Test({
      env: {
        AUTHN_USER_IDS: true,
      },
    });

    // Act
    const { expectResponseHeadersToBe, expectResponseStatusToBe } = await fetch(
      'https://localhost/whoami/',
    );

    // Assert
    expectResponseStatusToBe(StatusCode.SeeOther);

    expectPrivateMetric({
      name: MetricName.InvalidAuthnUserIdsNamespace,
      value: 'true',
    });

    expectPublicMetric({
      name: MetricName.InvalidAuthnUserIdsNamespace,
      type: 'boolean',
    });

    expectResponseHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/#authn:error=20',
      location: 'https://test.host/#authn:error=20',
    });
  });
});
