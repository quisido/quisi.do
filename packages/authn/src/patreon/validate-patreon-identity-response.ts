import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import validatePatreonResponseStatus from './validate-patreon-response-status.js';

export default function validatePatreonIdentityResponse(
  this: AuthnFetchHandler,
  response: Response,
  identity: unknown,
): Record<string, unknown> {
  if (typeof identity === 'undefined') {
    this.emitPublicMetric(MetricName.InvalidPatreonIdentityResponse);
    throw new FatalError(ErrorCode.InvalidPatreonIdentityResponse);
  }

  validatePatreonResponseStatus.call(this, response.status, identity);

  if (!isRecord(identity)) {
    this.emitPrivateMetric(MetricName.InvalidPatreonIdentity, {
      value: JSON.stringify(identity),
    });
    this.emitPublicMetric(MetricName.InvalidPatreonIdentity, {
      type: typeof identity,
    });
    throw new FatalError(ErrorCode.InvalidPatreonIdentity);
  }

  return identity;
}
