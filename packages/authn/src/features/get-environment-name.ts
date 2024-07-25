import { mapUnknownToString } from 'fmrs';
import EnvironmentName from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPublicMetric,
  getEnv,
  logPrivateError,
} from '../constants/worker.js';
import isEnvironmentName from '../utils/is-environment-name.js';

export default function getEnvironmentName(): EnvironmentName {
  const envName: unknown = getEnv('ENVIRONMENT_NAME');
  if (isEnvironmentName(envName)) {
    return envName;
  }

  if (typeof envName === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingEnvironmentName });
    return EnvironmentName.Unknown;
  }

  emitPublicMetric({
    name: MetricName.InvalidEnvironmentName,
    type: typeof envName,
  });

  logPrivateError(
    new Error('Invalid environment name', {
      cause: mapUnknownToString(envName),
    }),
  );

  return EnvironmentName.Unknown;
}
