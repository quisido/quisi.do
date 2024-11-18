import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe.skip('handleInvalidPatreonIdentityId', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        patreonIdentity: '{"data":{"id":true}}',
      });

    // Act
    const { expectHeadersToBe, expectStatusCodeToBe } =
      await fetch('/patreon/');

    // Assert
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectPrivateMetric(MetricName.InvalidPatreonIdentityId, {
      value: 'true',
    });

    expectPublicMetric(MetricName.InvalidPatreonIdentityId, {
      type: 'boolean',
    });

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      'content-location': 'https://test.host/test-return-path/#authn:error=45',
      location: 'https://test.host/test-return-path/#authn:error=45',
    });
  });
});
