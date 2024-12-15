import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import parseJson from '../utils/parse-json.js';
import FatalOAuthErrorResponse from './fatal-oauth-error-response.js';
import handleInvalidReturnPath from './handle-invalid-return-path.js';
import handleInvalidStateSessionId from './handle-invalid-state-session-id.js';
import handleReturnPath from './handle-return-path.js';
import { OAuthPathname } from './oauth-pathname.js';

export default async function handleOAuthPathname(
  this: AuthnFetchHandler,
  pathname: OAuthPathname,
): Promise<Response> {
  // Missing state
  const stateSearchParam: string | null = this.getRequestSearchParam('state');
  if (stateSearchParam === null) {
    this.emitPublicMetric(MetricName.MissingStateSearchParam);
    return new FatalOAuthErrorResponse({
      code: ErrorCode.MissingStateSearchParam,
      host: this.host,
    });
  }

  // Invalid JSON
  const state: unknown = parseJson(stateSearchParam);
  if (typeof state === 'undefined') {
    this.emitPublicMetric(MetricName.NonJsonStateSearchParam);
    this.emitPrivateMetric(MetricName.NonJsonStateSearchParam, {
      value: stateSearchParam,
    });

    return new FatalOAuthErrorResponse({
      code: ErrorCode.NonJsonStateSearchParam,
      host: this.host,
    });
  }

  // Invalid state
  if (!isRecord(state)) {
    this.emitPublicMetric(MetricName.NonObjectState, { type: typeof state });
    this.emitPrivateMetric(MetricName.NonObjectState, {
      value: stateSearchParam,
    });

    return new FatalOAuthErrorResponse({
      code: ErrorCode.NonObjectState,
      host: this.host,
    });
  }

  // Invalid return path state
  const { returnPath, sessionId: sessionIdState } = state;
  if (typeof returnPath !== 'string') {
    return handleInvalidReturnPath.call(this, {
      searchParam: stateSearchParam,
      state,
      value: returnPath,
    });
  }

  // Invalid session ID state
  if (typeof sessionIdState !== 'string') {
    return handleInvalidStateSessionId.call(this, {
      searchParam: stateSearchParam,
      state,
      value: sessionIdState,
    });
  }

  // Cross-site request forgery (CSRF)
  if (this.sessionIdCookie !== sessionIdState) {
    this.emitPublicMetric(MetricName.CSRF);
    this.emitPrivateMetric(MetricName.CSRF, {
      cookie: this.sessionIdCookie,
      state: sessionIdState,
    });

    return new FatalOAuthErrorResponse({
      code: ErrorCode.CSRF,
      host: this.host,
    });
  }

  // Valid return path
  return await handleReturnPath.call(this, { pathname, returnPath });
}
