import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('mapEnvKeyToErrorCode', (): void => {
  it('should support analytics ID', async (): Promise<void> => {
    const { fetch } = new TestAuthnExportedHandler({
      env: {
        ANALYTICS_ID: true,
      },
    });

    const { expectOAuthErrorResponse } = await fetch('/analytics/');

    expectOAuthErrorResponse(ErrorCode.InvalidAnalyticsId);
  });
});
