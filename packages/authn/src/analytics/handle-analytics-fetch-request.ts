import { AnalyticsResponseCode } from '@quisido/authn-shared';
import { isAnalyticsEngineResponse, StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import AnalyticsResponseInit from './analytics-response-init.js';
import reduceAnalyticsEngineRowsToResponse from './reduce-analytics-engine-rows-to-response.js';

const ANALYTICS_BODY = `
SELECT *
FROM AUTHN_PUBLIC
ORDER BY timestamp DESC;
`;

export default async function handleAnalyticsFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  // Options
  if (this.requestMethod === 'OPTIONS') {
    return new Response(
      null,
      new AnalyticsResponseInit(StatusCode.OK, {
        accessControlAllowOrigin: this.accessControlAllowOrigin,
      }),
    );
  }

  const json: unknown = await this.fetchJson(
    `https://api.cloudflare.com/client/v4/accounts/${this.analyticsId}/analytics_engine/sql`,
    {
      body: ANALYTICS_BODY,
      method: 'POST',

      headers: new Headers({
        Authorization: `Bearer ${this.analyticsSecret}`,
      }),
    },
  );

  if (!isAnalyticsEngineResponse(json)) {
    this.emitPrivateMetric(MetricName.InvalidAnalyticsResponse, {
      value: JSON.stringify(json),
    });

    return new Response(
      JSON.stringify({
        code: AnalyticsResponseCode.InvalidResponse,
      }),
      new AnalyticsResponseInit(StatusCode.BadGateway, {
        accessControlAllowOrigin: this.accessControlAllowOrigin,
      }),
    );
  }

  const spacing = 2;
  return new Response(
    JSON.stringify(
      json.data.reduce(reduceAnalyticsEngineRowsToResponse.bind(this), {}),
      null,
      spacing,
    ),
  );
}
