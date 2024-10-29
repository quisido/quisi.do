import type Worker from '@quisido/worker';
import WhoAmIOptionsResponse from '../../routes/whoami/whoami-options-response.js';
import getAnalyticsId from './get-analytics-id.js';
import getAnalyticsSecret from './get-analytics-secret.js';
import handleAnalyticsEngineResponse from './handle-analytics-engine-response.js';

const ANALYTICS_BODY = `
SELECT *
FROM AUTHN_PUBLIC
ORDER BY timestamp DESC;
`;

export default async function handleAnalyticsFetchRequest(
  this: Worker,
): Promise<Response> {
  // Options
  const method: string = this.getRequestMethod();
  if (method === 'OPTIONS') {
    /**
     *   Technical debt: The `/whoami/` endpoint happens to have the same
     * response headers as we want here. As time permits, we should clone it to
     * Write Everything Twice.
     */
    return new WhoAmIOptionsResponse(this);
  }

  const id: string = getAnalyticsId.call(this);
  const secret: string = getAnalyticsSecret.call(this);
  return await this.fetchJson(
    `https://api.cloudflare.com/client/v4/accounts/${id}/analytics_engine/sql`,
    {
      body: ANALYTICS_BODY,
      method: 'POST',

      headers: new Headers({
        Authorization: `Bearer ${secret}`,
      }),
    },
    handleAnalyticsEngineResponse,
  );
}
