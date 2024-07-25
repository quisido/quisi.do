import { mapUnknownToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPublicMetric,
  getEnv,
  logPrivateError,
} from '../constants/worker.js';

const DEFAULT_HOST = 'quisi.do';

export default function getHost(): string {
  const host: unknown = getEnv('HOST');
  if (typeof host === 'string' && host !== '') {
    return host;
  }

  if (typeof host === 'undefined' || host === '') {
    emitPublicMetric({ name: MetricName.MissingHost });
    return DEFAULT_HOST;
  }

  emitPublicMetric({
    name: MetricName.InvalidHost,
    type: typeof host,
  });

  logPrivateError(
    new Error('Invalid host', { cause: mapUnknownToString(host) }),
  );

  return DEFAULT_HOST;
}
