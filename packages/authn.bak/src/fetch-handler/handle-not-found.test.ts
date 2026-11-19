import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import createTestAuthenticationToken from '../../test/authentication-token.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';

describe('handleNotFound', (): void => {
  it('should emit and respond', async (): Promise<void> => {
    // Assemble
    const { expectToHaveEmitPublicMetric, fetch } =
      new TestAuthnExportedHandler();

    // Act
    const { expectOAuthErrorResponse } = await fetch('/test-not-found/?a=b');

    // Assert
    expectOAuthErrorResponse(ErrorCode.NotFound);
    expectToHaveEmitPublicMetric(MetricName.NotFound, {
      pathname: '/test-not-found/',
    });
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
