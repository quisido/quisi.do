import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';
import type AuthnFetchHandler from '../authn-fetch-handler.js';

export default function getAnalyticsSecret(this: AuthnFetchHandler): string {
  const secret: unknown = this.getEnv('ANALYTICS_SECRET');
  if (typeof secret === 'string') {
    return secret;
  }

  if (typeof secret === 'undefined') {
    throw new FatalError(ErrorCode.MissingAnalyticsSecret);
  }

  this.emitPrivateMetric(MetricName.InvalidAnalyticsSecret, {
    value: JSON.stringify(secret),
  });

  this.emitPublicMetric(MetricName.InvalidAnalyticsSecret, {
    type: typeof secret,
  });

  throw new FatalError(ErrorCode.InvalidAnalyticsSecret);
}
