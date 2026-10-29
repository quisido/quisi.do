import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import mapStringToIp from '../../test/map-string-to-ip.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';

describe('handleOAuthPathname', (): void => {
  it('should support throttling', async (): Promise<void> => {
    const testIp: string = mapStringToIp('throttle');

    // Assemble
    const {
      expectToHaveEmitPrivateMetric,
      expectToHaveEmitPublicMetric,
      fetchPatreon,
      mockPatreonIdentity,
      mockPatreonToken,
    } = new TestAuthnExportedHandler();

    mockPatreonToken();
    mockPatreonIdentity();

    // Act
    await fetchPatreon('throttle');
    const { expectOAuthErrorResponse } = await fetchPatreon('throttle');

    // Assert
    expectOAuthErrorResponse(ErrorCode.TooManyRequests, '/test-return-path/');
    expectToHaveEmitPublicMetric(MetricName.OAuthThrottled);
    expectToHaveEmitPrivateMetric(MetricName.OAuthThrottled, {
      ip: testIp,
    });
  });
});
