import type Worker from '@quisido/worker';
import { mapUnknownToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';

export default function getDataBucket(this: Worker): R2Bucket | null {
  try {
    return this.getR2Bucket('AUTHN_DATA');
  } catch (err: unknown) {
    this.emitPrivateMetric({
      message: mapUnknownToString(err),
      name: MetricName.InvalidDataBucket,
    });

    return null;
  }
}
