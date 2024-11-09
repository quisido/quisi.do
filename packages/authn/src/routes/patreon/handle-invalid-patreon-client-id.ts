import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonClientId(
  this: AuthnFetchHandler,
): never {
  const { patreonOAuthClientId } = this;

  this.emitPublicMetric(MetricName.InvalidPatreonClientId, {
    clientId: patreonOAuthClientId,
  });

  throw new FatalError(ErrorCode.InvalidPatreonClientId);
}
