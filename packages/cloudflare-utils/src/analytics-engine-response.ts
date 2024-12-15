import type AnalyticsEngineRow from './analytics-engine-row.js';

type Type = 'DateTime' | 'Float64' | 'String' | 'UInt32';

interface Meta {
  readonly name: keyof AnalyticsEngineRow;
  readonly type: Type;
}

export default interface AnalyticsEngineResponse {
  readonly data: readonly AnalyticsEngineRow[];
  readonly meta: readonly Meta[];
}
