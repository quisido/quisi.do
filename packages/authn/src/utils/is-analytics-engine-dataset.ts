/// <reference types="@cloudflare/workers-types" />
import isObject from './is-object.js';

export default function isAnaylticsEngineDataset(
  value: unknown,
): value is AnalyticsEngineDataset {
  return (
    isObject(value) &&
    'writeDataPoint' in value &&
    typeof value.writeDataPoint === 'function'
  );
}
