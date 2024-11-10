import { ErrorCode } from '@quisido/authn-shared';
import { mapToString } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import FatalError from '../utils/fatal-error.js';
import handleInvalidPatreonTokenRequest from './handle-invalid-patreon-token-request.js';

interface Options {
  readonly errorCode: unknown;
  readonly json: Record<string, unknown>;
  readonly requestCode: string;
}

export default function handlePatreonTokenErrorCode(
  this: AuthnFetchHandler,
  { errorCode, json, requestCode }: Options,
): never {
  switch (errorCode) {
    case 'invalid_client': {
      const { emitPublicMetric, patreonOAuthClientId } = this;
      emitPublicMetric(MetricName.InvalidPatreonClientId, {
        clientId: patreonOAuthClientId,
      });

      throw new FatalError(ErrorCode.InvalidPatreonClientId);
    }

    case 'invalid_grant': {
      const { emitPrivateMetric, emitPublicMetric } = this;
      emitPublicMetric(MetricName.InvalidPatreonGrantCode);
      emitPrivateMetric(MetricName.InvalidPatreonGrantCode, {
        code: requestCode,
      });

      throw new FatalError(ErrorCode.InvalidPatreonGrantCode);
    }

    case 'invalid_request':
      return handleInvalidPatreonTokenRequest.call(this, json);

    default: {
      const { emitPrivateMetric, emitPublicMetric } = this;
      emitPublicMetric(MetricName.UnknownPatreonAccessTokenErrorCode);
      emitPrivateMetric(MetricName.UnknownPatreonAccessTokenErrorCode, {
        code: mapToString(errorCode),
        value: JSON.stringify({
          ...json,
          error: undefined,
        }),
      });

      throw new FatalError(ErrorCode.UnknownPatreonAccessTokenErrorCode);
    }
  }
}
