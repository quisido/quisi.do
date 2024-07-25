import { ErrorCode } from '@quisido/authn-shared';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getCookies,
} from '../constants/worker.js';
import FatalError from '../utils/fatal-error.js';

export default function getSessionIdCookie(): string {
  const cookies: Partial<Record<string, string>> = getCookies();
  const sessionId: string | undefined = cookies['__Secure-Session-ID'];
  if (typeof sessionId !== 'string') {
    emitPrivateMetric({
      name: MetricName.MissingSessionIdCookie,
      value: JSON.stringify(cookies),
    });

    emitPublicMetric({
      keys: Object.keys(cookies).join(', '),
      name: MetricName.MissingSessionIdCookie,
    });

    throw new FatalError(ErrorCode.MissingSessionIdCookie);
  }

  return sessionId;
}
