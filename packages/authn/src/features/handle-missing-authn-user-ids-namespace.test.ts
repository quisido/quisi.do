import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import Test from '../test/test.js';

describe('handleMissingAuthnUserIdsNamespace', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPublicMetric, fetch } = new Test({
      env: {
        AUTHN_USER_IDS: undefined,
      },
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
