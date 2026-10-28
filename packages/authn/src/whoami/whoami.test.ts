import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { TestKVNamespace } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import { base64url, EncryptJWT, type JWTPayload } from 'jose';
import { describe, expect, it, vi } from 'vitest';

import createTestAuthenticationToken, {
  TEST_ENCRYPTION_SECRET,
  TEST_EXPIRES_AT,
  TEST_ISSUED_AT,
  TEST_NOW,
  TEST_TOKEN_CLAIMS,
  TEST_USER_ID,
} from '../../test/authentication-token.js';
import createIp from '../../test/create-ip.js';
import TestAuthnExportedHandler from '../../test/test-authn-exported-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { MILLISECONDS_PER_DAY } from '../constants/time.js';

const REJECTED_CLAIMS: readonly (readonly [string, JWTPayload])[] = [
  ['expired', { ...TEST_TOKEN_CLAIMS, exp: TEST_ISSUED_AT }],
  ['wrong issuer', { ...TEST_TOKEN_CLAIMS, iss: 'other' }],
  ['wrong audience', { ...TEST_TOKEN_CLAIMS, aud: 'other' }],
  ['future issuance', { ...TEST_TOKEN_CLAIMS, iat: TEST_EXPIRES_AT }],
  ['future activation', { ...TEST_TOKEN_CLAIMS, nbf: TEST_EXPIRES_AT }],
  ['excessive lifetime', { ...TEST_TOKEN_CLAIMS, exp: TEST_EXPIRES_AT + 1 }],
  ['fractional issuance', { ...TEST_TOKEN_CLAIMS, iat: TEST_ISSUED_AT - 0.5 }],
  [
    'fractional expiration',
    { ...TEST_TOKEN_CLAIMS, exp: TEST_EXPIRES_AT - 0.5 },
  ],
  ['zero subject', { ...TEST_TOKEN_CLAIMS, sub: '0' }],
  ['negative subject', { ...TEST_TOKEN_CLAIMS, sub: '-1' }],
  ['fractional subject', { ...TEST_TOKEN_CLAIMS, sub: '1.5' }],
  ['noncanonical subject', { ...TEST_TOKEN_CLAIMS, sub: '01' }],
  ['unsafe subject', { ...TEST_TOKEN_CLAIMS, sub: '9007199254740992' }],
];

const createHeaders = (token: string, _label: string): Headers => {
  return new Headers({
    'cf-connecting-ip': createIp(),
    cookie: `__Secure-Authentication-ID=${token}`,
    origin: 'https://quisi.do',
  });
};

describe('WhoAmI JWT sessions', (): void => {
  it('supports preflight and missing cookies', async (): Promise<void> => {
    const { fetch } = new TestAuthnExportedHandler();
    const preflight = await fetch('/whoami/', { method: 'OPTIONS' });
    preflight.expectStatusCodeToBe(StatusCode.OK);
    preflight.expectNoBody();
    preflight.expectHeaderToBe(
      'access-control-allow-methods',
      'GET, DELETE, OPTIONS',
    );
    preflight.expectHeaderToBe('access-control-allow-credentials', 'true');
    const missing = await fetch('/whoami/');
    missing.expectBodyToBe({ code: WhoAmIResponseCode.MissingAuthnId });
    missing.expectHeaderToBe('cache-control', 'no-store');
  });

  it('validates a token without session KV and accounts only through BUDGET', async (): Promise<void> => {
    const sessionNamespace = new TestKVNamespace();
    const budgetNamespace = new TestKVNamespace();
    const getSession = vi.spyOn(sessionNamespace, 'get');
    const putSession = vi.spyOn(sessionNamespace, 'put');
    const getBudget = vi.spyOn(budgetNamespace, 'get');
    const putBudget = vi.spyOn(budgetNamespace, 'put');
    const handler = new TestAuthnExportedHandler({
      env: { AUTHN_USER_IDS: sessionNamespace, BUDGET: budgetNamespace },
      includeFinally: true,
    });
    const token: string = await createTestAuthenticationToken();
    const response = await handler.fetch('/whoami/', {
      headers: createHeaders(token, 'valid-with-budget'),
    });
    response.expectBodyToBe({
      code: WhoAmIResponseCode.Uncached,
      id: TEST_USER_ID,
    });
    response.expectHeaderToBe(
      'access-control-allow-origin',
      'https://quisi.do',
    );
    handler.expectToHaveEmitPublicMetric(
      MetricName.AuthenticationTokenValidated,
    );
    expect(getSession).not.toHaveBeenCalled();
    expect(putSession).not.toHaveBeenCalled();
    expect(getBudget).toHaveBeenCalledWith(TEST_USER_ID.toString(), 'text');
    expect(putBudget).toHaveBeenCalledTimes(1);
  });

  it('rejects a previously valid token exactly at expiration', async (): Promise<void> => {
    let now: number = TEST_NOW;
    const handler = new TestAuthnExportedHandler({ now: (): number => now });
    const token: string = await createTestAuthenticationToken();
    const headers: Headers = createHeaders(token, 'expiration-boundary');
    const before = await handler.fetch('/whoami/', { headers });
    before.expectBodyToBe({
      code: WhoAmIResponseCode.Uncached,
      id: TEST_USER_ID,
    });
    now += MILLISECONDS_PER_DAY;
    const expired = await handler.fetch('/whoami/', { headers });
    expired.expectBodyToBe({ code: WhoAmIResponseCode.InvalidAuthnId });
  });

  it.each(REJECTED_CLAIMS)(
    'rejects %s claims',
    async (label, claims): Promise<void> => {
      const handler = new TestAuthnExportedHandler();
      const token: string = await createTestAuthenticationToken(claims);
      const response = await handler.fetch('/whoami/', {
        headers: createHeaders(token, label),
      });
      response.expectStatusCodeToBe(StatusCode.OK);
      response.expectBodyToBe({ code: WhoAmIResponseCode.InvalidAuthnId });
      handler.expectToHaveEmitPublicMetric(
        MetricName.AuthenticationTokenRejected,
      );
    },
  );

  it.each(['sub', 'iss', 'aud', 'iat', 'exp'])(
    'rejects a missing %s claim',
    async (claim): Promise<void> => {
      const claims: JWTPayload = { ...TEST_TOKEN_CLAIMS };
      Reflect.deleteProperty(claims, claim);
      const token: string = await createTestAuthenticationToken(claims);
      const handler = new TestAuthnExportedHandler();
      const response = await handler.fetch('/whoami/', {
        headers: createHeaders(token, `missing-${claim}`),
      });
      response.expectBodyToBe({ code: WhoAmIResponseCode.InvalidAuthnId });
    },
  );

  it.each(['legacy-session-id', 'not.a.jwt', ''])(
    'rejects legacy and malformed cookies (%s)',
    async (token): Promise<void> => {
      const handler = new TestAuthnExportedHandler();
      const response = await handler.fetch('/whoami/', {
        headers: createHeaders(token, `malformed-${token}`),
      });
      response.expectBodyToBe({ code: WhoAmIResponseCode.InvalidAuthnId });
    },
  );

  it('rejects a tampered token', async (): Promise<void> => {
    const token: string = await createTestAuthenticationToken();
    const segments: string[] = token.split('.');
    const tag: string = segments.pop() ?? '';
    const tampered: string = [
      ...segments,
      `${tag.startsWith('A') ? 'B' : 'A'}${tag.slice(1)}`,
    ].join('.');
    const handler = new TestAuthnExportedHandler();
    const response = await handler.fetch('/whoami/', {
      headers: createHeaders(tampered, 'tampered'),
    });
    response.expectBodyToBe({ code: WhoAmIResponseCode.InvalidAuthnId });
  });

  it('rejects tokens encrypted with another key', async (): Promise<void> => {
    const handler = new TestAuthnExportedHandler({
      env: {
        JWT_ENCRYPTION_SECRET: base64url.encode(new Uint8Array(32).fill(1)),
      },
    });
    const token: string = await createTestAuthenticationToken();
    const response = await handler.fetch('/whoami/', {
      headers: createHeaders(token, 'wrong-key'),
    });
    response.expectBodyToBe({ code: WhoAmIResponseCode.InvalidAuthnId });
  });

  it.each([
    ['A256KW', 'A256GCM', 32],
    ['dir', 'A128GCM', 16],
  ] as const)(
    'rejects disallowed algorithms %s/%s',
    async (alg, enc, length): Promise<void> => {
      const token: string = await new EncryptJWT(TEST_TOKEN_CLAIMS)
        .setProtectedHeader({ alg, enc, typ: 'JWT' })
        .encrypt(base64url.decode(TEST_ENCRYPTION_SECRET).slice(0, length));
      const handler = new TestAuthnExportedHandler();
      const response = await handler.fetch('/whoami/', {
        headers: createHeaders(token, `${alg}-${enc}`),
      });
      response.expectBodyToBe({ code: WhoAmIResponseCode.InvalidAuthnId });
    },
  );

  it.each([undefined, 'invalid'])(
    'logs out without validating the cookie (%s)',
    async (token): Promise<void> => {
      const handler = new TestAuthnExportedHandler({
        env: { JWT_ENCRYPTION_SECRET: undefined },
      });
      const response = await handler.fetch('/whoami/', {
        headers:
          token === undefined
            ? { origin: 'https://quisi.do' }
            : createHeaders(token, 'logout'),
        method: 'DELETE',
      });
      response.expectStatusCodeToBe(StatusCode.NoContent);
      response.expectNoBody();
      response.expectHeaderToBe(
        'set-cookie',
        '__Secure-Authentication-ID=; Domain=quisi.do; Max-Age=0; HttpOnly; Partitioned; Path=/; SameSite=Lax; Secure',
      );
    },
  );

  it.each([null, 'null', 'https://untrusted.example'])(
    'rejects logout from an untrusted origin (%s)',
    async (origin): Promise<void> => {
      const handler = new TestAuthnExportedHandler();
      const response = await handler.fetch('/whoami/', {
        headers: origin === null ? {} : { origin },
        method: 'DELETE',
      });
      response.expectStatusCodeToBe(StatusCode.Forbidden);
      expect(response.headers.has('set-cookie')).toBe(false);
    },
  );
});
