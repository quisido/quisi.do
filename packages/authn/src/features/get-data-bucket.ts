import { isR2Bucket } from 'cloudflare-utils';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  emitPublicMetric,
  getEnv,
} from '../constants/worker.js';

export default function getDataBucket(): R2Bucket | null {
  const data: unknown = getEnv('AUTHN_DATA');
  if (isR2Bucket(data)) {
    return data;
  }

  if (typeof data === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingDataBucket });
    return null;
  }

  emitPrivateMetric({
    name: MetricName.InvalidDataBucket,
    value: typeof JSON.stringify(data),
  });

  emitPublicMetric({
    name: MetricName.InvalidDataBucket,
    type: typeof data,
  });

  return null;
}
