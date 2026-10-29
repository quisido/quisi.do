/// <reference types="@cloudflare/workers-types" />

import { isRecord } from 'fmrs';
import hasMethod from './has-method.js';

export default function isAnalyticsEngineDataset(
  value: unknown,
): value is AnalyticsEngineDataset {
  return isRecord(value) && hasMethod(value, 'writeDataPoint');
}
