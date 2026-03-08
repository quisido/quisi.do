import { MetricName } from '../constants/metric-name.js';
import type CspFetchHandler from '../csp-fetch-handler.js';
import NotFoundResponse from '../utils/not-found-response.js';

export default function handleInvalidPathname(
  this: CspFetchHandler,
): NotFoundResponse {
  const { requestPathname } = this;

  this.logError(
    new Error(`The pathname "${requestPathname}" does not exist.`, {
      cause: requestPathname,
    }),
  );

  this.emitPublicMetric(MetricName.InvalidPathname, {
    pathname: requestPathname,
  });

  return new NotFoundResponse(requestPathname);
}
