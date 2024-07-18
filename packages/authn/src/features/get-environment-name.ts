import { mapUnknownToString } from 'fmrs';
import EnvironmentName from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import getEnv from '../utils/get-env.js';
import getTelemetry from '../utils/get-telemetry.js';
import isEnvironmentName from '../utils/is-environment-name.js';

export default function getEnvironmentName(): EnvironmentName {
  const { ENVIRONMENT_NAME } = getEnv();
  if (isEnvironmentName(ENVIRONMENT_NAME)) {
    return ENVIRONMENT_NAME;
  }

  const { emitPublicMetric, logPrivateError } = getTelemetry();
  if (typeof ENVIRONMENT_NAME === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingEnvironmentName });
    return EnvironmentName.Unknown;
  }

  emitPublicMetric({
    name: MetricName.InvalidEnvironmentName,
    type: typeof ENVIRONMENT_NAME,
  });

  logPrivateError(
    new Error('Invalid environment name', {
      cause: mapUnknownToString(ENVIRONMENT_NAME),
    }),
  );

  return EnvironmentName.Unknown;
}
