import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

const FORBIDDEN = 403;
const HTTP_REDIRECTION = 300;

export default function validatePatreonResponseStatus(
  this: AuthnFetchHandler,
  status: number,
  identity: unknown,
): void {
  if (status === FORBIDDEN) {
    this.emitPublicMetric(MetricName.ForbiddenPatreonIdentityResponse);
    this.emitPrivateMetric(MetricName.ForbiddenPatreonIdentityResponse, {
      value: JSON.stringify(identity),
    });
    throw new FatalError(ErrorCode.ForbiddenPatreonIdentityResponse);
  }

  if (status >= HTTP_REDIRECTION) {
    this.emitPrivateMetric(MetricName.UnknownPatreonIdentityError, {
      identity: JSON.stringify(identity),
      status,
    });
    this.emitPublicMetric(MetricName.UnknownPatreonIdentityError, {
      status,
    });
    throw new FatalError(ErrorCode.UnknownPatreonIdentityError);
  }
}
