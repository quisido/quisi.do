import { ErrorCode, WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';

import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import createAuthenticationCookie from '../fetch-handler/create-authentication-cookie.js';
import validateAuthenticationToken from '../jwt/validate-authentication-token.js';
import FatalError from '../utils/fatal-error.js';
import WhoAmIResponse from './whoami-response.js';
import WhoAmIResponseInit from './whoami-response-init.js';

export default async function handleWhoAmIFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  // Options
  if (this.requestMethod === 'OPTIONS') {
    return new Response(
      null,
      new WhoAmIResponseInit(StatusCode.OK, {
        accessControlAllowOrigin: this.accessControlAllowOrigin,
      }),
    );
  }

  // Clearing a cookie must work even when its token is missing or expired.
  if (this.requestMethod === 'DELETE') {
    const responseInit = new WhoAmIResponseInit(StatusCode.NoContent, {
      accessControlAllowOrigin: this.accessControlAllowOrigin,
    });
    if (this.origin === null || this.origin !== this.accessControlAllowOrigin) {
      return new Response(
        null,
        new WhoAmIResponseInit(StatusCode.Forbidden, {
          accessControlAllowOrigin: this.accessControlAllowOrigin,
        }),
      );
    }
    const headers = new Headers(responseInit.headers);
    headers.set('set-cookie', createAuthenticationCookie.call(this, ''));
    return new Response(null, { headers, status: StatusCode.NoContent });
  }

  // If the user is not authenticated,
  if (typeof this.authnIdCookie === 'undefined') {
    this.emitPublicMetric(MetricName.MissingAuthnId);
    return new WhoAmIResponse({
      accessControlAllowOrigin: this.accessControlAllowOrigin,
      code: WhoAmIResponseCode.MissingAuthnId,
    });
  }

  // Throttle
  if (this.shouldThrottleWhoAmIByIp()) {
    this.emitPublicMetric(MetricName.WhoAmIThrottled);

    return new WhoAmIResponse({
      accessControlAllowOrigin: this.accessControlAllowOrigin,
      code: WhoAmIResponseCode.Throttled,
      status: StatusCode.TooManyRequests,
    });
  }

  try {
    const userId: number | null = await validateAuthenticationToken.call(
      this,
      this.authnIdCookie,
    );

    if (userId === null) {
      this.emitPublicMetric(MetricName.AuthenticationTokenRejected);

      return new WhoAmIResponse({
        accessControlAllowOrigin: this.accessControlAllowOrigin,
        code: WhoAmIResponseCode.InvalidAuthnId,
      });
    }

    this.setFiscalResponsibility(userId);
    this.emitPublicMetric(MetricName.AuthenticationTokenValidated);

    return new WhoAmIResponse({
      accessControlAllowOrigin: this.accessControlAllowOrigin,
      code: WhoAmIResponseCode.Uncached,
      id: userId,
    });
  } catch (err: unknown) {
    if (err instanceof FatalError) {
      this.logError(err);
      return new Response(
        JSON.stringify({
          error: err.cause,
        }),

        new WhoAmIResponseInit(StatusCode.InternalServerError, {
          accessControlAllowOrigin: this.accessControlAllowOrigin,
        }),
      );
    }

    const error = new Error('Authentication request failed');
    this.logError(error);
    return new Response(
      JSON.stringify({
        error: ErrorCode.Unknown,
      }),

      new WhoAmIResponseInit(StatusCode.InternalServerError, {
        accessControlAllowOrigin: this.accessControlAllowOrigin,
      }),
    );
  }
}
