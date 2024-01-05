import RUM_PAGELOAD_EVENTS_ADAPTIVE_GROUPS from './rum-pageload-events-adaptive-groups.js';
import RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS from './rum-performance-events-adaptive-groups.js';
import RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS_QUANTILES_CF from './rum-performance-events-adaptive-groups-quantiles-cf.js';
import RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS_QUANTILES_LR from './rum-performance-events-adaptive-groups-quantiles-lr.js';
import WORKERS_ANALYTICS_ENGINE_ADAPTIVE_GROUPS from './workers-analytics-engine-adaptive-groups.js';
import WORKERS_INVOCATION_ADAPTIVE from './workers-invocations-adaptive.js';
import WORKERS_INVOCATION_ADAPTIVE_QUANTILES from './workers-invocations-adaptive-quantiles.js';
import ZONE_ANALYTICS from './zone-analytics.js';

export default [
  RUM_PAGELOAD_EVENTS_ADAPTIVE_GROUPS,
  RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS,
  RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS_QUANTILES_CF,
  RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS_QUANTILES_LR,
  WORKERS_ANALYTICS_ENGINE_ADAPTIVE_GROUPS,
  WORKERS_INVOCATION_ADAPTIVE,
  WORKERS_INVOCATION_ADAPTIVE_QUANTILES,
  ZONE_ANALYTICS,
];
