import type { AnalyticsEngineRow } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import { type Datum } from './datum.js';
import isMetricName from './is-metric-name.js';
import mapRowToDatum from './map-row-to-datum.js';
import TIMESTAMP_METRIC_NAMES from './timestamp-metric-names.js';

const mapRowToTimestamp = ({ timestamp }: AnalyticsEngineRow): number =>
  new Date(timestamp).getTime() / MILLISECONDS_PER_SECOND;

export default function mapAnalyticsEngineRowIndexToDatumFactory(
  this: AuthnFetchHandler,
  index: string,
): (row: AnalyticsEngineRow) => Datum {
  if (!isMetricName(index)) {
    this.emitPrivateMetric(MetricName.InvalidAnalyticsMetricName, {
      value: index,
    });
    return mapRowToDatum;
  }

  if (TIMESTAMP_METRIC_NAMES.has(index)) {
    return mapRowToTimestamp;
  }

  return mapRowToDatum;
}
