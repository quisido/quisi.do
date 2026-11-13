import { describe, it } from 'vitest';
import { TEST_NOW } from '../../test/authentication-token.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { TEST_PATREON_URL } from '../../test/test-patreon-url.js';
import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';

describe('getIp', (): void => {
  it('should emit a metric', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch, mockPatreonToken } =
      new TestAuthnExportedHandler();
    mockPatreonToken(new Response(null, { status: 400 }));

    // Act
    await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectToHaveEmitPublicMetric(MetricName.MissingIP);
  });

  it('should not emit a metric in development', async (): Promise<void> => {
    // Assemble
    const { expectNotToHaveEmitPublicMetric, fetch, mockPatreonToken } =
      new TestAuthnExportedHandler({
        env: {
          ENVIRONMENT_NAME: EnvironmentName.Development,
        },
        now: (): number => TEST_NOW + 10_000,
      });
    mockPatreonToken(new Response(null, { status: 400 }));

    // Act
    await fetch(TEST_PATREON_URL, {
      headers: new Headers({
        cookie: '__Secure-Session-ID=test-session-id',
      }),
    });

    // Assert
    expectNotToHaveEmitPublicMetric(MetricName.MissingIP);
  });
});
