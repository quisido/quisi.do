import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import parseJson from '../utils/parse-json.js';
import FatalOAuthErrorResponse from './fatal-oauth-error-response.js';
import handleInvalidReturnPath from './handle-invalid-return-path.js';
import handleInvalidStateSessionId from './handle-invalid-state-session-id.js';

interface EmitAndRespondOptions {
  readonly code: ErrorCode;
  readonly metricName: MetricName;
  readonly privateValue?: string;
  readonly publicDimensions?: Readonly<Record<string, string>>;
}

interface OAuthState {
  readonly returnPath: string;
  readonly sessionId: string;
}

interface StateRecord {
  readonly searchParam: string;
  readonly state: Readonly<Record<string, unknown>>;
}

const emitAndRespond = function emitAndRespond(
  this: AuthnFetchHandler,
  { code, metricName, privateValue, publicDimensions }: EmitAndRespondOptions,
): FatalOAuthErrorResponse {
  this.emitPublicMetric(metricName, publicDimensions);
  if (privateValue !== undefined) {
    this.emitPrivateMetric(metricName, { value: privateValue });
  }
  return new FatalOAuthErrorResponse({ code, host: this.host });
};

const getStateRecord = function getStateRecord(
  this: AuthnFetchHandler,
): Response | StateRecord {
  const stateSearchParam: string | null = this.getRequestSearchParam('state');
  if (stateSearchParam === null) {
    return emitAndRespond.call(this, {
      code: ErrorCode.MissingStateSearchParam,
      metricName: MetricName.MissingStateSearchParam,
    });
  }

  const state: unknown = parseJson(stateSearchParam);
  if (typeof state === 'undefined') {
    return emitAndRespond.call(this, {
      code: ErrorCode.NonJsonStateSearchParam,
      metricName: MetricName.NonJsonStateSearchParam,
      privateValue: stateSearchParam,
    });
  }

  if (!isRecord(state)) {
    return emitAndRespond.call(this, {
      code: ErrorCode.NonObjectState,
      metricName: MetricName.NonObjectState,
      privateValue: stateSearchParam,
      publicDimensions: { type: typeof state },
    });
  }

  return { searchParam: stateSearchParam, state };
};

export default function parseOAuthState(
  this: AuthnFetchHandler,
): OAuthState | Response {
  const recordOrResponse = getStateRecord.call(this);
  if (recordOrResponse instanceof Response) {
    return recordOrResponse;
  }

  const { searchParam, state } = recordOrResponse;
  const { returnPath, sessionId } = state;
  if (typeof returnPath !== 'string') {
    return handleInvalidReturnPath.call(this, {
      searchParam,
      state,
      value: returnPath,
    });
  }

  if (typeof sessionId !== 'string') {
    return handleInvalidStateSessionId.call(this, {
      searchParam,
      state,
      value: sessionId,
    });
  }

  return { returnPath, sessionId };
}
