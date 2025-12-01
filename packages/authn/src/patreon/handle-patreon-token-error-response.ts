import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import mapReadableStreamToString from '../utils/map-readable-stream-to-string.js';
import parseJson from '../utils/parse-json.js';
import handlePatreonTokenErrorResponseBody from './handle-patreon-token-error-response-body.js';

interface Options {
  readonly requestCode: string;
  readonly response: Response;
}

export default async function handlePatreonTokenErrorResponse(
  this: AuthnFetchHandler,
  { requestCode, response }: Options,
): Promise<never> {
  if (response.body === null) {
    this.emitPublicMetric(MetricName.MissingPatreonTokenErrorResponseBody);
    throw new FatalError(ErrorCode.MissingPatreonTokenErrorResponseBody);
  }

  const body: string = await mapReadableStreamToString(response.body);
  const json: unknown = parseJson(body);
  if (typeof json === 'undefined') {
    this.emitPublicMetric(MetricName.InvalidPatreonTokenErrorResponseBody);
    this.emitPrivateMetric(MetricName.InvalidPatreonTokenErrorResponseBody, {
      body,
    });

    throw new FatalError(ErrorCode.InvalidPatreonTokenErrorResponseBody);
  }

  return handlePatreonTokenErrorResponseBody.call(this, {
    body,
    json,
    requestCode,
  });
}
