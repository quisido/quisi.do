import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
} from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthClientSecret(): string {
  const secret: unknown = getEnv('PATREON_OAUTH_CLIENT_SECRET');

  if (typeof secret === 'string') {
    return secret;
  }

  if (typeof secret === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonOAuthClientSecret });
    throw new FatalError(ErrorCode.MissingPatreonOAuthClientSecret);
  }

  emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthClientSecret,
    value: JSON.stringify(secret),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthClientSecret,
    type: typeof secret,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthClientSecret);
}
