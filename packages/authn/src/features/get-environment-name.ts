import { EnvironmentName } from '../constants/environment-name.js';
import { MetricName } from '../constants/metric-name.js';
import isEnvironmentName from '../utils/is-environment-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function getEnvironmentName(
  this: AuthnFetchHandler,
): EnvironmentName {
  const envName: unknown = this.getEnv('ENVIRONMENT_NAME');
  if (isEnvironmentName(envName)) {
    return envName;
  }

  if (typeof envName === 'undefined') {
    this.emitPublicMetric(MetricName.MissingEnvironmentName);
    return EnvironmentName.Unknown;
  }

  this.emitPrivateMetric(MetricName.InvalidEnvironmentName, {
    value: JSON.stringify(envName),
  });

  this.emitPublicMetric(MetricName.InvalidEnvironmentName, {
    type: typeof envName,
  });

  return EnvironmentName.Unknown;
}
