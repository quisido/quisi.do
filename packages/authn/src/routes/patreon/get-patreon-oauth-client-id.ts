import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../../constants/metric-name.js';
import FatalError from '../../utils/fatal-error.js';

export default function getPatreonOAuthClientId(this: Worker): string {
  const clientId: unknown = this.getEnv('PATREON_OAUTH_CLIENT_ID');

  if (typeof clientId === 'string') {
    return clientId;
  }

  if (typeof clientId === 'undefined') {
    this.emitPublicMetric({ name: MetricName.MissingPatreonOAuthClientId });
    throw new FatalError(ErrorCode.MissingPatreonOAuthClientId);
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidPatreonOAuthClientId,
    value: JSON.stringify(clientId),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidPatreonOAuthClientId,
    type: typeof clientId,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthClientId);
}
