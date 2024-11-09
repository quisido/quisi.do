import { ErrorCode } from '@quisido/authn-shared';
import { mapToString } from 'fmrs';
import { MetricName } from '../../constants/metric-name.js';
import type AuthnFetchHandler from '../../features/authn-fetch-handler.js';
import FatalError from '../../utils/fatal-error.js';

export default function handleUnknownPatreonAccessTokenErrorCode(
  this: AuthnFetchHandler,
  code: unknown,
  json: Record<string, unknown>,
): never {
  this.emitPublicMetric(MetricName.UnknownPatreonAccessTokenErrorCode);
  this.emitPrivateMetric(MetricName.UnknownPatreonAccessTokenErrorCode, {
    code: mapToString(code),
    value: JSON.stringify({
      ...json,
      error: undefined,
    }),
  });

  throw new FatalError(ErrorCode.UnknownPatreonAccessTokenErrorCode);
}
