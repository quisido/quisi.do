import Worker from '@quisido/worker';
import { WORKER_OPTIONS } from './worker-options.js';

export const {
  affect,
  catchSnapshot,
  createExportedHandler,
  emitPrivateMetric,
  emitPublicMetric,
  getCookies,
  getEnv,
  getFetch,
  getNow,
  getR2Bucket,
  getRequestHeaders,
  getRequestMethod,
  getRequestPathname,
  getRequestSearchParam,
  logPrivateError,
  logPublicError,
  snapshot,
} = new Worker(WORKER_OPTIONS);
