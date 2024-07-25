import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
} from '../../constants/worker.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthRedirectUri(): string {
  const redirectUri: unknown = getEnv('PATREON_OAUTH_REDIRECT_URI');

  if (typeof redirectUri === 'string') {
    return redirectUri;
  }

  if (typeof redirectUri === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingPatreonOAuthRedirectUri });
    throw new FatalError(ErrorCode.MissingPatreonOAuthRedirectUri);
  }

  emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthRedirectUri,
    value: JSON.stringify(redirectUri),
  });

  emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthRedirectUri,
    type: typeof redirectUri,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthRedirectUri);
}
