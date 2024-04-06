import { mapUnknownToString } from 'map-reduce-sort';
import EnvironmentName from '../constants/environment-name.js';
import MetricName from '../constants/metric-name.js';
import getEnv from '../utils/get-env.js';
import getTelemetry from '../utils/get-telemetry.js';
import isEnvironmentName from '../utils/is-environment-name.js';

export default function getEnvironmentName(): EnvironmentName {
  const { ENVIRONMENT_NAME } = getEnv();
  const { emitPublicMetric, logPrivateError } = getTelemetry();

  if (typeof ENVIRONMENT_NAME === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingEnvironmentName });
    return EnvironmentName.Unknown;
  }

  if (!isEnvironmentName(ENVIRONMENT_NAME)) {
    emitPublicMetric({ name: MetricName.InvalidEnvironmentName });
    logPrivateError(
      new Error('Invalid environment name', {
        cause: mapUnknownToString(ENVIRONMENT_NAME),
      }),
    );
    return EnvironmentName.Unknown;
  }

  return ENVIRONMENT_NAME;
}
