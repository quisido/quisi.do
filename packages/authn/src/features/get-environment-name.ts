import EnvironmentName from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
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

  emitPrivateMetric({
    name: MetricName.InvalidEnvironmentName,
    value: JSON.stringify(envName),
  });

  emitPublicMetric({
    name: MetricName.InvalidEnvironmentName,
    type: typeof envName,
  });

  return EnvironmentName.Unknown;
}
