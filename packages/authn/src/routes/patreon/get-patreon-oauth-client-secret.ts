import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
} from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthClientSecret(): string {
  const clientSecret: unknown = getEnv('PATREON_OAUTH_CLIENT_SECRET');

  if (typeof clientSecret !== 'string') {
    if (typeof clientSecret === 'undefined') {
      emitPublicMetric({ name: MetricName.MissingPatreonOAuthClientSecret });
      throw new FatalError(ErrorCode.MissingPatreonOAuthClientSecret);
    }

    emitPrivateMetric({
      name: MetricName.InvalidPatreonOAuthClientSecret,
      value: JSON.stringify(clientSecret),
    });

    emitPublicMetric({
      name: MetricName.InvalidPatreonOAuthClientSecret,
      type: typeof clientSecret,
    });

    throw new FatalError(ErrorCode.InvalidPatreonOAuthClientSecret);
  }

  return clientSecret;
}
