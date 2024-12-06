import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import { MetricName } from '../constants/metric-name.js';
import mapStringToIp from '../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getPatreonRequestCode', (): void => {
  it('should emit and respond when the request code is missing', async (): Promise<void> => {
    const testState: string = JSON.stringify({
      returnPath: '/test-return-path/',
      sessionId: 'test-session-id',
    });

    // Assemble
    const { expectPublicMetric, fetch } = new TestAuthnExportedHandler();

    // Act
    const search: string = new URLSearchParams({
      state: testState,
    }).toString();

    const { expectErrorResponse } = await fetch(`/patreon/?${search}`, {
      headers: new Headers({
        'cf-connecting-ip': mapStringToIp('code'),
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectPublicMetric(MetricName.MissingPatreonRequestCode);
    expectPublicMetric(MetricName.PatreonRequest);
    expectErrorResponse(
      ErrorCode.MissingPatreonRequestCode,
      '/test-return-path/',
    );
  });
});
