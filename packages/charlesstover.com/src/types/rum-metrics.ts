import type MetricStats from './metric-stats';
import type RumMetricKey from './rum-metric-key';

type RumMetrics = Record<RumMetricKey, MetricStats>;

export default RumMetrics;
