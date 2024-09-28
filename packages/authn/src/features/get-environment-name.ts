import type Worker from '@quisido/worker';
import EnvironmentName from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import isEnvironmentName from '../utils/is-environment-name.js';

export default function getEnvironmentName(this: Worker): EnvironmentName {
  const envName: unknown = this.getEnv('ENVIRONMENT_NAME');
  if (isEnvironmentName(envName)) {
    return envName;
  }

  if (typeof envName === 'undefined') {
    this.emitPublicMetric({ name: MetricName.MissingEnvironmentName });
    return EnvironmentName.Unknown;
  }

  this.emitPrivateMetric({
    name: MetricName.InvalidEnvironmentName,
    value: JSON.stringify(envName),
  });

  this.emitPublicMetric({
    name: MetricName.InvalidEnvironmentName,
    type: typeof envName,
  });

  return EnvironmentName.Unknown;
}
