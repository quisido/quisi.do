/// <reference types="@cloudflare/workers-types" />

import hasMethod from "./has-method.js";
import isRecord from "./is-record.js";

export default function isAnalyticsEngineDataset(
  value: unknown,
): value is AnalyticsEngineDataset {
  return (
    isRecord(value) &&
    hasMethod(value, 'writeDataPoint')
  );
}
