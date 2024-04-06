import { mapUnknownToString } from 'map-reduce-sort';
import MetricName from '../constants/metric-name.js';
import getEnv from '../utils/get-env.js';
import getTelemetry from '../utils/get-telemetry.js';

const DEFAULT_HOST = 'https://quisi.do/';

export default function getHost(): string {
  const { HOST } = getEnv();
  const { emitPublicMetric, logPrivateError } = getTelemetry();

  if (typeof HOST === 'undefined' || HOST === '') {
    emitPublicMetric({ name: MetricName.MissingHost });
    return DEFAULT_HOST;
  }

  if (typeof HOST !== 'string') {
    emitPublicMetric({ name: MetricName.InvalidHost });
    logPrivateError(
      new Error('Invalid host', { cause: mapUnknownToString(HOST) }),
    );
    return DEFAULT_HOST;
  }

  return HOST;
}
