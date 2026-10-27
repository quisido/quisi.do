import { ErrorCode } from '@quisido/authn-shared';
import { TestAnalyticsEngineDataset } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { describe, expect, it, vi } from 'vitest';

import createTestAuthenticationToken from '../../test/authentication-token.js';
import createIp from '../../test/create-ip.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';

const INVALID_SECRETS: readonly unknown[] = [
  undefined,
  true,
  '',
  'sensitive-invalid-secret',
  'A'.repeat(42),
  `${'A'.repeat(42)}B`,
];

describe('JWT configuration failures', (): void => {
  it.each(INVALID_SECRETS)(
    'fails closed for an invalid secret (%s)',
    async (secret): Promise<void> => {
      const publicDataset = new TestAnalyticsEngineDataset();
      const privateDataset = new TestAnalyticsEngineDataset();
      const publicWrites = vi.spyOn(publicDataset, 'writeDataPoint');
      const privateWrites = vi.spyOn(privateDataset, 'writeDataPoint');
      const handler = new TestAuthnExportedHandler({
        env: {
          JWT_ENCRYPTION_SECRET: secret,
          PRIVATE_DATASET: privateDataset,
          PUBLIC_DATASET: publicDataset,
        },
      });
      const token: string = await createTestAuthenticationToken();
      const response = await handler.fetch('/whoami/', {
        headers: {
          'cf-connecting-ip': createIp(),
          cookie: `__Secure-Authentication-ID=${token}`,
        },
      });
      response.expectStatusCodeToBe(StatusCode.InternalServerError);
      response.expectJsonErrorResponse(ErrorCode.InvalidJwtConfiguration);
      const telemetry: string = JSON.stringify([
        publicWrites.mock.calls,
        privateWrites.mock.calls,
      ]);
      expect(telemetry).not.toContain(token);
      expect(telemetry).not.toContain('sensitive-invalid-secret');
    },
  );

  it.each(['JWT_ISSUER', 'JWT_AUDIENCE'])(
    'fails closed when %s is missing',
    async (key): Promise<void> => {
      const handler = new TestAuthnExportedHandler({
        env: { [key]: undefined },
      });
      const token: string = await createTestAuthenticationToken();
      const response = await handler.fetch('/whoami/', {
        headers: {
          'cf-connecting-ip': createIp(),
          cookie: `__Secure-Authentication-ID=${token}`,
        },
      });
      response.expectStatusCodeToBe(StatusCode.InternalServerError);
      response.expectJsonErrorResponse(ErrorCode.InvalidJwtConfiguration);
    },
  );
});
