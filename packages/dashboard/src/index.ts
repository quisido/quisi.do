/// <reference types="@cloudflare/workers-types" />

import { ExportedHandler } from '@quisido/worker';
import DashboardFetchHandler from './dashboard-fetch-handler.js';
import handleError from './handle-error.js';
import handleLog from './handle-log.js';
import handleMetric from './handle-metric.js';

export default new ExportedHandler({
  console,
  fetch,
  FetchHandler: DashboardFetchHandler,
  onError: handleError,
  onLog: handleLog,
  onMetric: handleMetric,
});
