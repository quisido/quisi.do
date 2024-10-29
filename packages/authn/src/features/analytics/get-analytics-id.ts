import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function getAnalyticsId(this: Worker): string {
  const id: unknown = this.getEnv('ANALYTICS_ID');
  if (typeof id === 'string') {
    return id;
  }

  if (typeof id === 'undefined') {
    throw new FatalError(ErrorCode.MissingAnalyticsId);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidAnalyticsId,
    value: JSON.stringify(id),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidAnalyticsId,
    type: typeof id,
  });

  throw new FatalError(ErrorCode.InvalidAnalyticsId);
}
