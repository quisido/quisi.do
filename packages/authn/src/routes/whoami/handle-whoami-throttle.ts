import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleWhoAmIThrottle(
  this: AuthnFetchHandler,
  ip: string,
): Response {
  this.emitPublicMetric(MetricName.WhoAmIThrottled);
  this.emitPrivateMetric(MetricName.WhoAmIThrottled, {
    ip,
  });

  return new WhoAmIResponse(this, {
    code: WhoAmIResponseCode.Throttled,
    status: StatusCode.TooManyRequests,
  });
}
