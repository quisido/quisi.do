import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonAccessToken(
  this: AuthnFetchHandler,
  token: Record<string, unknown>,
): never {
  this.emitPublicMetric(MetricName.MissingPatreonAccessToken);
  this.emitPrivateMetric(MetricName.MissingPatreonAccessToken, {
    value: JSON.stringify(token),
  });

  throw new FatalError(ErrorCode.MissingPatreonAccessToken);
}
