import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthClientSecret(this: Worker): string {
  const secret: unknown = this.getEnv('PATREON_OAUTH_CLIENT_SECRET');

  if (typeof secret === 'string') {
    return secret;
  }

  if (typeof secret === 'undefined') {
    this.emitPublicMetric({ name: MetricName.MissingPatreonOAuthClientSecret });
    throw new FatalError(ErrorCode.MissingPatreonOAuthClientSecret);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthClientSecret,
    value: JSON.stringify(secret),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthClientSecret,
    type: typeof secret,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthClientSecret);
}
