import { describe, expect, it } from 'vitest';
import AuthnTest from '../../test/authn-test.js';

describe('getPatreonTokenResponse', (): void => {
  it('should POST to Patreon', async (): Promise<void> => {
    // Assemble
    const {
      expectFetchToHaveBeenCalledWith,
      expectFetchToHaveBeenCalledWithHeaders,
      fetchPatreon,
    } = new AuthnTest({
      patreonOAuthHost: 'https://test.patreon.com',
    });

    // Act
    await fetchPatreon();

    // Assert
    expectFetchToHaveBeenCalledWith(
      'https://test.patreon.com/api/oauth2/token',
      {
        body: 'client_id=test-client-id&client_secret=test-client-secret&code=1234&grant_type=authorization_code&redirect_uri=https%3A%2F%2Flocalhost%2Fpatreon%2Fcallback',
        headers: expect.any(Headers) as Headers,
        method: 'POST',
      },
    );

    expectFetchToHaveBeenCalledWithHeaders({
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': expect.stringMatching(
        /^quisi\.do, platform cloudflare-\d+\.\d+\.\d+$/u,
      ) as string,
    });
  });
});
