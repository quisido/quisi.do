import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
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

  emitPrivateMetric({
    name: MetricName.InvalidHost,
    value: JSON.stringify(host),
  });

  emitPublicMetric({
    name: MetricName.InvalidHost,
    type: typeof host,
  });

  return DEFAULT_HOST;
}
