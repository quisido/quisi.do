import { mapUnknownToString } from 'fmrs';
import MetricName from '../constants/metric-name.js';
import getEnv from '../utils/get-env.js';
import getTelemetry from '../utils/get-telemetry.js';
import isR2Bucket from '../utils/is-r2-bucket.js';

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

  emitPublicMetric({ name: MetricName.InvalidDataBucket });
  logPrivateError(
    new Error('Invalid data bucket', {
      cause: mapUnknownToString(AUTHN_DATA),
    }),
  );
  return null;
}
