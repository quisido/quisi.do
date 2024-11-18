import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe.skip('getAccessControlAllowOrigin', (): void => {
  it('should be * when origin is undefined', async (): Promise<void> => {
    const { fetch } = new TestAuthnExportedHandler();

    const { expectHeadersToBe } = await fetch('/whoami/', {
      method: 'OPTIONS',
    });

    expectHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': '*',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });

  it('should support http://localhost:3000', async (): Promise<void> => {
    const { fetch } = new TestAuthnExportedHandler();

    const { expectHeadersToBe } = await fetch('/whoami/', {
      method: 'OPTIONS',
      origin: 'http://localhost:3000',
    });

    expectHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': 'http://localhost:3000',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });

  it('should support https://localhost:3000', async (): Promise<void> => {
    const { fetch } = new TestAuthnExportedHandler();

    const { expectHeadersToBe } = await fetch('/whoami/', {
      method: 'OPTIONS',
      origin: 'https://localhost:3000',
    });

    expectHeadersToBe({
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Baggage, Sentry-Trace',
      'access-control-allow-methods': 'GET, OPTIONS',
      'access-control-allow-origin': 'https://localhost:3000',
      'access-control-max-age': '600',
      allow: 'GET, OPTIONS',
      'content-type': 'text/json; charset=utf-8',
    });
  });
});
