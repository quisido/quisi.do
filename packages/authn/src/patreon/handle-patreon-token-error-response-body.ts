import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import handlePatreonTokenErrorResponseCode from './handle-patreon-token-error-response-code.js';

interface Options {
  readonly body: string;
  readonly json: unknown;
  readonly requestCode: string;
}

export default function handlePatreonTokenErrorResponseBody(
  this: AuthnFetchHandler,
  { body, json, requestCode }: Options,
): never {
  if (!isRecord(json)) {
    this.emitPrivateMetric(MetricName.InvalidPatreonTokenErrorResponse, {
      value: body,
    });

    this.emitPublicMetric(MetricName.InvalidPatreonTokenErrorResponse, {
      type: typeof json,
    });

    throw new FatalError(ErrorCode.InvalidPatreonTokenErrorResponse);
  }

  const { error: errorCode } = json;
  if (typeof errorCode === 'undefined') {
    this.emitPrivateMetric(MetricName.MissingPatreonTokenErrorResponseCode, {
      value: body,
    });

    this.emitPublicMetric(MetricName.MissingPatreonTokenErrorResponseCode, {
      keys: Object.keys(json).join(', '),
    });

    throw new FatalError(ErrorCode.MissingPatreonTokenErrorResponseCode);
  }

  return handlePatreonTokenErrorResponseCode.call(this, {
    errorCode,
    json,
    requestCode,
  });
}
