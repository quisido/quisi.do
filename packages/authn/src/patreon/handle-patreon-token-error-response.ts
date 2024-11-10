import { ErrorCode } from '@quisido/authn-shared';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import mapReadableStreamToString from '../utils/map-readable-stream-to-string.js';
import handlePatreonTokenErrorResponseBody from './handle-patreon-token-error-response-body.js';

interface Options {
  readonly response: Response;
  readonly requestCode: string;
}

export default async function handlePatreonTokenErrorResponse(
  this: AuthnFetchHandler,
  { requestCode, response }: Options,
): Promise<never> {
  const { emitPublicMetric } = this;
  if (response.body === null) {
    emitPublicMetric(MetricName.MissingPatreonAccessTokenErrorBody);
    throw new FatalError(ErrorCode.MissingPatreonAccessTokenErrorBody);
  }

  const { emitPrivateMetric } = this;
  const body: string = await mapReadableStreamToString(response.body);

  try {
    const json: unknown = JSON.parse(body);
    return handlePatreonTokenErrorResponseBody.call(this, {
      body,
      json,
      requestCode,
    });
  } catch (_err: unknown) {
    emitPublicMetric(MetricName.InvalidPatreonAccessTokenErrorBody);
    emitPrivateMetric(MetricName.InvalidPatreonAccessTokenErrorBody, {
      value: body,
    });

    throw new FatalError(ErrorCode.InvalidPatreonAccessTokenErrorBody);
  }
}
