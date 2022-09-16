import RUM_PAGELOAD_EVENTS_ADAPTIVE_GROUPS from './rum-pageload-events-adaptive-groups';
import RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS from './rum-performance-events-adaptive-groups';
import RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS_QUANTILES_CF from './rum-performance-events-adaptive-groups-quantiles-cf';
import RUM_PERFORMANCE_EVENTS_ADAPTIVE_GROUPS_QUANTILES_LR from './rum-performance-events-adaptive-groups-quantiles-lr';
import WORKERS_ANALYTICS_ENGINE_ADAPTIVE_GROUPS from './workers-analytics-engine-adaptive-groups';
import WORKERS_INVOCATION_ADAPTIVE from './workers-invocations-adaptive';
import WORKERS_INVOCATION_ADAPTIVE_QUANTILES from './workers-invocations-adaptive-quantiles';
import ZONE_ANALYTICS from './zone-analytics';

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
