import { ErrorCode, WhoAmIResponseCode } from '@quisido/authn-shared';
import { TestKVNamespace } from 'cloudflare-test-utils';
import { parseCookie } from 'cookie';
import { base64url, jwtDecrypt } from 'jose';
import { assert, describe, expect, it, vi } from 'vitest';
import {
  TEST_ENCRYPTION_SECRET,
  TEST_EXPIRES_AT,
  TEST_ISSUED_AT,
  TEST_JWT_AUDIENCE,
  TEST_JWT_ISSUER,
  TEST_NOW,
} from '../../test/authentication-token.js';
import createIp from '../../test/create-ip.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';

const NEW_USER_ID = 42;

describe('OAuth JWT issuance', (): void => {
  it.each([
    ['existing', [{ userId: 1 }], 1],
    ['new', [], NEW_USER_ID],
  ] as const)(
    'issues a usable encrypted cookie for a %s user without session KV',
    async (_label, results, expectedUserId): Promise<void> => {
      const namespace = new TestKVNamespace();
      const get = vi.spyOn(namespace, 'get');
      const put = vi.spyOn(namespace, 'put');
      const handler = new TestAuthnExportedHandler({
        env: { AUTHN_USER_IDS: namespace },
        lastUsersRowId: NEW_USER_ID,
        oAuthResults: results,
      });
      handler.mockPatreonIdentity();
      handler.mockPatreonToken();
      const response = await handler.fetchPatreon(_label);
      response.expectOAuthSuccessResponse();
      const cookie: string | null = response.headers.get('set-cookie');
      assert(cookie !== null);
      const token: string | undefined =
        parseCookie(cookie)['__Secure-Authentication-ID'];
      assert(typeof token === 'string');
      const { payload } = await jwtDecrypt(
        token,
        base64url.decode(TEST_ENCRYPTION_SECRET),
        {
          audience: TEST_JWT_AUDIENCE,
          contentEncryptionAlgorithms: ['A256GCM'],
          currentDate: new Date(TEST_NOW),
          issuer: TEST_JWT_ISSUER,
          keyManagementAlgorithms: ['dir'],
        },
      );
      expect(payload).toEqual({
        aud: TEST_JWT_AUDIENCE,
        exp: TEST_EXPIRES_AT,
        iat: TEST_ISSUED_AT,
        iss: TEST_JWT_ISSUER,
        sub: expectedUserId.toString(),
      });
      const authenticated = await handler.fetch('/whoami/', {
        headers: {
          'cf-connecting-ip': createIp(),
          cookie: `__Secure-Authentication-ID=${token}`,
        },
      });
      authenticated.expectBodyToBe({
        code: WhoAmIResponseCode.Uncached,
        id: expectedUserId,
      });
      expect(get).not.toHaveBeenCalled();
      expect(put).not.toHaveBeenCalled();
    },
  );

  it('returns an OAuth error without setting a cookie when the key is missing', async (): Promise<void> => {
    const handler = new TestAuthnExportedHandler({
      env: { JWT_ENCRYPTION_SECRET: undefined },
    });
    handler.mockPatreonIdentity();
    handler.mockPatreonToken();
    const response = await handler.fetchPatreon('missing-jwt-key');
    response.expectOAuthErrorResponse(
      ErrorCode.InvalidJwtConfiguration,
      '/test-return-path/',
    );
    expect(response.headers.has('set-cookie')).toBe(false);
  });

  it('does not issue a token for an invalid database user ID', async (): Promise<void> => {
    const handler = new TestAuthnExportedHandler({
      oAuthResults: [{ userId: 0 }],
    });
    handler.mockPatreonIdentity();
    handler.mockPatreonToken();
    const response = await handler.fetchPatreon('invalid-jwt-subject');
    response.expectOAuthErrorResponse(
      ErrorCode.AuthenticationTokenIssuanceFailed,
      '/test-return-path/',
    );
    expect(response.headers.has('set-cookie')).toBe(false);
  });
});
