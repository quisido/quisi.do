import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthRedirectUri(this: Worker): string {
  const uri: unknown = this.getEnv('PATREON_OAUTH_REDIRECT_URI');

  if (typeof uri === 'string') {
    return uri;
  }

  if (typeof uri === 'undefined') {
    this.emitPublicMetric({ name: MetricName.MissingPatreonOAuthRedirectUri });
    throw new FatalError(ErrorCode.MissingPatreonOAuthRedirectUri);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthRedirectUri,
    value: JSON.stringify(uri),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthRedirectUri,
    type: typeof uri,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthRedirectUri);
}
