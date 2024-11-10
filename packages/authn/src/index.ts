import { ExportedHandler } from '@quisido/worker';
import AuthnFetchHandler from './authn-fetch-handler.js';
import handleError from './handle-error.js';
import handleLog from './handle-log.js';
import handleMetric from './handle-metric.js';

export default new ExportedHandler({
  FetchHandler: AuthnFetchHandler,
  console,
  fetch,
  onError: handleError,
  onLog: handleLog,
  onMetric: handleMetric,
});
