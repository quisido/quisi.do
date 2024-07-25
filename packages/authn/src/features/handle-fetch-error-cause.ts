import { MetricName } from '../constants/metric-name.js';
import {
  emitPublicMetric,
  logPrivateError,
  logPublicError,
} from '../constants/worker.js';
import type Cause from '../types/cause.js';
import createDataError from '../utils/create-data-error.js';
import ErrorResponseInit from './error-response-init.js';

export default function handleFetchErrorCause(
  { code, privateData, publicData }: Cause,
  returnPath?: string | undefined,
): Response {
  emitPublicMetric({ code, name: MetricName.ErrorCode });

  if (typeof privateData !== 'undefined') {
    logPrivateError(createDataError(code, privateData));
  }

  if (typeof publicData !== 'undefined') {
    logPublicError(createDataError(code, publicData));
  }

  return new Response(null, new ErrorResponseInit(code, returnPath));
}
