import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function getSessionIdCookie(this: AuthnFetchHandler): string {
  const sessionId: string | undefined = this.cookies['__Secure-Session-ID'];
  if (typeof sessionId === 'string') {
    return sessionId;
  }

  this.emitPrivateMetric(MetricName.MissingSessionIdCookie, {
    value: JSON.stringify(this.cookies),
  });

  this.emitPublicMetric(MetricName.MissingSessionIdCookie, {
    keys: Object.keys(this.cookies).join(', '),
  });

  throw new FatalError(ErrorCode.MissingSessionIdCookie);
}
