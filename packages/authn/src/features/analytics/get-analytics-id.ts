import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';

export default function getAnalyticsId(this: AuthnFetchHandler): string {
  const id: unknown = this.getEnv('ANALYTICS_ID');
  if (typeof id === 'string') {
    return id;
  }

  if (typeof id === 'undefined') {
    throw new FatalError(ErrorCode.MissingAnalyticsId);
  }

  this.emitPrivateMetric(MetricName.InvalidAnalyticsId, {
    value: JSON.stringify(id),
  });

  this.emitPublicMetric(MetricName.InvalidAnalyticsId, {
    type: typeof id,
  });

  throw new FatalError(ErrorCode.InvalidAnalyticsId);
}
