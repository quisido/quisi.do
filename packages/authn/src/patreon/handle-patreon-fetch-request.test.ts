import { ErrorCode } from '@quisido/authn-shared';
import { MetricName as WorkerMetricName } from '@quisido/worker';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('handlePatreonFetchRequest', (): void => {
  it('should...', async (): Promise<void> => {
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

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('patreonOAuthHost'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.PatreonRequest);

    expectErrorResponse(
      ErrorCode.InvalidPatreonOAuthHost,
      '/test-return-path/',
    );

    expectPrivateMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      value: 'true',
    });

    expectPublicMetric(WorkerMetricName.InvalidEnvironmentVariable, {
      key: 'PATREON_OAUTH_HOST',
      type: 'boolean',
    });
  });
});
