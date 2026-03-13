import { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import { MetricName } from '../constants/metric-name.js';
import handleCachedAuthnId from './handle-cached-authn-id.js';
import handleThrottledWhoAmI from './handle-throttled-whoami.js';
import lookupAuthnUserId from './lookup-authn-user-id.js';
import WhoAmIResponseInit from './whoami-response-init.js';
import WhoAmIResponse from './whoami-response.js';

export default async function handleWhoAmIFetchRequest(
  this: AuthnFetchHandler,
): Promise<Response> {
  if (this.requestMethod === 'OPTIONS') {
    return new Response(
      null,
      new WhoAmIResponseInit(StatusCode.OK, {
        accessControlAllowOrigin: this.accessControlAllowOrigin,
      }),
    );
  }

  if (typeof this.authnIdCookie === 'undefined') {
    this.emitPublicMetric(MetricName.MissingAuthnId);
    return new WhoAmIResponse({
      accessControlAllowOrigin: this.accessControlAllowOrigin,
      code: WhoAmIResponseCode.MissingAuthnId,
    });
  }

  const userIdFromMemory: number | undefined = this.getAuthnUserIdFromMemory(
    this.authnIdCookie,
  );

  if (typeof userIdFromMemory !== 'undefined') {
    return handleCachedAuthnId.call(this, userIdFromMemory);
  }

  if (this.shouldThrottleWhoAmIByIp()) {
    return handleThrottledWhoAmI.call(this);
  }

  return lookupAuthnUserId.call(this, this.authnIdCookie);
}
