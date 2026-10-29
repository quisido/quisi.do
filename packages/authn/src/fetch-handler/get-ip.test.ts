import { describe, it } from 'vitest';
import createTestAuthenticationToken from '../../test/authentication-token.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';

describe('getIp', (): void => {
  it('should emit a metric', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const token: string = await createTestAuthenticationToken();
    await fetch('/whoami/', {
      headers: new Headers({
        cookie: `__Secure-Authentication-ID=${token}`,
      }),
    });

    // Assert
    expectToHaveEmitPublicMetric(MetricName.MissingIP);
  });

  it('should not emit a metric in development', async (): Promise<void> => {
    // Assemble
    const { expectNotToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler({
        env: {
          ENVIRONMENT_NAME: EnvironmentName.Development,
        },
      });

    // Act
    const token: string = await createTestAuthenticationToken();
    await fetch('/whoami/', {
      headers: new Headers({
        cookie: `__Secure-Authentication-ID=${token}`,
      }),
    });

    // Assert
    expectNotToHaveEmitPublicMetric(MetricName.MissingIP);
  });
});
