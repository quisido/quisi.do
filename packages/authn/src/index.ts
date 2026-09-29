import { ExportedHandler } from '@quisido/worker';

import AuthnFetchHandler from './authn-fetch-handler.js';
import handleError from './handle-error.js';
import handleFinally from './handle-finally.js';
import handleLog from './handle-log.js';
import handleMetric from './handle-metric.js';

const exportedHandler: ExportedHandler = new ExportedHandler({
  console,
  fetch,
  FetchHandler: AuthnFetchHandler,
  finally: handleFinally,
  onError: handleError,
  onLog: handleLog,
  onMetric: handleMetric,
});

export default exportedHandler;
