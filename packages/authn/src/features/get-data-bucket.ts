import type Worker from '@quisido/worker';
import { mapToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';

export default function getDataBucket(this: Worker): R2Bucket | null {
  try {
    return this.getR2Bucket('AUTHN_DATA');
  } catch (err: unknown) {
    this.emitPrivateMetric({
      message: mapToString(err),
      name: MetricName.InvalidDataBucket,
    });

    return null;
  }
}
