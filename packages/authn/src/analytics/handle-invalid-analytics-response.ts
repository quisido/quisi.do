import { AnalyticsResponseCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import AnalyticsResponseInit from './analytics-response-init.js';
import { StatusCode } from 'cloudflare-utils';

export default function handleInvalidAnalyticsResponse(
  this: AuthnFetchHandler,
  json: unknown,
): Response {
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
