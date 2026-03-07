import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import AnalyticsResponseInit from './analytics-response-init.js';
import createAnalyticsErrorResponse from './create-analytics-error-response.js';
import fetchAnalyticsData from './fetch-analytics-data.js';

export default async function handleAnalyticsFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  if (this.requestMethod === 'OPTIONS') {
    return new Response(
      null,
      new AnalyticsResponseInit(StatusCode.OK, {
        accessControlAllowOrigin: this.accessControlAllowOrigin,
      }),
    );
  }

  try {
    return await fetchAnalyticsData.call(this);
  } catch (err: unknown) {
    return createAnalyticsErrorResponse.call(this, err);
  }
}
