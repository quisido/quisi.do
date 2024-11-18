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
      this.emitPublicMetric(MetricName.InvalidPatreonClientId, {
        clientId: this.patreonOAuthClientId,
      });

      throw new FatalError(ErrorCode.InvalidPatreonClientId);
    }

    case 'invalid_grant': {
      this.emitPublicMetric(MetricName.InvalidPatreonGrantCode);
      this.emitPrivateMetric(MetricName.InvalidPatreonGrantCode, {
        code: requestCode,
      });

      throw new FatalError(ErrorCode.InvalidPatreonGrantCode);
    }

    case 'invalid_request':
      return handleInvalidPatreonTokenRequest.call(this, json);

    default: {
      this.emitPublicMetric(MetricName.UnknownPatreonAccessTokenErrorCode);
      this.emitPrivateMetric(MetricName.UnknownPatreonAccessTokenErrorCode, {
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
