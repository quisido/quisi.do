import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenError(
  this: AuthnFetchHandler,
  body: string,
  json: unknown,
): never {
  this.emitPrivateMetric(MetricName.InvalidPatreonAccessTokenError, {
    value: body,
  });

  this.emitPublicMetric(MetricName.InvalidPatreonAccessTokenError, {
    type: typeof json,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenError);
}
