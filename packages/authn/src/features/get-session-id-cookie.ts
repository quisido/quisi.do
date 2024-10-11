import { ErrorCode } from '@quisido/authn-shared';
import type Worker from '@quisido/worker';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';

export default function getSessionIdCookie(this: Worker): string {
  const cookies: Partial<Record<string, string>> = this.getCookies();
  const sessionId: string | undefined = cookies['__Secure-Session-ID'];
  if (typeof sessionId === 'string') {
    return sessionId;
  }

  this.emitPrivateMetric({
    name: MetricName.MissingSessionIdCookie,
    value: JSON.stringify(cookies),
  });

  this.emitPublicMetric({
    keys: Object.keys(cookies).join(', '),
    name: MetricName.MissingSessionIdCookie,
  });

  throw new FatalError(ErrorCode.MissingSessionIdCookie);
}
