import { MetricName as WorkerMetricName } from '@quisido/worker';
import { StatusCode } from 'cloudflare-utils';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handlePatreonFetchRequest', (): void => {
  it('should emit and respond when the Patreon OAuth host is invalid', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
          PATREON_OAUTH_HOST: true,
        },
      });

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch(`/patreon/?${search}`, {
        headers: new Headers({
          'cf-connecting-ip': mapStringToIp('patreonOAuthHost'),
          cookie: '__Secure-Session-ID=test-session-id',
        }),
      });

    // Assert
    expectNoBody();
    expectPublicMetric(MetricName.PatreonRequest);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      location: 'https://host.test.quisi.do/test-return-path/#authn:error=21',

      'content-location':
        'https://host.test.quisi.do/test-return-path/#authn:error=21',
    });

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      type: 'boolean',
    });
  });

  it('should emit and respond when the Patreon OAuth client ID is invalid', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

    // Assemble
    const { expectPrivateMetric, expectPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          HOST: 'host.test.quisi.do',
          PATREON_OAUTH_CLIENT_ID: true,
          PATREON_OAUTH_HOST: 'https://host.test.patreon.com',
        },
      });

    // Act
    const search: string = new URLSearchParams({
      code: 'test-code',
      state: testState,
    }).toString();

    const { expectHeadersToBe, expectNoBody, expectStatusCodeToBe } =
      await fetch(`/patreon/?${search}`, {
        headers: new Headers({
          'cf-connecting-ip': mapStringToIp('patreonOAuthClientId'),
          cookie: '__Secure-Session-ID=test-session-id',
        }),
      });

    // Assert
    expectNoBody();
    expectPublicMetric(MetricName.PatreonRequest);
    expectStatusCodeToBe(StatusCode.SeeOther);

    expectHeadersToBe({
      'access-control-allow-methods': 'GET',
      allow: 'GET',
      location: 'https://host.test.quisi.do/test-return-path/#authn:error=17',

      'content-location':
        'https://host.test.quisi.do/test-return-path/#authn:error=17',
    });

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_CLIENT_ID',
      type: 'boolean',
    });
  });
});
