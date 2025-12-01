import { ExportedHandler } from '@quisido/worker';
import AuthnFetchHandler from './authn-fetch-handler.js';
import handleError from './handle-error.js';
import handleLog from './handle-log.js';
import handleMetric from './handle-metric.js';
import handleFinally from './handle-finally.js';

export default new ExportedHandler({
  console,
  fetch,
  FetchHandler: AuthnFetchHandler,
  finally: handleFinally,
  onError: handleError,
  onLog: handleLog,
  onMetric: handleMetric,
});
