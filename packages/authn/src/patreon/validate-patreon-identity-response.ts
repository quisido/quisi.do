import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

const FORBIDDEN = 403;
const HTTP_REDIRECTION = 300;

export default function validatePatreonIdentityResponse(
  this: AuthnFetchHandler,
  response: Response,
  identity: unknown,
): Record<string, unknown> {
  if (typeof identity === 'undefined') {
    this.emitPublicMetric(MetricName.InvalidPatreonIdentityResponse);
    throw new FatalError(ErrorCode.InvalidPatreonIdentityResponse);
  }

  if (response.status === FORBIDDEN) {
    this.emitPublicMetric(MetricName.ForbiddenPatreonIdentityResponse);
    this.emitPrivateMetric(MetricName.ForbiddenPatreonIdentityResponse, {
      value: JSON.stringify(identity),
    });
    throw new FatalError(ErrorCode.ForbiddenPatreonIdentityResponse);
  }

  if (response.status >= HTTP_REDIRECTION) {
    this.emitPrivateMetric(MetricName.UnknownPatreonIdentityError, {
      identity: JSON.stringify(identity),
      status: response.status,
    });
    this.emitPublicMetric(MetricName.UnknownPatreonIdentityError, {
      status: response.status,
    });
    throw new FatalError(ErrorCode.UnknownPatreonIdentityError);
  }

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
