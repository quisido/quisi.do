import { client, v2 } from '@datadog/datadog-api-client';
import {
  FaviconIcoResponse,
  RobotsTxtResponse,
  StatusCode,
} from 'cloudflare-utils';
import { mapToError } from 'fmrs';
import { AGGREGATE_DATADOG_RUM_EVENTS_REQUEST } from '../constants/aggregate-datadog-rum-events-request.js';
import { MetricName } from '../constants/metric-name.js';
import type DashboardFetchHandler from '../dashboard-fetch-handler.js';

const BASE = 10;
const CUMULATIVE_LAYOUT_SHIFT_DECIMALS = 4;
const DEFAULT_ELAPSED = 0;
const DEFAULT_WARNING_CODE = 0;
const NANOSECONDS_PER_MILLISECOND = 1_000_000;

export default async function handleFetch(
  this: DashboardFetchHandler,
): Promise<Response> {
  if (this.requestMethod === 'OPTIONS') {
    return new Response(null, {
      status: StatusCode.OK,

      headers: new Headers({
        'access-control-allow-origin': this.accessControlAllowOrigin,
      }),
    });
  }

  if (this.requestPathname === '/favicon.ico') {
    return new FaviconIcoResponse();
  }

  if (this.requestPathname === '/robots.txt') {
    return new RobotsTxtResponse();
  }

  const datadog = new v2.RUMApi(
    client.createConfiguration({
      debug: true,
      enableRetry: true,
      fetch: this.fetch.bind(this),

      authMethods: {
        apiKeyAuth: this.datadogApiKey,
        appKeyAuth: this.datadogRumReadApplicationKey,
      },

      httpConfig: {
        compress: true,
      },
    }),
  );

  try {
    const {
      data = {},
      meta: {
        elapsed = DEFAULT_ELAPSED,
        requestId = '',
        status,
        warnings = [],
      } = {},
    } = await datadog.aggregateRUMEvents(AGGREGATE_DATADOG_RUM_EVENTS_REQUEST);

    if (typeof warnings !== 'undefined') {
      for (const {
        code = DEFAULT_WARNING_CODE,
        detail = 'No details available',
        title = 'Unknown warning',
      } of warnings) {
        this.logError(
          new Error(
            `Datadog warning: ${title} (code: ${code}, detail: ${detail})`,
          ),
        );
      }
    }

    const getStatus = (): string => {
      if (typeof status === 'undefined') {
        return 'unknown';
      }

      if (typeof status === 'string') {
        return status;
      }

      return 'unparsed';
    };

    const {
      buckets: [
        { computes: { c0: cls, c1: fcp, c2: inp, c3: lcp, c4: lt } = {} } = {},
      ] = [],
    } = data;

    const statusStr: string = getStatus();
    if (
      typeof cls !== 'number' ||
      typeof fcp !== 'number' ||
      typeof inp !== 'number' ||
      typeof lcp !== 'number' ||
      typeof lt !== 'number'
    ) {
      this.emitPublicMetric(MetricName.InvalidDatadogRumResponse, {
        elapsed,
        requestId,
        status: statusStr,
      });

      this.logError(
        new Error(`Invalid Datadog RUM response: ${JSON.stringify(data)}`),
      );

      return new Response('{"code":2}', {
        status: StatusCode.OK,

        headers: new Headers({
          'access-control-allow-origin': this.accessControlAllowOrigin,
          'content-type': 'application/json; charset=utf-8',
        }),
      });
    }

    return new Response(
      JSON.stringify({
        code: 1,
        fcp: Math.round(fcp / NANOSECONDS_PER_MILLISECOND),
        inp: Math.round(inp / NANOSECONDS_PER_MILLISECOND),
        lcp: Math.round(lcp / NANOSECONDS_PER_MILLISECOND),
        lt: Math.round(lt / NANOSECONDS_PER_MILLISECOND),

        cls:
          Math.round(cls * BASE ** CUMULATIVE_LAYOUT_SHIFT_DECIMALS) /
          BASE ** CUMULATIVE_LAYOUT_SHIFT_DECIMALS,
      }),
      {
        status: StatusCode.OK,

        headers: new Headers({
          'access-control-allow-origin': this.accessControlAllowOrigin,
          'content-type': 'application/json; charset=utf-8',
        }),
      },
    );
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
