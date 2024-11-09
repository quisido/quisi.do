import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function getSessionIdCookie(this: AuthnFetchHandler): string {
  const { cookies } = this;
  const sessionId: string | undefined = cookies['__Secure-Session-ID'];
  if (typeof sessionId === 'string') {
    return sessionId;
  }

  this.emitPrivateMetric(MetricName.MissingSessionIdCookie, {
    value: JSON.stringify(cookies),
  });

  this.emitPublicMetric(MetricName.MissingSessionIdCookie, {
    keys: Object.keys(cookies).join(', '),
  });

  throw new FatalError(ErrorCode.MissingSessionIdCookie);
}
