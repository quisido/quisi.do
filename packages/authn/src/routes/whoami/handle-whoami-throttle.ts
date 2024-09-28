import { WhoAmIResponseCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { StatusCode } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleWhoAmIThrottle(this: Worker,ip: string): Response {
  this.emitPrivateMetric({ ip, name: MetricName.WhoAmIThrottled });
  this.emitPublicMetric({ name: MetricName.WhoAmIThrottled });
  return new WhoAmIResponse(this,{
    code: WhoAmIResponseCode.Throttled,
    status: StatusCode.TooManyRequests,
  });
}
