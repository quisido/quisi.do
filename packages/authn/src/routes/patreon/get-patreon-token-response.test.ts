import { describe, expect, it } from 'vitest';
import Test from '../../test/test.js';

describe('getPatreonTokenResponse', (): void => {
  it('should POST to Patreon', async (): Promise<void> => {
    // Assemble
    const {
      expectFetchToHaveBeenCalledWith,
      expectFetchToHaveBeenCalledWithHeaders,
      fetch,
      onFetch,
    } = new Test();

    onFetch('https://test.patreon.com/api/oauth2/token', new Response());

    // Act
    await fetch(
      'https://localhost/patreon/?code=1234&state=%7B%22returnPath%22%3A%22/test-return-path/%22%2C%22sessionId%22%3A%22test-session-id%22%7D',
    );

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
