import { isR2Bucket } from 'cloudflare-utils';
import { mapUnknownToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import getEnv from '../utils/get-env.js';
import getTelemetry from '../utils/get-telemetry.js';

export default function getDataBucket(): R2Bucket | null {
  const { AUTHN_DATA } = getEnv();
  if (isR2Bucket(AUTHN_DATA)) {
    return AUTHN_DATA;
  }

  const { emitPublicMetric, logPrivateError } = getTelemetry();
  if (typeof AUTHN_DATA === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingDataBucket });
    return null;
  }

  emitPublicMetric({
    name: MetricName.InvalidDataBucket,
    type: typeof AUTHN_DATA,
  });

  logPrivateError(
    new Error('Invalid data bucket', {
      cause: mapUnknownToString(AUTHN_DATA),
    }),
  );

  return null;
}
