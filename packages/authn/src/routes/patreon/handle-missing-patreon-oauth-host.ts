import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonOAuthHost(
  this: AuthnFetchHandler,
): never {
  this.emitPublicMetric(MetricName.MissingPatreonOAuthHost);
  throw new FatalError(ErrorCode.MissingPatreonOAuthHost);
}
