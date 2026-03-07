import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleThrottledWhoAmI(
  this: AuthnFetchHandler,
): Response {
  this.emitPublicMetric(MetricName.WhoAmIThrottled);
  this.emitPrivateMetric(MetricName.WhoAmIThrottled, {
    ip: this.ip,
  });

  return new WhoAmIResponse({
    accessControlAllowOrigin: this.accessControlAllowOrigin,
    code: WhoAmIResponseCode.Throttled,
    status: StatusCode.TooManyRequests,
  });
}
