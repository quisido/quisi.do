import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function validatePatreonOAuthToken(
  this: AuthnFetchHandler,
  token: unknown,
): Record<string, unknown> {
  if (isRecord(token)) {
    return token;
  }

  this.emitPrivateMetric(MetricName.InvalidPatreonOAuthToken, {
    value: JSON.stringify(token),
  });

  this.emitPublicMetric(MetricName.InvalidPatreonOAuthToken, {
    type: typeof token,
  });

  throw new FatalError(ErrorCode.InvalidPatreonOAuthToken);
}
