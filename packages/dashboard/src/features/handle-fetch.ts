import { FaviconIcoResponse, RobotsTxtResponse } from 'cloudflare-utils';
import { mapToError } from 'fmrs';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import getDatadogAggregateRumEvents from '../datadog-aggregate-rum-events/get-datadog-aggregate-rum-events.js';
import buildResponseBody from './build-response-body.js';
import InternalServerErrorResponse from './internal-server-error-response.js';
import OkResponse from './ok-response.js';
import OptionsResponse from './options-response.js';

export default async function handleFetch(
  this: DashboardFetchHandler,
): Promise<Response> {
  if (this.requestMethod === 'OPTIONS') {
    return new OptionsResponse(this.accessControlAllowOrigin);
  }

  if (this.requestPathname === '/favicon.ico') {
    return new FaviconIcoResponse();
  }

  if (this.requestPathname === '/robots.txt') {
    return new RobotsTxtResponse();
  }

  try {
    const [rumEvents] = await Promise.all([
      getDatadogAggregateRumEvents.call(this),
    ]);

    return new OkResponse(buildResponseBody(rumEvents), {
      accessControlAllowOrigin: this.accessControlAllowOrigin,
    });
  } catch (err: unknown) {
    const error: Error = mapToError(err);
    this.logError(error);
    return new InternalServerErrorResponse(this.accessControlAllowOrigin);
  }
}
