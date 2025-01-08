import {
  FaviconIcoResponse,
  RobotsTxtResponse,
  StatusCode,
} from 'cloudflare-utils';
import { mapToError } from 'fmrs';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';
import getDatadogAggregateRumEvents from '../datadog-aggregate-rum-events/get-datadog-aggregate-rum-events.js';
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
    const [
      {
        cumulativeLayoutShift,
        firstContentfulPaint,
        interactionToNextPaint,
        largestContentfulPaint,
        loadingTime,
      },
    ] = await Promise.all([getDatadogAggregateRumEvents.call(this)]);

    return new Response('', {
      status: StatusCode.OK,

      headers: new Headers({
        'access-control-allow-origin': this.accessControlAllowOrigin,
        'content-type': 'application/json; charset=utf-8',
      }),
    });
  } catch (err: unknown) {
    const error: Error = mapToError(err);
    this.logError(error);
    return new Response('{"code":0}', {
      status: StatusCode.InternalServerError,

      headers: new Headers({
        'access-control-allow-origin': this.accessControlAllowOrigin,
      }),
    });
  }
}
