import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import handlePatreonTokenErrorCode from './handle-patreon-token-error-code.js';

interface Options {
  readonly body: string;
  readonly json: unknown;
  readonly requestCode: string;
}

export default function handlePatreonTokenErrorResponseBody(
  this: AuthnFetchHandler,
  { body, json, requestCode }: Options,
): never {
  const { emitPrivateMetric, emitPublicMetric } = this;
  if (!isRecord(json)) {
    emitPrivateMetric(MetricName.InvalidPatreonAccessTokenError, {
      value: body,
    });

    emitPublicMetric(MetricName.InvalidPatreonAccessTokenError, {
      type: typeof json,
    });

    throw new FatalError(ErrorCode.InvalidPatreonAccessTokenError);
  }

  const { error: errorCode } = json;
  if (typeof errorCode === 'undefined') {
    emitPrivateMetric(MetricName.MissingPatreonAccessTokenErrorCode, {
      value: body,
    });

    emitPublicMetric(MetricName.MissingPatreonAccessTokenErrorCode, {
      keys: Object.keys(json).join(', '),
    });

    throw new FatalError(ErrorCode.MissingPatreonAccessTokenErrorCode);
  }

  return handlePatreonTokenErrorCode.call(this, {
    errorCode,
    json,
    requestCode,
  });
}
