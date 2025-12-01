import { describe, it } from 'vitest';
import TestAuthnExportedHandler from '../test/test-authn-exported-handler.js';

describe('getAccessControlAllowOrigin', (): void => {
  it('should support insecure localhost', async (): Promise<void> => {
    // Assemble
    const { fetch } = new TestAuthnExportedHandler();

    // Act
    const { expectHeaderToBe } = await fetch('/whoami/', {
      headers: new Headers({
        origin: 'http://localhost:3000',
      }),
      method: 'OPTIONS',
    });

    // Assert
    expectHeaderToBe('access-control-allow-origin', 'http://localhost:3000');
  });

  it('should support secure localhost', async (): Promise<void> => {
    // Assemble
    const { fetch } = new TestAuthnExportedHandler();

    // Act
    const { expectHeaderToBe } = await fetch('/whoami/', {
      headers: new Headers({
        origin: 'https://localhost:3000',
      }),
      method: 'OPTIONS',
    });

    // Assert
    expectHeaderToBe('access-control-allow-origin', 'https://localhost:3000');
  });

  it('should be the cookie domain', async (): Promise<void> => {
    // Assemble
    const { fetch } = new TestAuthnExportedHandler({
      env: {
        COOKIE_DOMAIN: 'cookie-domain.quisi.do',
      },
    });

    // Act
    const { expectHeaderToBe } = await fetch('/whoami/', {
      headers: new Headers({
        origin: 'https://test.quisi.do',
      }),
      method: 'OPTIONS',
    });

    // Assert
    expectHeaderToBe(
      'access-control-allow-origin',
      'https://cookie-domain.quisi.do',
    );
  });
});
