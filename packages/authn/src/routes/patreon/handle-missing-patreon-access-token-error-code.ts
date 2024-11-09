import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleMissingPatreonAccessTokenErrorCode(
  this: AuthnFetchHandler,
  body: string,
  json: Record<string, unknown>,
): never {
  this.emitPrivateMetric(MetricName.MissingPatreonAccessTokenErrorCode, {
    value: body,
  });

  this.emitPublicMetric(MetricName.MissingPatreonAccessTokenErrorCode, {
    keys: Object.keys(json).join(', '),
  });

  throw new FatalError(ErrorCode.MissingPatreonAccessTokenErrorCode);
}
