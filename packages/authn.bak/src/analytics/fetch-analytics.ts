import type AuthnFetchHandler from '../authn-fetch-handler.js';

// Technical debt: Arbitrary limit prevents excess. Do these rows expire?
const ANALYTICS_BODY = `
SELECT *
FROM AUTHN_PUBLIC
ORDER BY timestamp DESC
LIMIT 1000;
`;

export default async function fetchAnalytics(
  this: AuthnFetchHandler,
): Promise<unknown> {
  return await this.fetchJson(
    `https://api.cloudflare.com/client/v4/accounts/${this.analyticsId}/analytics_engine/sql`,
    {
      body: ANALYTICS_BODY,
      headers: new Headers({
        Authorization: `Bearer ${this.analyticsSecret}`,
      }),
      method: 'POST',
    },
  );
}
