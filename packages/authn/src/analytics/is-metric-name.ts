import { MetricName } from '../constants/metric-name.js';

const METRIC_NAMES = new Set<unknown>(Object.values(MetricName));

export default function isMetricName(value: string): value is MetricName {
  return METRIC_NAMES.has(value);
}
