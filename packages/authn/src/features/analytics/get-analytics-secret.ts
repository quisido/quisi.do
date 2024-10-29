import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function getAnalyticsSecret(this: Worker): string {
  const secret: unknown = this.getEnv('ANALYTICS_SECRET');
  if (typeof secret === 'string') {
    return secret;
  }

  if (typeof secret === 'undefined') {
    throw new FatalError(ErrorCode.MissingAnalyticsSecret);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidAnalyticsSecret,
    value: JSON.stringify(secret),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidAnalyticsSecret,
    type: typeof secret,
  });

  throw new FatalError(ErrorCode.InvalidAnalyticsSecret);
}
