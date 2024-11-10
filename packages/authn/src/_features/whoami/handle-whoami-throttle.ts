import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import { MetricName } from '../../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleWhoAmIThrottle(
  this: AuthnFetchHandler,
  ip: string,
): Response {
  const { emitPrivateMetric, emitPublicMetric } = this;
  emitPublicMetric(MetricName.WhoAmIThrottled);
  emitPrivateMetric(MetricName.WhoAmIThrottled, {
    ip,
  });

  return new WhoAmIResponse(this, {
    code: WhoAmIResponseCode.Throttled,
    status: StatusCode.TooManyRequests,
  });
}
