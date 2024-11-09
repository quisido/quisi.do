import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessToken(
  this: AuthnFetchHandler,
  accessToken: unknown,
): never {
  this.emitPrivateMetric(MetricName.InvalidPatreonAccessToken, {
    value: JSON.stringify(accessToken),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonAccessToken, {
    type: typeof accessToken,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessToken);
}
