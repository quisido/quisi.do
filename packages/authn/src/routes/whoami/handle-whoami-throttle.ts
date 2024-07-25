import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import { MetricName } from '../../constants/metric-name.js';
import { emitPrivateMetric, emitPublicMetric } from '../../constants/worker.js';
import WhoAmIResponse from './whoami-response.js';

export default function handleWhoAmIThrottle(ip: string): Response {
  emitPrivateMetric({ ip, name: MetricName.WhoAmIThrottled });
  emitPublicMetric({ name: MetricName.WhoAmIThrottled });
  return new WhoAmIResponse({
    code: WhoAmIResponseCode.Throttled,
    status: StatusCode.TooManyRequests,
  });
}
