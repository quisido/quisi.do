import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleInvalidPatreonAccessTokenErrorBody(
  this: AuthnFetchHandler,
  body: string,
): never {
  this.emitPublicMetric(MetricName.InvalidPatreonAccessTokenErrorBody);

  this.emitPrivateMetric(MetricName.InvalidPatreonAccessTokenErrorBody, {
    value: body,
  });

  throw new FatalError(ErrorCode.InvalidPatreonAccessTokenErrorBody);
}
