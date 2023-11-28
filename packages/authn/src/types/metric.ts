import type MetricName from '../constants/metric-name.js';

export type Metric = Record<'name', MetricName> &
  Partial<Record<string, number | string>>;
