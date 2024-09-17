import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
} from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthRedirectUri(): string {
  const uri: unknown = getEnv('PATREON_OAUTH_REDIRECT_URI');

  if (typeof uri === 'string') {
    return uri;
  }

  if (typeof uri === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonOAuthRedirectUri });
    throw new FatalError(ErrorCode.MissingPatreonOAuthRedirectUri);
  }

  emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthRedirectUri,
    value: JSON.stringify(uri),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthRedirectUri,
    type: typeof uri,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthRedirectUri);
}
