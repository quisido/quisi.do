import { isAnalyticsEngineResponse } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import reduceAnalyticsEngineRowsToResponse from './reduce-analytics-engine-rows-to-response.js';
import AnalyticsOptionsResponse from './options-response.js';
import handleInvalidAnalyticsResponse from './handle-invalid-analytics-response.js';
import fetchAnalytics from './fetch-analytics.js';
import handleAnalyticsError from './handle-analytics-error.js';



export default async function handleAnalyticsFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  if (this.requestMethod === 'OPTIONS') {
    return new AnalyticsOptionsResponse(this.accessControlAllowOrigin);
  }

  try {
    const json: unknown = await fetchAnalytics.call(this);

    if (!isAnalyticsEngineResponse(json)) {
      return handleInvalidAnalyticsResponse.call(this, json);
    }

    return new Response(
      JSON.stringify(
        json.data.reduce(reduceAnalyticsEngineRowsToResponse.bind(this), {}),
      ),
    );
  } catch (err: unknown) {
    return handleAnalyticsError.call(this, err);
  }
}
