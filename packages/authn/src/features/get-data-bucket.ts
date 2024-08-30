import { mapUnknownToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import {
  emitPrivateMetric,
  getR2Bucket,
} from '../constants/worker.js';

export default function getDataBucket(): R2Bucket | null {
  try {
    return getR2Bucket('AUTHN_DATA');
  } catch (err: unknown) {
    emitPrivateMetric({
      message: mapUnknownToString(err),
      name: MetricName.InvalidDataBucket,
    });

    return null;
  }
}
