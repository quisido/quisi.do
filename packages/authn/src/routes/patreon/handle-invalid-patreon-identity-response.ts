import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonIdentityResponse(
  this: AuthnFetchHandler,
): never {
  this.emitPublicMetric(MetricName.InvalidPatreonIdentityResponse);
  throw new FatalError(ErrorCode.InvalidPatreonIdentityResponse);
}
