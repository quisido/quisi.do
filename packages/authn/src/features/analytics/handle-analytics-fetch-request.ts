import WhoAmIOptionsResponse from '../../routes/whoami/whoami-options-response.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import handleAnalyticsEngineResponse from './handle-analytics-engine-response.js';

const ANALYTICS_BODY = `
SELECT *
FROM AUTHN_PUBLIC
ORDER BY timestamp DESC;
`;

export default async function handleAnalyticsFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  // Options
  const { requestMethod } = this;
  if (requestMethod === 'OPTIONS') {
    /**
     *   Technical debt: The `/whoami/` endpoint happens to have the same
     * response headers as we want here. As time permits, we should clone it to
     * Write Everything Twice.
     */
    return new WhoAmIOptionsResponse(this);
  }

  const { analyticsId, analyticsSecret } = this;
  const response: unknown = await this.fetchJson(
    `https://api.cloudflare.com/client/v4/accounts/${analyticsId}/analytics_engine/sql`,
    {
      body: ANALYTICS_BODY,
      method: 'POST',

      headers: new Headers({
        Authorization: `Bearer ${analyticsSecret}`,
      }),
    },
  );

  return handleAnalyticsEngineResponse.call(this, response);
}
