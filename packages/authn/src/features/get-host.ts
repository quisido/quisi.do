import { mapUnknownToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import getEnv from '../utils/get-env.js';
import getTelemetry from '../utils/get-telemetry.js';

const DEFAULT_HOST = 'https://quisi.do/';

export default function getHost(): string {
  const { HOST } = getEnv();
  if (typeof HOST === 'string' && HOST !== '') {
    return HOST;
  }

  const { emitPublicMetric, logPrivateError } = getTelemetry();
  if (typeof HOST === 'undefined' || HOST === '') {
    emitPublicMetric({ name: MetricName.MissingHost });
    return DEFAULT_HOST;
  }

  emitPublicMetric({
    name: MetricName.InvalidHost,
    type: typeof HOST,
  });

  logPrivateError(
    new Error('Invalid host', { cause: mapUnknownToString(HOST) }),
  );

  return DEFAULT_HOST;
}
