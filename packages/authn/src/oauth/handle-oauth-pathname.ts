import { ErrorCode } from '@quisido/authn-shared';
import { isRecord } from 'fmrs';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import handleInvalidReturnPath from './handle-invalid-return-path.js';
import handleInvalidStateSessionId from './handle-invalid-state-session-id.js';
import handleReturnPath from './handle-return-path.js';
import { OAuthPathname } from './oauth-pathname.js';

export default async function handleOAuthPathname(
  this: AuthnFetchHandler,
  pathname: OAuthPathname,
): Promise<Response> {
  // Missing state
  const { emitPublicMetric, getRequestSearchParam } = this;
  const stateSearchParam: string | null = getRequestSearchParam('state');
  if (stateSearchParam === null) {
    emitPublicMetric(MetricName.MissingStateSearchParam);
    return new this.FatalOAuthErrorResponse(ErrorCode.MissingStateSearchParam);
  }

  const { emitPrivateMetric, FatalOAuthErrorResponse } = this;
  try {
    const state: unknown = JSON.parse(stateSearchParam);

    // Invalid state
    if (!isRecord(state)) {
      emitPublicMetric(MetricName.NonObjectState, { type: typeof state });
      emitPrivateMetric(MetricName.NonObjectState, {
        value: stateSearchParam,
      });

      return new FatalOAuthErrorResponse(ErrorCode.NonObjectState);
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
    const { sessionIdCookie } = this;
    if (sessionIdCookie !== sessionIdState) {
      emitPublicMetric(MetricName.CSRF);
      emitPrivateMetric(MetricName.CSRF, {
        cookie: sessionIdCookie,
        state: sessionIdState,
      });

      return new FatalOAuthErrorResponse(ErrorCode.CSRF);
    }

    // Valid return path
    return await handleReturnPath.call(this, { pathname, returnPath });
  } catch (_err: unknown) {
    emitPublicMetric(MetricName.NonJsonStateSearchParam);
    emitPrivateMetric(MetricName.NonJsonStateSearchParam, {
      value: stateSearchParam,
    });

    return new FatalOAuthErrorResponse(ErrorCode.NonJsonStateSearchParam);
  }
}
