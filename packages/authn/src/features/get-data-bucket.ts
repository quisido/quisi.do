import { mapToString } from 'fmrs';
import { MetricName } from '../constants/metric-name.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function getDataBucket(
  this: AuthnFetchHandler,
): R2Bucket | null {
  try {
    return this.getR2Bucket('AUTHN_DATA');
  } catch (err: unknown) {
    this.emitPrivateMetric(MetricName.InvalidDataBucket, {
      message: mapToString(err),
    });

    return null;
  }
}
